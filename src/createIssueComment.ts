import * as github from "@actions/github";
import { convertBundleSizesToMarkdown } from "./convertBundleSizesToMarkdown";

const BUNDLE_ISSUE_NUMBER = 112;

/**
 * Appends a comment with the bundle sizes we care about to the specified tracking issue
 */
export async function createIssueComment(bundleSizes: Record<string, number>) {
  // pull this from repo the action is run in
  // const context = github.context

  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
  await octokit.rest.issues.createComment({
    owner: "talum",
    repo: "bugs",
    issue_number: BUNDLE_ISSUE_NUMBER,
    body: `${convertBundleSizesToMarkdown(bundleSizes)}`,
  });
}
