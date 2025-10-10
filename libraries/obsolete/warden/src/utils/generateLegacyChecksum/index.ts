import reduce from "../../../../../../../toolsmith/src/vanilla/array/reduce/index.ts"

//++ Generates a simple numeric checksum for backward compatibility

export default function generateLegacyChecksum(data: string): string {
	const chars = data.split("")

	const hash = reduce((acc: number, char: string) => {
		const code = char.charCodeAt(0)
		const shifted = ((acc << 5) - acc) + code

		return shifted & shifted
	})(0)(chars)

	return hash.toString(16)
}

// generateLegacyChecksum("hello") // Returns hex string like "5d41402a"

//-- [WORKAROUND] This is the old weak checksum kept for compatibility
// Will be removed once all consumers migrate to SHA-256 hash
