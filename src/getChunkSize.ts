import axios from "axios";

/**
 * Fetches the chunk name and measures its size in bytes
 */
export async function getChunkSize(chunkName: string) {
  const result = await axios.get(`https://github.com/assets/${chunkName}`);
  const size = Buffer.byteLength(result.data);
  return size; // in bytes
}
