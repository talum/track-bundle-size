import axios from "axios";
import { getChunkSize } from "../getChunkSize";
import { chunk1 } from "../mocks/mocks";

describe("getChunkSize", () => {
  test("it returns the size of the chunk in bytes", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: chunk1 });
    const size = await getChunkSize("chunk1");

    expect(size).toEqual(Buffer.byteLength(chunk1));
  });
});
