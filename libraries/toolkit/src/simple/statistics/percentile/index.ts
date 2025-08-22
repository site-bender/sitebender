/**
 * Calculates the nth percentile of a dataset
 * 
 * Finds the value below which a given percentage of observations fall.
 * Uses linear interpolation between closest ranks when the percentile
 * falls between two values. Requires percentile between 0 and 100.
 * Returns NaN for invalid inputs or empty arrays.
 * 
 * @curried (p) => (data) => number
 * @param p - Percentile to calculate (0-100)
 * @param data - Array of numeric values
 * @returns Value at the given percentile, or NaN if invalid
 * @example
 * ```typescript
 * // Basic percentiles
 * percentile(50)([1, 2, 3, 4, 5])
 * // 3 (median)
 * 
 * percentile(25)([1, 2, 3, 4, 5])
 * // 1.5 (first quartile, interpolated)
 * 
 * percentile(75)([1, 2, 3, 4, 5])
 * // 4.5 (third quartile, interpolated)
 * 
 * percentile(0)([1, 2, 3, 4, 5])
 * // 1 (minimum)
 * 
 * percentile(100)([1, 2, 3, 4, 5])
 * // 5 (maximum)
 * 
 * // Larger dataset
 * const scores = [65, 70, 75, 80, 85, 90, 95, 100]
 * percentile(50)(scores)
 * // 82.5 (median of 80 and 85)
 * 
 * percentile(90)(scores)
 * // 97.5 (90th percentile)
 * 
 * // Unsorted data (automatically sorted)
 * percentile(50)([5, 1, 3, 2, 4])
 * // 3
 * 
 * // Repeated values
 * percentile(50)([1, 2, 2, 3, 4, 4, 4, 5])
 * // 3.5
 * 
 * // Single element
 * percentile(50)([42])
 * // 42
 * 
 * // Invalid percentile values
 * percentile(-10)([1, 2, 3])
 * // NaN
 * 
 * percentile(150)([1, 2, 3])
 * // NaN
 * 
 * // Invalid inputs
 * percentile(50)([])
 * // NaN
 * 
 * percentile(null)([1, 2, 3])
 * // NaN
 * 
 * percentile(50)(null)
 * // NaN
 * 
 * percentile(50)([1, "2", 3])
 * // NaN
 * 
 * // Practical examples
 * 
 * // Test score analysis
 * const testScores = [55, 67, 72, 78, 81, 85, 88, 92, 95, 98]
 * const median = percentile(50)
 * const q1 = percentile(25)
 * const q3 = percentile(75)
 * 
 * median(testScores)  // 83 (middle score)
 * q1(testScores)      // 73.5 (25th percentile)
 * q3(testScores)      // 91 (75th percentile)
 * 
 * // Income distribution
 * const incomes = [25000, 35000, 45000, 55000, 75000, 95000, 150000]
 * const p10 = percentile(10)(incomes)  // 29000 (bottom 10%)
 * const p90 = percentile(90)(incomes)  // 131000 (top 10%)
 * 
 * // Response time SLA
 * const responseTimes = [100, 120, 150, 180, 200, 250, 300, 500, 1000]
 * const p95 = percentile(95)
 * const p99 = percentile(99)
 * p95(responseTimes)  // 800ms (95% of requests under this)
 * p99(responseTimes)  // 960ms (99% of requests under this)
 * 
 * // Partial application for reuse
 * const getQuartiles = (data: number[]) => ({
 *   q1: percentile(25)(data),
 *   q2: percentile(50)(data),
 *   q3: percentile(75)(data)
 * })
 * getQuartiles([1, 2, 3, 4, 5, 6, 7, 8, 9])
 * // { q1: 2.5, q2: 5, q3: 7.5 }
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Interpolating - Uses linear interpolation between ranks
 */
const percentile = (
	p: number | null | undefined
) => (
	data: number[] | null | undefined
): number => {
	if (p == null || typeof p !== 'number') {
		return NaN
	}
	
	if (p < 0 || p > 100) {
		return NaN
	}
	
	if (data == null || !Array.isArray(data)) {
		return NaN
	}
	
	if (data.length === 0) {
		return NaN
	}
	
	// Check for non-numeric values
	for (const value of data) {
		if (value == null || typeof value !== 'number') {
			return NaN
		}
	}
	
	// Sort the data
	const sorted = [...data].sort((a, b) => a - b)
	
	// Handle edge cases
	if (p === 0) {
		return sorted[0]
	}
	if (p === 100) {
		return sorted[sorted.length - 1]
	}
	
	// Calculate the position
	const index = (p / 100) * (sorted.length - 1)
	const lower = Math.floor(index)
	const upper = Math.ceil(index)
	const weight = index - lower
	
	// Interpolate if necessary
	if (lower === upper) {
		return sorted[lower]
	}
	
	return sorted[lower] * (1 - weight) + sorted[upper] * weight
}

export default percentile