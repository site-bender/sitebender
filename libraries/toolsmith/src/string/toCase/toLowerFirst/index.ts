import isNullish from "../../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toLowerFirst = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string" || str.length === 0) {
		return ""
	}

	return str[0].toLowerCase() + str.slice(1)
}

export default toLowerFirst
