import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const arcTangent2 = (
	y: number | null | undefined,
) =>
(
	x: number | null | undefined,
): number => {
	if (isNullish(y) || typeof y !== "number") {
		return NaN
	}

	if (isNullish(x) || typeof x !== "number") {
		return NaN
	}

	return Math.atan2(y, x)
}

export default arcTangent2
