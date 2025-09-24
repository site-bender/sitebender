import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the variance of an array of numbers
 *
 * Computes the average of the squared differences from the mean.
 * By default calculates population variance. Pass true as the first
 * argument to calculate sample variance (using Bessel's correction).
 * Variance is the square of standard deviation and measures data spread.
 * Returns NaN for empty arrays or arrays containing non-numeric values.
 *
 * @param isSample - If true, calculates sample variance (default: false)
 * @param values - Array of numbers to calculate variance
 * @returns Variance of the values, or NaN if invalid
 * @example
 * ```typescript
 * // Population variance
 * variance(false)([2, 4, 4, 4, 5, 5, 7, 9]) // 4
 *
 * // Sample variance
 * variance(true)([2, 4, 4, 4, 5, 5, 7, 9]) // 4.571...
 *
 * // Investment risk assessment
 * const returns = [0.05, -0.02, 0.08, 0.03, -0.01, 0.06]
 * const risk = variance(true)(returns) // 0.0015
 *
 * // Edge cases
 * variance(false)([5, 5, 5, 5]) // 0 (uniform values)
 * variance(false)([]) // NaN
 * variance(false)(null) // NaN
 * ```
 * @pure
 * @curried
 * @safe
 */
const variance = (
	isSample: boolean = false,
) =>
(
	values: Array<number> | null | undefined,
): number => {
	if (isNullish(values) || !Array.isArray(values)) {
		return NaN
	}

	const n = values.length

	if (n === 0) {
		return NaN
	}

	// Sample variance undefined for n = 1
	if (isSample && n === 1) {
		return NaN
	}

	// Calculate mean
	if (values.some((v) => typeof v !== "number")) {
		return NaN
	}
	const mean = values.reduce((sum, value) => sum + value, 0) / n

	// Calculate sum of squared differences
	const sumSquaredDiff = values.reduce((sum, value) => {
		const diff = value - mean
		return sum + diff * diff
	}, 0)

	// Divide by n for population, n-1 for sample (Bessel's correction)
	const divisor = isSample ? n - 1 : n

	return sumSquaredDiff / divisor
}

export default variance
