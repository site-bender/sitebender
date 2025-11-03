import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const lastIndexOf = (
	substring: string | null | undefined,
) =>
(
	fromIndex: number = Infinity,
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

	// Use native lastIndexOf with the specified starting position
	// If fromIndex is Infinity or greater than string length, search from end
	const searchIndex = fromIndex === Infinity ? str.length - 1 : fromIndex
	return str.lastIndexOf(substring, searchIndex)
}

export default lastIndexOf
