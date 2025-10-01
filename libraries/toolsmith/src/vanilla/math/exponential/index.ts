import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const exponential = (
	exponent: number | null | undefined,
): number => {
	if (isNullish(exponent) || typeof exponent !== "number") {
		return NaN
	}

	return Math.exp(exponent)
}

export default exponential
