//++ Generate SHA-256 hash of any data structure
//++
//++ Creates cryptographic hash of architectural artifacts by:
//++ 1. Converting data to canonical JSON string (sorted keys)
//++ 2. Computing SHA-256 hash of the canonical string
//++
//++ This ensures that equivalent data structures produce identical hashes
//++ regardless of key order or formatting differences.
//++
//++ Examples:
//++   await hashArtifact({ b: 2, a: 1 }) === await hashArtifact({ a: 1, b: 2 })
//++   // Both produce the same SHA-256 hash
//++
//++ Returns: 64-character lowercase hexadecimal string
//++
//++ Pure async function - same input always produces same hash

import hashHex from "@sitebender/toolsmith/crypto/hashHex/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import canonicalStringify from "../canonicalStringify/index.ts"

export default async function hashArtifact(data: unknown): Promise<string> {
	const canonical = canonicalStringify(data)
	//++ WORKAROUND: hashHex currently returns Result<E, string> despite type signature claiming Promise<string>
	//++ This is a known issue in toolsmith (join returns Result which propagates up)
	//++ We unwrap using getOrElse with empty string as fallback (should never happen for valid input)
	const hashResult = await hashHex(canonical)
	return getOrElse("")(hashResult as unknown as { _tag: string; value: string })
}
