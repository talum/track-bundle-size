import * as github from '@actions/github'
import fetch from "node-fetch"

const DOMAIN = "https://github.com"
const BUNDLE_ISSUE_NUMBER = 112
const baseAssetUrl = `${DOMAIN}/assets`
const manifestRoute = `${baseAssetUrl}/manifest.json`

async function getManifestFileData() {
  const result = await fetch(manifestRoute)
  if (result.ok) {
    const data = await result.json()
    return data
  }
}

async function getChunkSize(chunkName: string): Promise<number | undefined> {
  const result = await fetch(`https://github.com/assets/${chunkName}`)
  if (result.ok) {
    const data = await result.text()
    const size = Buffer.byteLength(data)
    return size // in bytes
  }
}

type BundleEntry = {
  src: string,
  files: string[]
  cssFiles: string[]
}
async function fetchAndMeasureChunksForFile(file: string, entry: BundleEntry, cacheBundleSizes: Record<string, number>) {
    // Bundle size is a combination of the entry file size + the size of all the chunks
  const filePromises = entry["files"].map(async (file) => getChunkSize(file) ).concat(getChunkSize(entry["src"]))

  const sizes = await Promise.all(filePromises)
  const totalSize = sizes.reduce((acc, size) => acc + size, 0)
  cacheBundleSizes[file] = totalSize
}

export async function trackBundleSize({files}: {files: string[]}) {
  const manifest = await getManifestFileData()
  const cacheBundleSizes = {}

  const filePromises = files.map(async file => {
    const entry = manifest[file]
    if (entry) {
      await fetchAndMeasureChunksForFile(file, entry, cacheBundleSizes)
   } else {
    console.error('Whoops! No file for ', file)
   }
  })

  await Promise.all(filePromises)
  console.log('cacheBundleSizes', cacheBundleSizes)

  createIssueComment(cacheBundleSizes)
}

async function createIssueComment(bundleSizes: Record<string, number>) {
  // pull this from repo the action is run in
  // const context = github.context

  const octokit = github.getOctokit(process.env.GITHUB_TOKEN)
  await octokit.rest.issues.createComment({
    owner: 'talum',
    repo: 'bugs',
    issue_number: BUNDLE_ISSUE_NUMBER,
    body: `${convertBundleSizesToMarkdown(bundleSizes)}`,
  })
}

function convertBundleSizesToMarkdown(bundleSizes: Record<string, number>) {
  const fileHeaders = '| File | Size |\n| --- | --- |\n'
  const fileEntries = Object.entries(bundleSizes).map(([file, size]) => {
    return `| ${file} | ${size/ 100000} MB |`
  }).join('\n')
  return `${fileHeaders}${fileEntries}`
} 