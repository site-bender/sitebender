import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const radiansToDegrees = (
	radians: number | null | undefined,
): number => {
	if (isNullish(radians) || typeof radians !== "number") {
		return NaN
	}

	return radians * (180 / Math.PI)
}

export default radiansToDegrees
