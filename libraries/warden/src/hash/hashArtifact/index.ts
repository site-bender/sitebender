//++ Compute SHA-256 hash of artifact using canonical JSON serialization
import hashHex from "../../../../toolsmith/src/crypto/hashHex/index.ts"
import canonicalStringify from "../../utils/canonicalStringify/index.ts"

//++ Generate deterministic hash for any artifact
export default async function hashArtifact(artifact: unknown): Promise<string> {
  const canonicalJson = canonicalStringify(artifact)
  return await hashHex(canonicalJson)
}
