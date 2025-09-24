import type { HashInput } from "../../types/index.ts"

//++ BLAKE3 adapter for hashHex (placeholder for future implementation)
//-- [OPTIMIZATION] BLAKE3 is faster than SHA-256 but requires external dependency

export default function blake3Adapter(_input: HashInput): Promise<string> {
	return Promise.reject(
		new Error(
			"BLAKE3 adapter not yet implemented. Use sha256 algorithm instead.",
		),
	)
}

//?? [GOTCHA] This is a placeholder. When implementing:
// 1. Will need to add BLAKE3 WASM or native binding
// 2. Must maintain same interface as sha256Adapter
// 3. Should be significantly faster for large inputs
