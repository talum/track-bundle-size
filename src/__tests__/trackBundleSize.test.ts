import axios from "axios";
import { trackBundleSize } from "../trackBundleSize";
import {
  chunk1,
  chunk2,
  chunk3,
  manifestFileMock,
  testEntry,
  testEntry2,
} from "../mocks/mocks";
import { baseAssetUrl, manifestRoute } from "../urlHelpers";

jest.mock("axios");
(axios.get as jest.Mock).mockImplementation((url: string) => {
  switch (url) {
    case manifestRoute:
      return Promise.resolve({ data: manifestFileMock });
    case `${baseAssetUrl}/chunk-1.js`:
      return Promise.resolve({ data: chunk1 });
    case `${baseAssetUrl}/chunk-2.js`:
      return Promise.resolve({ data: chunk2 });
    case `${baseAssetUrl}/chunk-3.js`:
      return Promise.resolve({ data: chunk3 });
    case `${baseAssetUrl}/test-entry.js`:
      return Promise.resolve({ data: testEntry });
    case `${baseAssetUrl}/test-entry-2.js`:
      return Promise.resolve({ data: testEntry2 });
    default:
      return Promise.reject(new Error("not found"));
  }
});

describe("trackBundleSize", () => {
  test("it returns the size of the bundle in bytes", async () => {
    const fileName = "test.js";
    const size = await trackBundleSize({ files: [fileName] });
    expect(size[fileName]).toEqual(
      Buffer.byteLength(testEntry) +
        Buffer.byteLength(chunk1) +
        Buffer.byteLength(chunk2),
    );
  });

  test("it can handle multiple entries", async () => {
    const fileName1 = "test.js";
    const fileName2 = "test-2.js";
    const size = await trackBundleSize({ files: [fileName1, fileName2] });
    expect(size[fileName1]).toEqual(
      Buffer.byteLength(testEntry) +
        Buffer.byteLength(chunk1) +
        Buffer.byteLength(chunk2),
    );
    expect(size[fileName2]).toEqual(
      Buffer.byteLength(testEntry2) +
        Buffer.byteLength(chunk2) +
        Buffer.byteLength(chunk3),
    );
  });
});
