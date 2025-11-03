import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const logarithm = (
	base: number | null | undefined,
) =>
(
	value: number | null | undefined,
): number => {
	if (isNullish(base) || typeof base !== "number") {
		return NaN
	}

	if (isNullish(value) || typeof value !== "number") {
		return NaN
	}

	// Base must be positive and not 1
	if (base <= 0 || base === 1) {
		return NaN
	}

	// Value must be positive (0 returns -Infinity)
	if (value < 0) {
		return NaN
	}

	// Use change of base formula: log_b(x) = ln(x) / ln(b)
	return Math.log(value) / Math.log(base)
}

export default logarithm
