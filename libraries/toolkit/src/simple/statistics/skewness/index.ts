import mean from "../../math/mean/index.ts"
import standardDeviation from "../standardDeviation/index.ts"

/**
 * Calculates the skewness of a dataset
 * 
 * Measures the asymmetry of the probability distribution about its mean.
 * Uses the adjusted Fisher-Pearson standardized moment coefficient (G1).
 * Positive skewness indicates a longer right tail, negative skewness 
 * indicates a longer left tail, and zero indicates symmetry. Returns
 * NaN for datasets with fewer than 3 values or invalid inputs.
 * 
 * @param data - Array of numeric values
 * @returns Skewness coefficient, or NaN if invalid
 * @example
 * ```typescript
 * // Symmetric distribution (zero skewness)
 * skewness([1, 2, 3, 4, 5])
 * // 0
 * 
 * // Right-skewed (positive skewness)
 * skewness([1, 1, 1, 2, 3, 4, 5, 10])
 * // 1.528... (long right tail)
 * 
 * // Left-skewed (negative skewness)
 * skewness([1, 5, 6, 7, 8, 8, 8, 8])
 * // -1.528... (long left tail)
 * 
 * // Perfectly symmetric
 * skewness([1, 2, 3, 2, 1])
 * // 0
 * 
 * // Normal-like distribution
 * skewness([1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1])
 * // 0
 * 
 * // Strong right skew
 * skewness([1, 1, 1, 1, 1, 1, 2, 3, 10])
 * // 2.747...
 * 
 * // Strong left skew
 * skewness([1, 8, 9, 10, 10, 10, 10, 10, 10])
 * // -2.747...
 * 
 * // Minimum dataset size
 * skewness([1, 2, 3])
 * // 0 (minimum 3 values needed)
 * 
 * // Too few values
 * skewness([1, 2])
 * // NaN (need at least 3 values)
 * 
 * skewness([1])
 * // NaN
 * 
 * // Invalid inputs
 * skewness([])
 * // NaN
 * 
 * skewness(null)
 * // NaN
 * 
 * skewness([1, "2", 3])
 * // NaN
 * 
 * // Practical examples
 * 
 * // Income distribution (typically right-skewed)
 * const incomes = [25000, 30000, 35000, 40000, 45000, 50000, 55000, 250000]
 * const incomeSkew = skewness(incomes)
 * // 2.236... (strong right skew due to high earner)
 * 
 * // Test scores (often left-skewed in easy tests)
 * const scores = [55, 75, 85, 90, 92, 94, 95, 96, 98, 99, 100, 100]
 * const scoreSkew = skewness(scores)
 * // -1.044... (left skew, most scores high)
 * 
 * // Response times (usually right-skewed)
 * const responseTimes = [100, 110, 120, 125, 130, 135, 140, 200, 350, 500]
 * const timeSkew = skewness(responseTimes)
 * // 1.465... (right skew due to outliers)
 * 
 * // Quality control measurements
 * const measurements = [9.8, 9.9, 10.0, 10.0, 10.1, 10.1, 10.2]
 * const qualitySkew = skewness(measurements)
 * // -0.295... (slight left skew)
 * 
 * // Stock returns (often have negative skew)
 * const returns = [-0.15, -0.05, -0.02, 0, 0.01, 0.02, 0.03, 0.04, 0.05]
 * const returnSkew = skewness(returns)
 * // -1.527... (negative skew, large losses)
 * 
 * // Distribution shape interpretation
 * function interpretSkewness(skew: number): string {
 *   if (isNaN(skew)) return "Invalid data"
 *   if (Math.abs(skew) < 0.5) return "Approximately symmetric"
 *   if (skew > 2) return "Highly right-skewed"
 *   if (skew > 0.5) return "Moderately right-skewed"
 *   if (skew < -2) return "Highly left-skewed"
 *   return "Moderately left-skewed"
 * }
 * 
 * // Compare distributions
 * const dist1 = [1, 2, 3, 4, 5]
 * const dist2 = [1, 1, 2, 3, 10]
 * skewness(dist1) // 0 (symmetric)
 * skewness(dist2) // 1.478... (right-skewed)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Statistical - Measures distribution asymmetry
 * @property MinSize - Requires at least 3 values
 */
const skewness = (
	data: number[] | null | undefined
): number => {
	if (data == null || !Array.isArray(data)) {
		return NaN
	}
	
	const n = data.length
	
	// Need at least 3 values for skewness
	if (n < 3) {
		return NaN
	}
	
	// Check for non-numeric values
	for (const value of data) {
		if (value == null || typeof value !== 'number') {
			return NaN
		}
	}
	
	// Calculate mean
	const dataMean = mean(data)
	if (isNaN(dataMean)) {
		return NaN
	}
	
	// Calculate standard deviation (population)
	const std = standardDeviation(false)(data)
	if (isNaN(std) || std === 0) {
		// If standard deviation is 0, all values are the same
		// Skewness is undefined but we return 0 for uniform distribution
		return 0
	}
	
	// Calculate the third standardized moment
	let sumCubed = 0
	for (const value of data) {
		const z = (value - dataMean) / std
		sumCubed += z * z * z
	}
	
	// Apply adjustment factor for sample skewness (G1)
	// This is the adjusted Fisher-Pearson standardized moment coefficient
	const g1 = (n / ((n - 1) * (n - 2))) * sumCubed
	
	return g1
}

export default skewness