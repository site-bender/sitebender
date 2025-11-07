import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const stripIndent = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	const lines = str.split("\n")

	// Find minimum indentation (excluding empty lines)
	let minIndent = Infinity
	for (const line of lines) {
		if (line.trim().length > 0) {
			const leadingWhitespace = line.match(/^(\s*)/)?.[1] || ""
			minIndent = Math.min(minIndent, leadingWhitespace.length)
		}
	}

	// If no non-empty lines found, return empty lines
	if (minIndent === Infinity) {
		return lines.map(() => "").join("\n")
	}

	// Remove common indentation from all lines
	return lines
		.map((line) => {
			// Only strip from non-empty lines
			if (line.trim().length > 0) {
				return line.slice(minIndent)
			}
			// Empty lines stay empty
			return line.trim().length === 0 ? "" : line
		})
		.join("\n")
		.trim() // Remove leading/trailing empty lines
}

export default stripIndent
