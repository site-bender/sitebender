import type { ImportInfo } from "../../../index.ts"

export default function categorizeImport(
	source: string,
): ImportInfo["category"] {
	// Local imports (starting with ./ or ../)
	if (source.startsWith("./") || source.startsWith("../")) {
		return "local"
	}

	// Project-specific imports
	if (source.startsWith("~types/")) return "types"
	if (source.startsWith("~codewright/")) return "components"
	if (source.startsWith("~utilities/")) return "utilities"
	if (source.startsWith("~constants/")) return "constants"

	// Everything else is external (npm packages, etc.)
	return "external"
}
