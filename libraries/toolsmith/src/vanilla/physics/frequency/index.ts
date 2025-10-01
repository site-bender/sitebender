import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const frequency = (
	period: number | null | undefined,
): number => {
	if (isNullish(period) || typeof period !== "number") {
		return NaN
	}

	// Check for non-finite values
	if (!isFinite(period)) {
		return NaN
	}

	// Period must be positive (cannot be zero or negative)
	if (period <= 0) {
		return NaN
	}

	// Calculate frequency as reciprocal of period
	return 1 / period
}

export default frequency
