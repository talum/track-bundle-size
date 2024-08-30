import axios from "axios";
import { baseAssetUrl } from "./urlHelpers";

/**
 * Fetches the chunk name and measures its size in bytes
 */
export async function getChunkSize(chunkName: string) {
  const result = await axios.get(`${baseAssetUrl}/${chunkName}`);
  const size = Buffer.byteLength(result.data);
  return size; // in bytes
}
