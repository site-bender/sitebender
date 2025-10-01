import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const lines = (
	str: string | null | undefined,
): Array<string> => {
	if (isNullish(str) || typeof str !== "string") {
		return []
	}

	// Split on all common line endings: \r\n (Windows), \n (Unix), \r (old Mac)
	// This regex matches any of these line ending patterns
	return str.split(/\r\n|\r|\n/)
}

export default lines
