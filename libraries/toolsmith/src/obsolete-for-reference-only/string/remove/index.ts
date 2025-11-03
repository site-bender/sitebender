//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const remove = (
	substring: string | null | undefined,
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	if (
		isNullish(substring) || typeof substring !== "string" ||
		substring === ""
	) {
		return str
	}

	// Use split and join for efficient removal of all occurrences
	// This handles overlapping matches naturally
	return str.split(substring).join("")
}

export default remove
