import { trackBundleSize } from "./trackBundleSize";
import { createIssueComment } from "./createIssueComment";

export async function main({ files }: { files: string[] }) {
  console.log("Tracking bundle sizes for", files);
  const bundleSizes = await trackBundleSize({ files });

  console.log("Creating issue comment with bundle sizes");
  createIssueComment(bundleSizes);
}
