import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const removeSuffix = (
	suffix: string | null | undefined,
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	if (isNullish(suffix) || typeof suffix !== "string" || suffix === "") {
		return str
	}

	// Only remove if string ends with the suffix
	return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str
}

export default removeSuffix
