import type { HashAlgorithm } from "./types/index.ts"

//++ Produce a hex hash (lowercase) of input using selected algorithm (default sha256)
import sha256HexInternal from "./algorithms/sha256/index.ts"

// Future algorithm registry placeholder
const registry: Record<
	HashAlgorithm,
	(x: ArrayBuffer | Uint8Array | string) => Promise<string>
> = {
	sha256: sha256HexInternal,
}

export function hashHex(
	algorithm?: HashAlgorithm,
) {
	return (
		input: ArrayBuffer | Uint8Array | string,
	): Promise<string> => {
		const algo = algorithm ?? "sha256"
		const impl = registry[algo]
		// Single algorithm now; simple direct call
		return impl(input)
	}
}

export default hashHex
