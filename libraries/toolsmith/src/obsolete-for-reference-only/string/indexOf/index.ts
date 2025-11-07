import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const indexOf = (
	substring: string | null | undefined,
) =>
(
	fromIndex: number = 0,
) =>
(
	str: string | null | undefined,
): number => {
	if (isNullish(str) || typeof str !== "string") {
		return -1
	}

	if (isNullish(substring) || typeof substring !== "string") {
		return -1
	}

	// Use native indexOf with the specified starting position
	return str.indexOf(substring, fromIndex)
}

export default indexOf
