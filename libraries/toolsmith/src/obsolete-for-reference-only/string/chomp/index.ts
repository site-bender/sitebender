import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const chomp = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	// Remove all trailing \r and \n characters
	// This regex handles \n, \r\n, and \r line endings
	return str.replace(/[\r\n]+$/, "")
}

export default chomp
