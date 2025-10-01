//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const removePrefix = (
	prefix: string | null | undefined,
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	if (isNullish(prefix) || typeof prefix !== "string" || prefix === "") {
		return str
	}

	// Only remove if string starts with the prefix
	return str.startsWith(prefix) ? str.slice(prefix.length) : str
}

export default removePrefix
