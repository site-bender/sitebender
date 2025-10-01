import isNullish from "../../validation/isNullish/index.ts"

//++ Returns the non-negative square root; returns NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function squareRoot(
	n: number | null | undefined,
): number {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	return Math.sqrt(n)
}
