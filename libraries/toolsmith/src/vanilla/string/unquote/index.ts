import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const unquote = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string" || str.length < 2) {
		return str ?? ""
	}

	// Check for matching quotes at beginning and end
	const first = str[0]
	const last = str[str.length - 1]

	// Common quote characters
	const quotes = ['"', "'", "`"]

	// Remove if first and last are the same quote character
	if (quotes.includes(first) && first === last) {
		return str.slice(1, -1)
	}

	return str
}

export default unquote
