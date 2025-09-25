//++ Generic hash function with pluggable algorithm adapters

import type { HashInput, HashOptions } from "./types/index.ts"
import type { HashAdapter } from "./types/index.ts"

import blake3Adapter from "./adapters/blake3/index.ts"
import sha256Adapter from "./adapters/sha256/index.ts"

const sha512Placeholder: HashAdapter = (_input) =>
	Promise.reject(new Error("SHA-512 adapter not yet implemented"))

const ADAPTERS = {
	sha256: sha256Adapter,
	blake3: blake3Adapter,
	sha512: sha512Placeholder,
} as const

export default async function hashHex(
	input: HashInput,
	options: HashOptions = {},
): Promise<string> {
	const algorithm = options.algorithm ?? "sha256"
	const adapter = options.adapter ?? ADAPTERS[algorithm]

	if (!adapter) {
		throw new Error(`No adapter available for algorithm: ${algorithm}`)
	}

	const hex = await adapter(input)

	return hex
}

//?? [EXAMPLE] Basic usage with default SHA-256
// const hash = await hashHex("hello world")
// console.log(hash) // "b94d27b9934d3e08..."

//?? [EXAMPLE] Using different algorithm (when implemented)
// const hash = await hashHex("hello world", { algorithm: "blake3" })

//?? [EXAMPLE] Custom adapter injection
// const customAdapter = async (input) => "custom-hash"
// const hash = await hashHex("data", { adapter: customAdapter })
