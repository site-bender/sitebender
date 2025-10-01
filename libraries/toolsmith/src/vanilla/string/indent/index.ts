//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const indent = (
	indentStr: string | null | undefined,
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	if (isNullish(indentStr) || typeof indentStr !== "string") {
		return str
	}

	if (str === "") {
		return ""
	}

	// Handle different line ending styles
	// Split on any line ending but preserve the line ending type
	const lines = str.split(/(\r?\n)/)

	// Process lines and separators
	return lines.map((part, index) => {
		// Even indices are content lines, odd indices are separators
		if (index % 2 === 0 && part !== "") {
			return indentStr + part
		}
		return part
	}).join("")
}

export default indent
