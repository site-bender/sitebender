import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const hypotenuse = (
	values: number[] | null | undefined,
): number => {
	if (isNullish(values) || !Array.isArray(values)) {
		return NaN
	}

	// Empty array returns 0 by convention
	if (values.length === 0) {
		return 0
	}

	// Check for non-numeric values
	for (const value of values) {
		if (isNullish(value) || typeof value !== "number") {
			return NaN
		}
	}

	// Use Math.hypot if available (it's numerically stable)
	if (typeof Math.hypot === "function") {
		return Math.hypot(...values)
	}

	// Manual implementation with numerical stability
	// Find the maximum absolute value to scale
	let max = 0
	for (const value of values) {
		const abs = Math.abs(value)
		if (abs > max) {
			max = abs
		}
	}

	// If all values are zero
	if (max === 0) {
		return 0
	}

	// Scale values to avoid overflow/underflow
	let sumOfSquares = 0
	for (const value of values) {
		const scaled = value / max
		sumOfSquares += scaled * scaled
	}

	return max * Math.sqrt(sumOfSquares)
}

export default hypotenuse
