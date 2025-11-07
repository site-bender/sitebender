import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const substr = (
	start: number,
) =>
(
	length: number = Infinity,
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	// Handle negative start
	const actualStart = start < 0 ? Math.max(0, str.length + start) : start

	// Handle length
	const actualLength = length === Infinity
		? str.length - actualStart
		: Math.max(0, length)

	// Extract substring
	return str.substr(actualStart, actualLength)
}

export default substr
