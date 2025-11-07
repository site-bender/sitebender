import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const logarithmBase10 = (
	x: number | null | undefined,
): number => {
	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	if (x <= 0) {
		return NaN
	}

	return Math.log10(x)
}

export default logarithmBase10
