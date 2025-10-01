import isNullish from "../../validation/isNullish/index.ts"

//++ Returns the smaller of two numbers; returns NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const min = (
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

	// Handle NaN cases explicitly
	if (isNaN(a) || isNaN(b)) {
		return NaN
	}

	return Math.min(a, b)
}

export default min

//?? [EXAMPLE] min(5)(3) // 3
//?? [EXAMPLE] min(5)(NaN) // NaN
