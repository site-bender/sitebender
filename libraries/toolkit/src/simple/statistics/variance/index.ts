/**
 * Calculates the variance of an array of numbers
 * 
 * Computes the average of the squared differences from the mean.
 * By default calculates population variance. Pass true as the first
 * argument to calculate sample variance (using Bessel's correction).
 * Variance is the square of standard deviation and measures data spread.
 * Returns NaN for empty arrays or arrays containing non-numeric values.
 * 
 * @curried (isSample) => (values) => variance
 * @param isSample - If true, calculates sample variance (default: false)
 * @param values - Array of numbers to calculate variance
 * @returns Variance of the values, or NaN if invalid
 * @example
 * ```typescript
 * // Population variance (default)
 * variance(false)([2, 4, 4, 4, 5, 5, 7, 9])
 * // 4
 * 
 * // Sample variance
 * variance(true)([2, 4, 4, 4, 5, 5, 7, 9])
 * // 4.571...
 * 
 * // Uniform values have zero variance
 * variance(false)([5, 5, 5, 5])
 * // 0
 * 
 * // Two values
 * variance(false)([1, 5])
 * // 4
 * 
 * variance(true)([1, 5])
 * // 8
 * 
 * // Empty array returns NaN
 * variance(false)([])
 * // NaN
 * 
 * // Invalid inputs return NaN
 * variance(false)(null)
 * // NaN
 * 
 * variance(false)([1, "2", 3])
 * // NaN
 * 
 * // Practical examples
 * 
 * // Investment risk assessment
 * const returns = [0.05, -0.02, 0.08, 0.03, -0.01, 0.06]
 * const risk = variance(true)(returns)
 * // 0.0015 (variance of returns)
 * 
 * // Quality control measurements
 * const measurements = [9.8, 10.2, 10.1, 9.9, 10.0, 10.1]
 * const popVariance = variance(false)(measurements)
 * // 0.0183...
 * 
 * // Partial application
 * const sampleVar = variance(true)
 * sampleVar([1, 2, 3, 4, 5])
 * // 2.5
 * 
 * const populationVar = variance(false)
 * populationVar([1, 2, 3, 4, 5])
 * // 2
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs or empty arrays
 */
const variance = (
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
	
	// Sample variance undefined for n = 1
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
	
	return sumSquaredDiff / divisor
}

export default variance