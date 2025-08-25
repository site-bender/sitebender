import mean from "../../math/mean/index.ts"
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
 * @curried (value) => (data) => (sample?) => number
 * @param value - The value to calculate z-score for
 * @param data - Array of numeric values representing the dataset
 * @param sample - If true, uses sample standard deviation (default: false)
 * @returns Z-score of the value, or NaN if invalid
 * @example
 * ```typescript
 * // Basic z-score calculations
 * zScore(5)([1, 2, 3, 4, 5, 6, 7, 8, 9])()
 * // 0 (5 is the mean)
 *
 * zScore(9)([1, 2, 3, 4, 5, 6, 7, 8, 9])()
 * // 1.549... (above mean)
 *
 * zScore(1)([1, 2, 3, 4, 5, 6, 7, 8, 9])()
 * // -1.549... (below mean)
 *
 * // Sample vs population
 * zScore(10)([5, 10, 15, 20, 25])()      // Population
 * // -1
 *
 * zScore(10)([5, 10, 15, 20, 25])(true)  // Sample
 * // -0.9128...
 *
 * // Outlier detection (|z| > 3 often considered outlier)
 * zScore(100)([10, 12, 11, 13, 12, 11, 10, 12, 13])()
 * // 31.97... (extreme outlier)
 *
 * zScore(15)([10, 12, 11, 13, 12, 11, 10, 12, 13])()
 * // 2.066... (mild outlier)
 *
 * // Value at mean
 * const data = [20, 30, 40, 50, 60]
 * zScore(40)(data)()
 * // 0 (exactly at mean)
 *
 * // Standard positions
 * const normalData = [1, 2, 3, 4, 5, 6, 7]
 * const m = mean(normalData)  // 4
 * const sd = standardDeviation(normalData)()  // 2
 * zScore(6)(normalData)()  // 1 (one std dev above)
 * zScore(2)(normalData)()  // -1 (one std dev below)
 *
 * // Constant data (zero variance)
 * zScore(5)([5, 5, 5, 5, 5])()
 * // 0 (at mean, but also only value)
 *
 * zScore(3)([5, 5, 5, 5, 5])()
 * // NaN (std dev is 0, can't standardize)
 *
 * // Invalid inputs
 * zScore(5)([])()
 * // NaN (empty dataset)
 *
 * zScore(null)([1, 2, 3])()
 * // NaN
 *
 * zScore(5)([1, "2", 3])()
 * // NaN
 *
 * // Practical examples
 *
 * // Test score standardization
 * const testScores = [65, 70, 75, 80, 85, 90, 95]
 * const standardize = zScore(85)
 * standardize(testScores)()  // 0.5 (half std dev above mean)
 *
 * // Height percentiles
 * const heights = [160, 165, 170, 175, 180, 185, 190]
 * zScore(195)(heights)()  // 2.16... (very tall)
 * zScore(155)(heights)()  // -2.16... (very short)
 *
 * // Quality control
 * const measurements = [9.8, 10.1, 10.0, 9.9, 10.2, 10.0, 9.9, 10.1]
 * const checkQuality = (value: number) => {
 *   const z = zScore(value)(measurements)()
 *   return Math.abs(z) < 2  // Within 2 std devs
 * }
 * checkQuality(10.0)  // true (acceptable)
 * checkQuality(11.0)  // false (out of spec)
 *
 * // Compare across different scales
 * const exam1 = [70, 75, 80, 85, 90]  // Mean: 80
 * const exam2 = [60, 65, 70, 75, 80]  // Mean: 70
 *
 * // Student scored 85 on exam1, 75 on exam2
 * zScore(85)(exam1)()  // 0.632... std devs above
 * zScore(75)(exam2)()  // 0.632... std devs above (same relative performance)
 *
 * // Anomaly detection threshold
 * const detectAnomaly = (value: number, data: number[], threshold = 3) => {
 *   const z = zScore(value)(data)()
 *   return Math.abs(z) > threshold
 * }
 * detectAnomaly(50, [10, 12, 11, 13, 12])  // true (anomaly)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Standardized - Output in standard deviation units
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
	if (value == null || typeof value !== "number") {
		return NaN
	}

	if (data == null || !Array.isArray(data)) {
		return NaN
	}

	if (data.length === 0) {
		return NaN
	}

	// Check for non-numeric values in data
	for (const d of data) {
		if (d == null || typeof d !== "number") {
			return NaN
		}
	}

	const dataMean = mean(data)
	const dataStdDev = standardDeviation(data)(sample)

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
