//++ Returns the absolute value of a number; returns NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
import isNullish from "../../validation/isNullish/index.ts"

const absoluteValue = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	return Math.abs(n)
}

export default absoluteValue
