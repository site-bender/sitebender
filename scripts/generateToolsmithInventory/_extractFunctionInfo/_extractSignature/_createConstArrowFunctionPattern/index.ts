import escapeRegExp from "@sitebender/toolsmith/string/escapeRegExp/index.ts"

/**
 * Create a RegExp pattern to match const arrow function for a given function name
 */
export default function _createConstArrowFunctionPattern(
	functionName: string,
): RegExp {
	const escapedName = escapeRegExp(functionName)
	return new RegExp(`const\\s+${escapedName}\\s*=\\s*\\([^)]*\\)\\s*=>`, "s")
}
