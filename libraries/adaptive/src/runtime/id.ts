// Deterministic node id generation (base58, 12+ chars, "n_" prefix)
// Inputs should be stable across SSR/CSR: pageSeed | nodePath | anchor | kind | tag | stableAttrs

import convertBigIntToBase58 from "../pending/misc/generateShortId/convertUuidToBase58/convertBigIntToBase58/index.ts"

const encoder = new TextEncoder()

async function digestBlakeLike(input: string): Promise<Uint8Array> {
  // Use SHA-256 as a placeholder if blake3 isn't available in this environment
  const data = encoder.encode(input)
  const buf = await crypto.subtle.digest("SHA-256", data)
  return new Uint8Array(buf)
}

function bytesToBigInt(bytes: Uint8Array): bigint {
  let n = 0n
  for (const b of bytes) n = (n << 8n) + BigInt(b)
  return n
}

export async function makeNodeId(parts: Array<string | number | boolean | undefined>, length = 12): Promise<string> {
  const input = parts.filter((p) => p !== undefined && p !== null).join("|")
  const hash = await digestBlakeLike(input)
  const bi = bytesToBigInt(hash)
  const b58 = convertBigIntToBase58(bi)
  const core = b58.slice(0, Math.max(8, length))
  return `n_${core}`
}
