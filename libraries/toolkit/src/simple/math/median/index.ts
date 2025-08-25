/**
 * Finds the median value of an array of numbers
 *
 * Calculates the middle value when the array is sorted. For arrays with
 * an odd number of elements, returns the middle element. For arrays with
 * an even number of elements, returns the average of the two middle elements.
 * Returns NaN for empty arrays or arrays containing non-numeric values.
 *
 * @curried (numbers) => median
 * @param numbers - Array of numbers to find the median of
 * @returns The median value, or NaN if invalid input
 * @example
 * ```typescript
 * // Odd number of elements
 * median([3, 1, 2])
 * // 2
 *
 * median([5, 2, 8, 1, 9])
 * // 5
 *
 * median([7])
 * // 7
 *
 * // Even number of elements (average of middle two)
 * median([1, 2, 3, 4])
 * // 2.5
 *
 * median([10, 20])
 * // 15
 *
 * median([1, 3, 5, 7, 9, 11])
 * // 6
 *
 * // Already sorted arrays
 * median([1, 2, 3, 4, 5])
 * // 3
 *
 * median([10, 20, 30, 40])
 * // 25
 *
 * // Unsorted arrays
 * median([9, 3, 5, 7, 1])
 * // 5
 *
 * median([100, 10, 50, 20, 80])
 * // 50
 *
 * // Negative numbers
 * median([-5, -2, -8, -1, -3])
 * // -3
 *
 * median([-10, 0, 10])
 * // 0
 *
 * median([-5, -10, -15, -20])
 * // -12.5
 *
 * // Mixed positive and negative
 * median([-2, -1, 0, 1, 2])
 * // 0
 *
 * median([-10, -5, 5, 10])
 * // 0
 *
 * // Decimal numbers
 * median([1.5, 2.5, 3.5])
 * // 2.5
 *
 * median([0.1, 0.2, 0.3, 0.4])
 * // 0.25
 *
 * median([1.1, 2.2, 3.3, 4.4, 5.5])
 * // 3.3
 *
 * // Duplicate values
 * median([5, 5, 5, 5, 5])
 * // 5
 *
 * median([1, 2, 2, 3, 3, 3])
 * // 2.5
 *
 * median([10, 10, 20, 20, 30])
 * // 20
 *
 * // Large numbers
 * median([1000000, 2000000, 3000000])
 * // 2000000
 *
 * median([Number.MAX_SAFE_INTEGER, 0, 1000])
 * // 1000
 *
 * // Special numeric values
 * median([1, 2, 3, Infinity])
 * // 2.5
 *
 * median([-Infinity, 0, Infinity])
 * // 0
 *
 * median([1, 2, NaN, 3, 4])
 * // NaN (contains invalid value)
 *
 * // Empty array
 * median([])
 * // NaN
 *
 * // Invalid inputs
 * median(null)
 * // NaN
 *
 * median(undefined)
 * // NaN
 *
 * median("not an array")
 * // NaN
 *
 * median([1, "2", 3])
 * // NaN (contains non-numeric value)
 *
 * median([1, null, 3])
 * // NaN
 *
 * median([1, undefined, 3])
 * // NaN
 *
 * // Statistical examples
 * const testScores = [85, 92, 78, 95, 88, 73, 98]
 * median(testScores)
 * // 88
 *
 * const salaries = [45000, 50000, 55000, 60000, 65000, 70000, 120000]
 * median(salaries)
 * // 60000
 *
 * const ages = [22, 25, 27, 29, 31, 33, 35, 38, 42]
 * median(ages)
 * // 31
 *
 * // Temperature readings
 * const temperatures = [68.5, 70.2, 71.8, 69.3, 72.1]
 * median(temperatures)
 * // 70.2
 *
 * // Response times (ms)
 * const responseTimes = [120, 145, 98, 210, 165, 133, 177]
 * median(responseTimes)
 * // 145
 *
 * // Product ratings
 * const ratings = [4.5, 3.8, 4.2, 4.9, 3.5, 4.7, 4.1]
 * median(ratings)
 * // 4.2
 *
 * // House prices (outlier resistant)
 * const housePrices = [250000, 280000, 310000, 295000, 1200000]
 * median(housePrices)
 * // 295000 (not skewed by the mansion)
 *
 * // Class sizes
 * const classSizes = [18, 22, 25, 20, 24, 19, 23]
 * median(classSizes)
 * // 22
 *
 * // Daily steps
 * const dailySteps = [8500, 10200, 7800, 9500, 11000, 6500, 9000]
 * median(dailySteps)
 * // 9000
 *
 * // Investment returns (%)
 * const returns = [-2.5, 3.2, 5.8, -1.3, 4.5, 6.2, 2.1]
 * median(returns)
 * // 3.2
 *
 * // Comparing with mean (average)
 * const dataset = [1, 2, 3, 4, 100]
 * median(dataset)
 * // 3 (robust to outliers)
 * // mean would be 22 (affected by outlier)
 *
 * // Finding middle performance
 * const lapTimes = [65.2, 63.8, 64.5, 66.1, 63.5, 64.2, 65.8]
 * median(lapTimes)
 * // 64.5
 *
 * // Percentile calculation helper
 * function getPercentile(data: Array<number>, percentile: number): number {
 *   if (percentile === 50) return median(data)
 *   // ... other percentile logic
 *   return NaN
 * }
 * getPercentile([1, 2, 3, 4, 5], 50)
 * // 3
 *
 * // Quartile analysis
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * const q2 = median(data)
 * // 5 (second quartile/median)
 *
 * // Pipeline with validation
 * const safeMedian = (values: unknown): number | null => {
 *   if (!Array.isArray(values)) return null
 *   const result = median(values)
 *   return isNaN(result) ? null : result
 * }
 * safeMedian([1, 2, 3, 4, 5])
 * // 3
 * safeMedian("invalid")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Robust - Not affected by outliers like mean/average
 * @property Stable - Consistent ordering produces consistent results
 */
const median = (
	numbers: Array<number> | null | undefined,
): number => {
	if (numbers == null || !Array.isArray(numbers)) {
		return NaN
	}

	if (numbers.length === 0) {
		return NaN
	}

	// Check for non-numeric values
	const hasInvalidValue = numbers.some(
		(num) => num == null || typeof num !== "number" || isNaN(num),
	)

	if (hasInvalidValue) {
		return NaN
	}

	// Create a sorted copy to avoid mutating the input
	const sorted = [...numbers].sort((a, b) => a - b)

	const middle = Math.floor(sorted.length / 2)

	// If odd number of elements, return the middle one
	if (sorted.length % 2 !== 0) {
		return sorted[middle]
	}

	// If even number of elements, return average of the two middle ones
	return (sorted[middle - 1] + sorted[middle]) / 2
}

export default median
