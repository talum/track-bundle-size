import { convertBundleSizesToMarkdown } from "../convertBundleSizesToMarkdown";

describe("convertBundleSizesToMarkdown", () => {
  test.only("it returns the correct markdown", () => {
    const bundleSizes = {
      "test.js": 100000,
      "test-2.js": 200000,
    };
    expect(convertBundleSizesToMarkdown(bundleSizes)).toEqual(
      `# Weekly Bundle Size Update\n\nThis is an automated weekly update of the bundle sizes for the entry files our team maintains. The goal is to keep the bundle size as small as possible to ensure a fast and reliable experience for our users.\n\nThe bundle size is calculated by adding the size of the entry file and the size of all the chunks it imports.\n\n\n| File | Size |\n| --- | --: |\n| test.js | 1 MB |\n| test-2.js | 2 MB |`,
    );
  });
});
