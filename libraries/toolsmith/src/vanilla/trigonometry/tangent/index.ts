import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const tangent = (
	radians: number | null | undefined,
): number => {
	if (isNullish(radians) || typeof radians !== "number") {
		return NaN
	}

	return Math.tan(radians)
}

export default tangent
