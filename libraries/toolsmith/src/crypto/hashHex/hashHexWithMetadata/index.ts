import type { HashInput, HashOptions, HashResult } from "../types/index.ts"

import hashHex from "../index.ts"

//++ Creates a hash with full metadata for contract outputs

export default async function hashHexWithMetadata(
	input: HashInput,
	options: HashOptions = {},
): Promise<HashResult> {
	const algorithm = options.algorithm ?? "sha256"
	const hex = await hashHex(input, options)

	return {
		hex,
		metadata: {
			algorithm,
			version: 1,
			timestamp: new Date().toISOString(),
		},
	}
}

//?? [EXAMPLE]
// const result = await hashHexWithMetadata("contract data")
// console.log(result.hex) // "abc123..."
// console.log(result.metadata.algorithm) // "sha256"
// console.log(result.metadata.timestamp) // "2024-01-15T..."
