import mean from "../../math/mean/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
import standardDeviation from "../standardDeviation/index.ts"

/**
 * Calculates the z-score (standard score) of a value in a dataset
 *
 * Measures how many standard deviations a value is from the mean.
 * Z-score = (x - μ) / σ, where x is the value, μ is the mean, and
 * σ is the standard deviation. Useful for standardization, outlier
 * detection, and comparing values from different distributions.
 * Returns NaN for invalid inputs or if standard deviation is zero.
 *
 * @param value - The value to calculate z-score for
 * @param data - Array of numeric values representing the dataset
 * @param sample - If true, uses sample standard deviation (default: false)
 * @returns Z-score of the value, or NaN if invalid
 * @example
 * ```typescript
 * // Basic z-score calculations
 * zScore(5)([1, 2, 3, 4, 5, 6, 7, 8, 9])() // 0 (at mean)
 * zScore(9)([1, 2, 3, 4, 5, 6, 7, 8, 9])() // 1.549... (above mean)
 *
 * // Outlier detection
 * zScore(100)([10, 12, 11, 13, 12, 11, 10, 12, 13])() // 31.97... (extreme outlier)
 *
 * // Test score standardization
 * const testScores = [65, 70, 75, 80, 85, 90, 95]
 * const standardize = zScore(85)
 * standardize(testScores)() // 0.5 (half std dev above mean)
 *
 * // Anomaly detection
 * const detectAnomaly = (value: number, data: number[]) => {
 *   const z = zScore(value)(data)()
 *   return Math.abs(z) > 3
 * }
 *
 * // Edge cases
 * zScore(5)([5, 5, 5, 5, 5])() // 0 (value equals constant)
 * zScore(3)([5, 5, 5, 5, 5])() // NaN (std dev is 0)
 * zScore(5)([])() // NaN
 * ```
 * @pure
 * @curried
 * @safe
 */
const zScore = (
	value: number | null | undefined,
) =>
(
	data: number[] | null | undefined,
) =>
(
	sample: boolean = false,
): number => {
	if (isNullish(value) || typeof value !== "number") {
		return NaN
	}

	if (isNullish(data) || !Array.isArray(data)) {
		return NaN
	}

	if (data.length === 0) {
		return NaN
	}

	// Check for non-numeric values in data
	if (data.some((d) => isNullish(d) || typeof d !== "number")) {
		return NaN
	}

	const dataMean = mean(data)
	const dataStdDev = standardDeviation(sample)(data)

	// Can't calculate z-score if standard deviation is 0
	if (dataStdDev === 0) {
		// Special case: if value equals the mean (all values are the same), return 0
		if (value === dataMean) {
			return 0
		}
		return NaN
	}

	return (value - dataMean) / dataStdDev
}

export default zScore
