import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function power(
	exponent: number | null | undefined,
) {
	return function raiseBaseToPower(
		base: number | null | undefined,
	): number {
		if (isNullish(exponent) || typeof exponent !== "number") {
			return NaN
		}

		if (isNullish(base) || typeof base !== "number") {
			return NaN
		}

		return Math.pow(base, exponent)
	}
}
