import { manifestRoute } from "./urlHelpers";
import axios from "axios";

/**
 * Fetches the manifest file from the assets server and returns the data
 */
export async function getManifestFileData() {
  const result = await axios.get(manifestRoute);
  return result.data;
}
