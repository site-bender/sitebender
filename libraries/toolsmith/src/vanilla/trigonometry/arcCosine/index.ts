import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const arcCosine = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	// Check domain: x must be in [-1, 1]
	if (x < -1 || x > 1) {
		return NaN
	}

	return Math.acos(x)
}

export default arcCosine
