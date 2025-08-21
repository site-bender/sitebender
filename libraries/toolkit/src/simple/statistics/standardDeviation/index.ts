/**
 * Calculates the standard deviation of an array of numbers
 * 
 * Computes the population standard deviation by default, which measures
 * the spread of data points from their mean. Pass true as the second
 * argument to calculate sample standard deviation (using Bessel's correction).
 * Returns NaN for empty arrays or arrays containing non-numeric values.
 * 
 * @curried (isSample) => (values) => standardDeviation
 * @param isSample - If true, calculates sample standard deviation (default: false)
 * @param values - Array of numbers to calculate standard deviation
 * @returns Standard deviation of the values, or NaN if invalid
 * @example
 * ```typescript
 * // Population standard deviation (default)
 * standardDeviation(false)([2, 4, 4, 4, 5, 5, 7, 9])
 * // 2
 * 
 * // Sample standard deviation
 * standardDeviation(true)([2, 4, 4, 4, 5, 5, 7, 9])
 * // 2.138...
 * 
 * // Uniform values have zero deviation
 * standardDeviation(false)([5, 5, 5, 5])
 * // 0
 * 
 * // Single value
 * standardDeviation(false)([10])
 * // 0
 * 
 * // Two values
 * standardDeviation(false)([1, 5])
 * // 2
 * 
 * // Empty array returns NaN
 * standardDeviation(false)([])
 * // NaN
 * 
 * // Invalid inputs return NaN
 * standardDeviation(false)(null)
 * // NaN
 * 
 * standardDeviation(false)([1, "2", 3])
 * // NaN
 * 
 * // Practical examples
 * 
 * // Test scores variation
 * const scores = [85, 90, 78, 92, 88, 76, 95, 89]
 * const populationStd = standardDeviation(false)(scores)
 * // 6.324...
 * 
 * const sampleStd = standardDeviation(true)(scores)
 * // 6.782...
 * 
 * // Investment returns volatility
 * const returns = [0.05, -0.02, 0.08, 0.03, -0.01, 0.06]
 * const volatility = standardDeviation(true)(returns)
 * // 0.0387...
 * 
 * // Partial application for population
 * const popStd = standardDeviation(false)
 * popStd([10, 12, 14, 16, 18])
 * // 2.828...
 * 
 * // Partial application for sample
 * const sampleStd = standardDeviation(true)
 * sampleStd([10, 12, 14, 16, 18])
 * // 3.162...
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs or empty arrays
 */
const standardDeviation = (
	isSample: boolean = false
) => (
	values: Array<number> | null | undefined
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
	let sum = 0
	for (const value of values) {
		if (typeof value !== 'number') {
			return NaN
		}
		sum += value
	}
	const mean = sum / n
	
	// Calculate sum of squared differences
	let sumSquaredDiff = 0
	for (const value of values) {
		const diff = value - mean
		sumSquaredDiff += diff * diff
	}
	
	// Divide by n for population, n-1 for sample (Bessel's correction)
	const divisor = isSample ? n - 1 : n
	const variance = sumSquaredDiff / divisor
	
	return Math.sqrt(variance)
}

export default standardDeviation