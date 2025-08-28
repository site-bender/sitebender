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
 * // -0.153...
 *
 * // Uniform distribution (light tails)
 * kurtosis([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
 * // -1.224... (platykurtic)
 *
 * // Peaked distribution with outliers
 * kurtosis([5, 5, 5, 5, 5, 5, 5, 5, 1, 10])
 * // 3.571... (leptokurtic, heavy tails)
 *
 * // Minimum dataset size (4 values)
 * kurtosis([1, 2, 3, 4])
 * // -1.2
 *
 * // Too few values
 * kurtosis([1, 2, 3])  // NaN
 *
 * // Invalid inputs
 * kurtosis([])  // NaN
 * kurtosis(null)  // NaN
 * ```
 * @pure
 * @safe
 */
const kurtosis = (
	data: number[] | null | undefined,
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
	const hasInvalidValues = data.some(value => 
		value == null || typeof value !== "number"
	)
	
	if (hasInvalidValues) {
		return NaN
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
	const sumQuad = data.reduce((sum, value) => {
		const z = (value - dataMean) / std
		return sum + z * z * z * z
	}, 0)

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
