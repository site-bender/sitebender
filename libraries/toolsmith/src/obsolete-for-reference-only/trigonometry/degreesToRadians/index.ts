import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const degreesToRadians = (
	degrees: number | null | undefined,
): number => {
	if (isNullish(degrees) || typeof degrees !== "number") {
		return NaN
	}

	return degrees * (Math.PI / 180)
}

export default degreesToRadians
