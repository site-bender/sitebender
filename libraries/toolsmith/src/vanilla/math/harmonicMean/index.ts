import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const harmonicMean = (
	values: Array<number> | null | undefined,
): number => {
	if (isNullish(values) || !Array.isArray(values)) {
		return NaN
	}

	const n = values.length

	if (n === 0) {
		return NaN
	}

	// Calculate sum of reciprocals
	let sumOfReciprocals = 0
	for (const value of values) {
		if (typeof value !== "number") {
			return NaN
		}

		// All values must be positive for harmonic mean
		if (value <= 0) {
			return NaN
		}

		sumOfReciprocals += 1 / value
	}

	return n / sumOfReciprocals
}

export default harmonicMean
