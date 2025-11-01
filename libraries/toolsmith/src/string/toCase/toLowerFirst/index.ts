import isNullish from "../../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toLowerFirst = (
	str: string | null | undefined,
): string => {
	//++ [EXCEPTION] .length, ===, and typeof permitted in Toolsmith for performance - provides toLowerFirst wrapper
	if (isNullish(str) || typeof str !== "string" || str.length === 0) {
		return ""
	}

	//++ [EXCEPTION] [], .toLowerCase(), .slice(), and + permitted in Toolsmith for performance - provides toLowerFirst wrapper
	return str[0].toLowerCase() + str.slice(1)
}

export default toLowerFirst
