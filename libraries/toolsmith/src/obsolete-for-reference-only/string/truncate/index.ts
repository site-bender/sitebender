import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const truncate = (
	maxLength: number,
) =>
(
	suffix: string = "...",
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	if (str.length <= maxLength) {
		return str
	}

	// If maxLength is less than or equal to suffix length, return just suffix
	if (maxLength <= suffix.length) {
		return suffix.slice(0, maxLength)
	}

	// Truncate and add suffix
	return str.slice(0, maxLength - suffix.length) + suffix
}

export default truncate
