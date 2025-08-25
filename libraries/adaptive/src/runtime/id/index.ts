import convertBigIntToBase58 from "../../pending/misc/generateShortId/convertUuidToBase58/convertBigIntToBase58/index.ts"
import digestBlakeLike from "./digestBlakeLike/index.ts"
import bytesToBigInt from "./bytesToBigInt/index.ts"

export default async function makeNodeId(parts: Array<string | number | boolean | undefined>, length = 12): Promise<string> {
  const input = parts.filter((p) => p !== undefined && p !== null).join("|")
  const hash = await digestBlakeLike(input)
  const bi = bytesToBigInt(hash)
  const b58 = convertBigIntToBase58(bi)
  const core = b58.slice(0, Math.max(8, length))
  return `n_${core}`
}
