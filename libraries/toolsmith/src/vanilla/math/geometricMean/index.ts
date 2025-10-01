import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const geometricMean = (
	values: Array<number> | null | undefined,
): number => {
	if (isNullish(values) || !Array.isArray(values)) {
		return NaN
	}

	const n = values.length

	if (n === 0) {
		return NaN
	}

	// Use logarithms to avoid overflow with large products
	// GM = exp((ln(x₁) + ln(x₂) + ... + ln(xₙ)) / n)
	let sumOfLogs = 0
	for (const value of values) {
		if (typeof value !== "number") {
			return NaN
		}

		// All values must be positive for geometric mean
		if (value <= 0) {
			return NaN
		}

		sumOfLogs += Math.log(value)
	}

	return Math.exp(sumOfLogs / n)
}

export default geometricMean
