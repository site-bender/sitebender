/**
 * Calculates the geometric mean of an array of positive numbers
 *
 * Computes the nth root of the product of n numbers:
 * GM = (x₁ × x₂ × ... × xₙ)^(1/n). Geometric mean is particularly
 * useful for averaging growth rates, ratios, and percentages. All
 * values must be positive; returns NaN for empty arrays, non-positive
 * values, or invalid inputs.
 *
 * @param values - Array of positive numbers to calculate geometric mean
 * @returns Geometric mean of the values, or NaN if invalid
 * @example
 * ```typescript
 * // Basic geometric mean
 * geometricMean([2, 8])
 * // 4 (√(2 × 8) = √16)
 *
 * geometricMean([1, 3, 9])
 * // 3 (∛(1 × 3 × 9) = ∛27)
 *
 * geometricMean([4, 16, 64])
 * // 16
 *
 * // Equal values
 * geometricMean([5, 5, 5, 5])
 * // 5
 *
 * // Single value
 * geometricMean([10])
 * // 10
 *
 * // Small numbers
 * geometricMean([0.1, 0.2, 0.4])
 * // 0.2
 *
 * // Large product handled correctly
 * geometricMean([100, 200, 300])
 * // 181.71...
 *
 * // Zero or negative values return NaN
 * geometricMean([1, 0, 3])
 * // NaN (zero not allowed)
 *
 * geometricMean([1, -2, 3])
 * // NaN (negative values not allowed)
 *
 * // Empty array returns NaN
 * geometricMean([])
 * // NaN
 *
 * // Invalid inputs return NaN
 * geometricMean(null)
 * // NaN
 *
 * geometricMean([1, "2", 3])
 * // NaN
 *
 * // Practical examples
 *
 * // Average growth rate
 * // Year 1: 10% growth (1.10)
 * // Year 2: 20% growth (1.20)
 * // Year 3: -5% growth (0.95)
 * const growthFactors = [1.10, 1.20, 0.95]
 * const avgGrowth = geometricMean(growthFactors)
 * // 1.074... (7.4% average annual growth)
 *
 * // Investment returns
 * // Returns: +50%, -20%, +30%
 * const returns = [1.50, 0.80, 1.30]
 * geometricMean(returns)
 * // 1.145... (14.5% geometric average return)
 *
 * // Aspect ratio averaging
 * const aspectRatios = [16/9, 4/3, 21/9]
 * geometricMean(aspectRatios)
 * // 1.682...
 *
 * // Population growth
 * const populationMultipliers = [1.02, 1.025, 1.018, 1.022]
 * const avgGrowthRate = geometricMean(populationMultipliers)
 * // 1.021... (2.1% average growth)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs, empty arrays, or non-positive values
 */
const geometricMean = (
	values: Array<number> | null | undefined,
): number => {
	if (values == null || !Array.isArray(values)) {
		return NaN
	}

	const n = values.length

	if (n === 0) {
		return NaN
	}

	// Use logarithms to avoid overflow with large products
	// GM = exp((ln(x₁) + ln(x₂) + ... + ln(xₙ)) / n)
	let sumOfLogs = 0
	for (const value of values) {
		if (typeof value !== "number") {
			return NaN
		}

		// All values must be positive for geometric mean
		if (value <= 0) {
			return NaN
		}

		sumOfLogs += Math.log(value)
	}

	return Math.exp(sumOfLogs / n)
}

export default geometricMean
