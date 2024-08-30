export const manifestFileMock = {
  "test.js": {
    src: "test-entry.js",
    files: ["chunk-1.js", "chunk-2.js", "test-entry.js"],
    cssFiles: [],
  },
  "test-2.js": {
    src: "test-entry-2.js",
    files: ["chunk-2.js", "chunk-3.js", "test-entry-2.js"],
    cssFiles: [],
  },
};

export const testEntry = "test-entry-contents";
export const testEntry2 = "test-entry-2-contents";
export const chunk1 = "chunk1";
export const chunk2 = "chunk2chunk2";
export const chunk3 = "chunk3chunk3chunk3";
