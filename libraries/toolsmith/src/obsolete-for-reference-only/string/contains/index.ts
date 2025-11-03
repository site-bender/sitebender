import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const contains = (
	substring: string | null | undefined,
) =>
(
	str: string | null | undefined,
): boolean => {
	if (isNullish(str) || typeof str !== "string") {
		return false
	}

	if (isNullish(substring) || typeof substring !== "string") {
		return false
	}

	return str.includes(substring)
}

export default contains
