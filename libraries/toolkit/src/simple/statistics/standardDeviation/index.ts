/**
 * Calculates the standard deviation of an array of numbers
 *
 * Computes the population standard deviation by default, which measures
 * the spread of data points from their mean. Pass true as the second
 * argument to calculate sample standard deviation (using Bessel's correction).
 * Returns NaN for empty arrays or arrays containing non-numeric values.
 *
 * @param isSample - If true, calculates sample standard deviation (default: false)
 * @param values - Array of numbers to calculate standard deviation
 * @returns Standard deviation of the values, or NaN if invalid
 * @example
 * ```typescript
 * // Population standard deviation
 * standardDeviation(false)([2, 4, 4, 4, 5, 5, 7, 9]) // 2
 * 
 * // Sample standard deviation
 * standardDeviation(true)([2, 4, 4, 4, 5, 5, 7, 9]) // 2.138...
 * 
 * // Test scores variation
 * const scores = [85, 90, 78, 92, 88, 76, 95, 89]
 * const sampleStd = standardDeviation(true)(scores) // 6.782...
 * 
 * // Edge cases
 * standardDeviation(false)([5, 5, 5, 5]) // 0 (uniform values)
 * standardDeviation(false)([]) // NaN
 * standardDeviation(false)(null) // NaN
 * ```
 * @pure
 * @curried
 * @safe
 */
const standardDeviation = (
	isSample: boolean = false,
) =>
(
	values: Array<number> | null | undefined,
): number => {
	if (values == null || !Array.isArray(values)) {
		return NaN
	}

	const n = values.length

	if (n === 0) {
		return NaN
	}

	// Sample standard deviation undefined for n = 1
	if (isSample && n === 1) {
		return NaN
	}

	// Calculate mean
	if (values.some(v => typeof v !== "number")) {
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
	const variance = sumSquaredDiff / divisor

	return Math.sqrt(variance)
}

export default standardDeviation
