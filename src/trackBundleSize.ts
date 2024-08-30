import { getManifestFileData } from "./getManifestFileData";
import { BundleEntry } from "./types";
import { getChunkSize } from "./getChunkSize";

/**
 * Fetch the chunks for a given file and measure their sizes, writing it to a cache (object)
 */
async function fetchAndMeasureChunksForFile(
  file: string,
  entry: BundleEntry,
  cacheBundleSizes: Record<string, number>,
) {
  // Bundle size is a combination of the entry file size + the size of all the chunks
  const filePromises = entry["files"]
    .map(async (file) => getChunkSize(file))
    .concat(getChunkSize(entry["src"]));

  const sizes = await Promise.all(filePromises);
  const totalSize = sizes.reduce((acc, size) => acc + size, 0);
  cacheBundleSizes[file] = totalSize;
}

/**
 * Gets bundle sizes by loading the manifest file and finding the related chunks
 */
export async function trackBundleSize({ files }: { files: string[] }) {
  const manifest = await getManifestFileData();
  const cacheBundleSizes = {};

  const filePromises = files.map(async (file) => {
    const entry = manifest[file];
    if (entry) {
      await fetchAndMeasureChunksForFile(file, entry, cacheBundleSizes);
    } else {
      console.error("Whoops! No file for ", file);
    }
  });

  await Promise.all(filePromises);
  return cacheBundleSizes;
}
