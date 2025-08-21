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
 * // Basic harmonic mean
 * harmonicMean([1, 2, 3])
 * // 1.636... (3 / (1/1 + 1/2 + 1/3))
 * 
 * harmonicMean([2, 4, 8])
 * // 3.428...
 * 
 * // Equal values
 * harmonicMean([5, 5, 5, 5])
 * // 5
 * 
 * // Two values
 * harmonicMean([40, 60])
 * // 48 (harmonic mean of speeds)
 * 
 * // Single value
 * harmonicMean([10])
 * // 10
 * 
 * // Small numbers
 * harmonicMean([0.1, 0.2, 0.3])
 * // 0.163...
 * 
 * // Zero or negative values return NaN
 * harmonicMean([1, 0, 3])
 * // NaN (zero causes division by zero)
 * 
 * harmonicMean([1, -2, 3])
 * // NaN (negative values not allowed)
 * 
 * // Empty array returns NaN
 * harmonicMean([])
 * // NaN
 * 
 * // Invalid inputs return NaN
 * harmonicMean(null)
 * // NaN
 * 
 * harmonicMean([1, "2", 3])
 * // NaN
 * 
 * // Practical examples
 * 
 * // Average speed for round trip
 * // Going: 60 mph, Returning: 40 mph
 * const speeds = [60, 40]
 * harmonicMean(speeds)
 * // 48 mph (correct average speed)
 * 
 * // Average rate of work
 * // Worker A: 3 hours/task, Worker B: 6 hours/task
 * const rates = [1/3, 1/6]  // tasks per hour
 * const avgRate = harmonicMean(rates)
 * // 0.222... tasks/hour
 * 
 * // P/E ratio averaging
 * const peRatios = [15, 20, 25]
 * harmonicMean(peRatios)
 * // 18.75
 * 
 * // Resistance in parallel circuits
 * const resistances = [10, 20, 30]  // ohms
 * const totalResistance = 1 / (1/harmonicMean(resistances) * resistances.length)
 * // 5.45... ohms
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs, empty arrays, or non-positive values
 */
const harmonicMean = (
	values: Array<number> | null | undefined
): number => {
	if (values == null || !Array.isArray(values)) {
		return NaN
	}
	
	const n = values.length
	
	if (n === 0) {
		return NaN
	}
	
	// Calculate sum of reciprocals
	let sumOfReciprocals = 0
	for (const value of values) {
		if (typeof value !== 'number') {
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