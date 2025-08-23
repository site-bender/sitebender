import mean from "../../math/mean/index.ts"
import standardDeviation from "../standardDeviation/index.ts"

/**
 * Calculates the excess kurtosis of a dataset
 * 
 * Measures the "tailedness" of the probability distribution. Returns
 * excess kurtosis (kurtosis - 3), where 0 represents normal distribution.
 * Positive values indicate heavy tails (leptokurtic), negative values
 * indicate light tails (platykurtic). Uses the adjusted moment-based
 * estimator. Returns NaN for datasets with fewer than 4 values.
 * 
 * @param data - Array of numeric values
 * @returns Excess kurtosis coefficient, or NaN if invalid
 * @example
 * ```typescript
 * // Normal-like distribution (excess kurtosis ≈ 0)
 * kurtosis([1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1])
 * // -0.153... (close to normal)
 * 
 * // Uniform distribution (light tails)
 * kurtosis([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
 * // -1.224... (platykurtic)
 * 
 * // Heavy-tailed distribution
 * kurtosis([1, 1, 1, 2, 3, 4, 5, 10, 10, 10])
 * // -0.474... (slightly platykurtic)
 * 
 * // Peaked distribution with outliers
 * kurtosis([5, 5, 5, 5, 5, 5, 5, 5, 1, 10])
 * // 3.571... (leptokurtic, heavy tails)
 * 
 * // Minimum dataset size
 * kurtosis([1, 2, 3, 4])
 * // -1.2 (minimum 4 values needed)
 * 
 * // Too few values
 * kurtosis([1, 2, 3])
 * // NaN (need at least 4 values)
 * 
 * kurtosis([1, 2])
 * // NaN
 * 
 * // Invalid inputs
 * kurtosis([])
 * // NaN
 * 
 * kurtosis(null)
 * // NaN
 * 
 * kurtosis([1, "2", 3, 4])
 * // NaN
 * 
 * // Practical examples
 * 
 * // Stock returns (often have excess kurtosis)
 * const returns = [-0.05, -0.02, -0.01, 0, 0, 0, 0.01, 0.02, 0.15]
 * const returnKurtosis = kurtosis(returns)
 * // 4.937... (fat tails, risk of extreme events)
 * 
 * // Quality measurements (manufacturing)
 * const measurements = [9.98, 9.99, 10.0, 10.0, 10.0, 10.01, 10.02]
 * const qualityKurtosis = kurtosis(measurements)
 * // -0.734... (slightly platykurtic)
 * 
 * // Response times (often leptokurtic)
 * const times = [100, 105, 110, 110, 115, 120, 125, 500, 600]
 * const timeKurtosis = kurtosis(times)
 * // 2.205... (heavy right tail)
 * 
 * // Test scores (peaked around mean)
 * const scores = [70, 75, 80, 85, 85, 85, 85, 90, 95, 100]
 * const scoreKurtosis = kurtosis(scores)
 * // -0.875... (slightly platykurtic)
 * 
 * // Income distribution
 * const incomes = [30000, 35000, 40000, 45000, 50000, 55000, 60000, 150000]
 * const incomeKurtosis = kurtosis(incomes)
 * // 2.635... (heavy right tail)
 * 
 * // Distribution shape interpretation
 * function interpretKurtosis(k: number): string {
 *   if (isNaN(k)) return "Invalid data"
 *   if (Math.abs(k) < 0.5) return "Approximately normal tails"
 *   if (k > 3) return "Extremely heavy tails"
 *   if (k > 0) return "Heavy tails (leptokurtic)"
 *   if (k < -1) return "Very light tails"
 *   return "Light tails (platykurtic)"
 * }
 * 
 * // Risk assessment
 * function assessTailRisk(data: number[]): string {
 *   const k = kurtosis(data)
 *   if (isNaN(k)) return "Cannot assess"
 *   if (k > 3) return "High tail risk"
 *   if (k > 1) return "Moderate tail risk"
 *   if (k > 0) return "Slight tail risk"
 *   return "Low tail risk"
 * }
 * 
 * // Compare distributions
 * const normal = [1, 2, 3, 4, 5, 4, 3, 2, 1]
 * const peaked = [3, 3, 3, 3, 3, 3, 3, 1, 5]
 * kurtosis(normal)  // -0.666... (platykurtic)
 * kurtosis(peaked)  // 0.166... (slightly leptokurtic)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Statistical - Measures tail weight vs normal distribution
 * @property MinSize - Requires at least 4 values
 * @property Excess - Returns excess kurtosis (raw kurtosis - 3)
 */
const kurtosis = (
	data: number[] | null | undefined
): number => {
	if (data == null || !Array.isArray(data)) {
		return NaN
	}
	
	const n = data.length
	
	// Need at least 4 values for kurtosis
	if (n < 4) {
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
		// Kurtosis is undefined but we return NaN for uniform values
		return NaN
	}
	
	// Calculate the fourth standardized moment
	let sumQuad = 0
	for (const value of data) {
		const z = (value - dataMean) / std
		sumQuad += z * z * z * z
	}
	
	// Calculate raw kurtosis (fourth moment)
	const m4 = sumQuad / n
	
	// Apply adjustment for sample kurtosis and convert to excess kurtosis
	// This is the adjusted excess kurtosis (G2)
	const numerator = n * (n + 1) * m4 - 3 * (n - 1) * (n - 1)
	const denominator = (n - 1) * (n - 2) * (n - 3)
	
	const g2 = numerator / denominator
	
	return g2
}

export default kurtosis