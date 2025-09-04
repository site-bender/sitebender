import type { ImportInfo } from "../../../index.ts"

export default function removeDuplicateImports(
	imports: ImportInfo[],
): ImportInfo[] {
	const seen = new Set<string>()

	return imports.filter((importInfo: ImportInfo) => {
		// Create a unique key based on type, source, and text content
		const key = `${importInfo.type}:${importInfo.source}:${importInfo.text}`

		if (seen.has(key)) {
			return false
		}

		seen.add(key)
		return true
	})
}
