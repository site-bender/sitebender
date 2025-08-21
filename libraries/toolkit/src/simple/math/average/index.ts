/**
 * Calculates the arithmetic mean of an array of numbers
 * 
 * Computes the average value by summing all numbers and dividing by
 * the count. Returns NaN for empty arrays or arrays containing
 * non-numeric values, enabling safe error handling in functional
 * pipelines. Also available as the `mean` alias.
 * 
 * @param numbers - Array of numbers to average
 * @returns Arithmetic mean of the numbers, or NaN if invalid
 * @example
 * ```typescript
 * // Basic average
 * average([1, 2, 3, 4, 5])
 * // 3
 * 
 * average([10, 20, 30])
 * // 20
 * 
 * average([5, 5, 5, 5])
 * // 5
 * 
 * // Decimal numbers
 * average([1.5, 2.5, 3.5])
 * // 2.5
 * 
 * average([0.1, 0.2, 0.3])
 * // 0.2
 * 
 * // Negative numbers
 * average([-10, -20, -30])
 * // -20
 * 
 * average([-5, 0, 5])
 * // 0
 * 
 * average([1, -1, 2, -2])
 * // 0
 * 
 * // Mixed positive and negative
 * average([10, -5, 20, -10, 15])
 * // 6
 * 
 * // Single element
 * average([42])
 * // 42
 * 
 * average([0])
 * // 0
 * 
 * // Large numbers
 * average([1000000, 2000000, 3000000])
 * // 2000000
 * 
 * // Small numbers
 * average([0.001, 0.002, 0.003])
 * // 0.002
 * 
 * // Empty array returns NaN
 * average([])
 * // NaN
 * 
 * // Invalid inputs return NaN
 * average(null)
 * // NaN
 * 
 * average(undefined)
 * // NaN
 * 
 * average("not an array")
 * // NaN
 * 
 * // Arrays with non-numeric values return NaN
 * average([1, 2, "3", 4])
 * // NaN
 * 
 * average([1, 2, null, 4])
 * // NaN
 * 
 * average([1, 2, undefined, 4])
 * // NaN
 * 
 * average([1, 2, NaN, 4])
 * // NaN
 * 
 * // Special numeric values
 * average([Infinity, 1, 2])
 * // Infinity
 * 
 * average([-Infinity, 1, 2])
 * // -Infinity
 * 
 * average([Infinity, -Infinity])
 * // NaN
 * 
 * // Practical examples
 * 
 * // Test scores
 * const scores = [85, 92, 78, 95, 88]
 * average(scores)
 * // 87.6
 * 
 * // Temperature readings
 * const temperatures = [72.5, 75.0, 73.2, 74.8, 71.9]
 * average(temperatures)
 * // 73.48
 * 
 * // Sales data
 * const dailySales = [1250, 1875, 2100, 1650, 1925]
 * average(dailySales)
 * // 1760
 * 
 * // Response times (ms)
 * const responseTimes = [120, 95, 150, 88, 110]
 * average(responseTimes)
 * // 112.6
 * 
 * // Grade calculation
 * function calculateGrade(assignments: Array<number>): string {
 *   const avg = average(assignments)
 *   if (avg >= 90) return 'A'
 *   if (avg >= 80) return 'B'
 *   if (avg >= 70) return 'C'
 *   if (avg >= 60) return 'D'
 *   return 'F'
 * }
 * calculateGrade([92, 88, 95, 90])
 * // 'A'
 * 
 * // Moving average
 * function movingAverage(data: Array<number>, window: number): Array<number> {
 *   const result: Array<number> = []
 *   for (let i = window - 1; i < data.length; i++) {
 *     const subset = data.slice(i - window + 1, i + 1)
 *     const avg = average(subset)
 *     if (!isNaN(avg)) result.push(avg)
 *   }
 *   return result
 * }
 * movingAverage([1, 2, 3, 4, 5, 6], 3)
 * // [2, 3, 4, 5]
 * 
 * // Portfolio returns
 * const returns = [0.05, -0.02, 0.08, 0.03, -0.01]
 * const avgReturn = average(returns)
 * // 0.026 (2.6% average return)
 * 
 * // Data validation
 * function isValidDataset(data: Array<unknown>): boolean {
 *   const nums = data.filter(x => typeof x === 'number') as Array<number>
 *   return !isNaN(average(nums)) && nums.length === data.length
 * }
 * isValidDataset([1, 2, 3])
 * // true
 * isValidDataset([1, "2", 3])
 * // false
 * 
 * // Sensor readings with outlier detection
 * function detectOutliers(readings: Array<number>): Array<number> {
 *   const avg = average(readings)
 *   const threshold = avg * 0.5
 *   return readings.filter(r => Math.abs(r - avg) > threshold)
 * }
 * detectOutliers([10, 12, 11, 50, 9, 11])
 * // [50]
 * 
 * // Performance metrics
 * const cpuUsage = [45, 52, 48, 55, 51, 49, 53]
 * const avgCpu = average(cpuUsage)
 * console.log(`Average CPU usage: ${avgCpu.toFixed(1)}%`)
 * // "Average CPU usage: 50.4%"
 * 
 * // Weighted average helper (simplified)
 * function weightedAverage(values: Array<number>, weights: Array<number>): number {
 *   const weighted = values.map((v, i) => v * (weights[i] ?? 1))
 *   const totalWeight = weights.reduce((sum, w) => sum + w, 0)
 *   return average(weighted) * (values.length / totalWeight)
 * }
 * weightedAverage([80, 90, 70], [0.3, 0.5, 0.2])
 * // 82
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs or empty arrays
 * @property Aliases - Also available as `mean`
 */
const average = (
	numbers: Array<number> | null | undefined
): number => {
	if (numbers == null || !Array.isArray(numbers)) {
		return NaN
	}
	
	if (numbers.length === 0) {
		return NaN
	}
	
	// Check for non-numeric values
	for (const num of numbers) {
		if (typeof num !== 'number') {
			return NaN
		}
	}
	
	const sum = numbers.reduce((acc, num) => acc + num, 0)
	return sum / numbers.length
}

export default average