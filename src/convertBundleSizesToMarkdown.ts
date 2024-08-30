const INTRO_TEXT = `# Weekly Bundle Size Update\n\nThis is an automated weekly update of the bundle sizes for the entry files our team maintains. The goal is to keep the bundle size as small as possible to ensure a fast and reliable experience for our users.\n\nThe bundle size is calculated by adding the size of the entry file and the size of all the chunks it imports.\n\n`;

/**
 * Takes the bundle size cache and converts it into markdown
 */
export function convertBundleSizesToMarkdown(
  bundleSizes: Record<string, number>,
) {
  const fileHeaders = "| File | Size |\n| --- | --: |\n";
  const fileEntries = Object.entries(bundleSizes)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([file, size]) => {
      return `| ${file} | ${size / 1000000} MB |`;
    })
    .join("\n");
  return `${INTRO_TEXT}\n${fileHeaders}${fileEntries}`;
}
