import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const sine = (
	radians: number | null | undefined,
): number => {
	if (isNullish(radians) || typeof radians !== "number") {
		return NaN
	}

	return Math.sin(radians)
}

export default sine
