import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function rootMeanSquare(
	values: Array<number> | null | undefined,
): number {
	if (isNullish(values) || !Array.isArray(values)) {
		return NaN
	}

	if (values.length === 0) {
		return NaN
	}

	// Check for non-numeric values
	const hasInvalidValue = values.some(function checkInvalidValue(value) {
		return isNullish(value) || typeof value !== "number" || isNaN(value)
	})

	if (hasInvalidValue) {
		return NaN
	}

	// Calculate sum of squares using reduce
	const sumOfSquares = values.reduce(function sumSquaredValues(acc, value) {
		return acc + value * value
	}, 0)

	return Math.sqrt(sumOfSquares / values.length)
}
