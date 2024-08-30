import * as github from "@actions/github";
import * as core from "@actions/core";
import { convertBundleSizesToMarkdown } from "./convertBundleSizesToMarkdown";

/**
 * Appends a comment with the bundle sizes we care about to the specified tracking issue
 */
export async function createIssueComment(bundleSizes: Record<string, number>) {
  // Pull context from the GitHub action
  // If running locally, it will prompt you to set an environment variable
  const context = github.context;
  // If running locally, set INPUT_TRACKING_ISSUE_NUMBER
  const issueNumber = core.getInput("tracking_issue_number");

  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: parseInt(issueNumber, 10),
    body: `${convertBundleSizesToMarkdown(bundleSizes)}`,
  });
}
