import axios from "axios";
import { getManifestFileData } from "../getManifestFileData";
import { manifestFileMock } from "../mocks/mocks";

jest.mock("axios");

describe("getManifestFileData", () => {
  it("it returns the manifest data", async () => {
    axios.get = jest.fn().mockResolvedValue({ data: manifestFileMock });
    const data = await getManifestFileData();
    expect(data).toEqual(manifestFileMock);
  });
});
