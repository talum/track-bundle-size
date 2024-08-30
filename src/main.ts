import * as core from "@actions/core";
import { trackBundleSize } from "./trackBundleSize";
import { createIssueComment } from "./createIssueComment";

export async function main({ files }: { files: string[] }) {
  try {
    core.debug(`Tracking bundle sizes for ${files}`);
    const bundleSizes = await trackBundleSize({ files });

    core.debug("Creating issue comment with bundle sizes");
    createIssueComment(bundleSizes);
  } catch (error) {
    core.setFailed(error.message);
  }
}
