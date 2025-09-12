import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the harmonic mean of an array of positive numbers
 *
 * Computes the reciprocal of the arithmetic mean of reciprocals:
 * HM = n / (1/x₁ + 1/x₂ + ... + 1/xₙ). Harmonic mean is particularly
 * useful for averaging rates and ratios. All values must be positive;
 * returns NaN for empty arrays, non-positive values, or invalid inputs.
 *
 * @param values - Array of positive numbers to calculate harmonic mean
 * @returns Harmonic mean of the values, or NaN if invalid
 * @example
 * ```typescript
 * harmonicMean([1, 2, 3])
 * // 1.636...
 *
 * harmonicMean([2, 4, 8])
 * // 3.428...
 *
 * harmonicMean([5, 5, 5, 5])
 * // 5
 *
 * harmonicMean([40, 60])
 * // 48
 *
 * harmonicMean([10])
 * // 10
 *
 * harmonicMean([1, 0, 3])
 * // NaN
 *
 * harmonicMean([])
 * // NaN
 *
 * harmonicMean(null)
 * // NaN
 * ```
 * @pure - Always returns same result for same input
 * @safe - Returns NaN for invalid inputs, empty arrays, or non-positive values
 */
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
