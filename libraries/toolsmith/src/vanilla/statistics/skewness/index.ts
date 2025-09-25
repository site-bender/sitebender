import mean from "../../math/mean/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
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
 * // Symmetric distribution
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
 * // Minimum dataset size (3 values)
 * skewness([1, 2, 3])
 * // 0
 *
 * // Too few values
 * skewness([1, 2])  // NaN
 *
 * // Invalid inputs
 * skewness([])  // NaN
 * skewness(null)  // NaN
 * ```
 * @pure
 * @safe
 */
export default function skewness(
	data: number[] | null | undefined,
): number {
	if (isNullish(data) || !Array.isArray(data)) {
		return NaN
	}

	const n = data.length

	// Need at least 3 values for skewness
	if (n < 3) {
		return NaN
	}

	// Check for non-numeric values
	const hasInvalidValues = data.some(function checkInvalidValue(value) {
		return isNullish(value) || typeof value !== "number"
	})

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
		// Skewness is undefined but we return 0 for uniform distribution
		return 0
	}

	// Calculate the third standardized moment
	const sumCubed = data.reduce(function calculateCubedSum(sum, value) {
		const z = (value - dataMean) / std
		return sum + z * z * z
	}, 0)

	// Apply adjustment factor for sample skewness (G1)
	// This is the adjusted Fisher-Pearson standardized moment coefficient
	const g1 = (n / ((n - 1) * (n - 2))) * sumCubed

	return g1
}
