import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the geometric mean of an array of positive numbers
 *
 * Computes the nth root of the product of n numbers:
 * GM = (x₁ × x₂ × ... × xₙ)^(1/n). Geometric mean is particularly
 * useful for averaging growth rates, ratios, and percentages. All
 * values must be positive; returns NaN for empty arrays, non-positive
 * values, or invalid inputs.
 *
 * @param values - Array of positive numbers to calculate geometric mean
 * @returns Geometric mean of the values, or NaN if invalid
 * @example
 * ```typescript
 * geometricMean([2, 8])
 * // 4
 *
 * geometricMean([1, 3, 9])
 * // 3
 *
 * geometricMean([5, 5, 5, 5])
 * // 5
 *
 * geometricMean([10])
 * // 10
 *
 * geometricMean([0.1, 0.2, 0.4])
 * // 0.2
 *
 * geometricMean([1, 0, 3])
 * // NaN
 *
 * geometricMean([])
 * // NaN
 *
 * geometricMean(null)
 * // NaN
 * ```
 * @pure - Always returns same result for same input
 * @safe - Returns NaN for invalid inputs, empty arrays, or non-positive values
 */
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
