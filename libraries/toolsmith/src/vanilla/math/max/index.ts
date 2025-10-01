import isNullish from "../../validation/isNullish/index.ts"

//++ Returns the larger of two numbers; returns NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const max = (
	a: number | null | undefined,
) =>
(
	b: number | null | undefined,
): number => {
	if (isNullish(a) || typeof a !== "number") {
		return NaN
	}

	if (isNullish(b) || typeof b !== "number") {
		return NaN
	}

	// Math.max handles NaN, Infinity, and -0 vs 0 correctly
	return Math.max(a, b)
}

export default max

//?? [EXAMPLE] max(5)(3) // 5
//?? [EXAMPLE] max(NaN)(5) // NaN
