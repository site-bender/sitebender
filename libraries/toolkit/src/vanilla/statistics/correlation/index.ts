import mean from "../../math/mean/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the Pearson correlation coefficient between two datasets
 *
 * Measures the linear correlation between two variables, returning a value
 * between -1 and 1. A value of 1 indicates perfect positive correlation,
 * -1 indicates perfect negative correlation, and 0 indicates no linear
 * correlation. Arrays must be of equal length. Returns NaN for invalid
 * inputs or if standard deviation is zero.
 *
 * @param x - First array of numeric values
 * @param y - Second array of numeric values
 * @returns Correlation coefficient (-1 to 1), or NaN if invalid
 * @example
 * ```typescript
 * // Perfect positive correlation
 * correlation([1, 2, 3, 4, 5])([2, 4, 6, 8, 10])
 * // 1
 *
 * // Perfect negative correlation
 * correlation([1, 2, 3, 4, 5])([5, 4, 3, 2, 1])
 * // -1
 *
 * // No correlation (constant values)
 * correlation([1, 2, 3, 4, 5])([3, 3, 3, 3, 3])
 * // 0
 *
 * // Strong positive correlation
 * correlation([1, 2, 3, 4, 5])([1.5, 3.2, 4.8, 6.1, 7.9])
 * // 0.999...
 *
 * // Different lengths
 * correlation([1, 2, 3])([1, 2])  // NaN
 *
 * // Invalid inputs
 * correlation(null)([1, 2, 3])  // NaN
 * correlation([])([])  // NaN
 * ```
 * @pure
 * @curried
 * @safe
 */
const correlation = (
	x: number[] | null | undefined,
) =>
(
	y: number[] | null | undefined,
): number => {
	if (isNullish(x) || !Array.isArray(x)) {
		return NaN
	}

	if (isNullish(y) || !Array.isArray(y)) {
		return NaN
	}

	if (x.length !== y.length) {
		return NaN
	}

	if (x.length === 0) {
		return NaN
	}

	// Need at least 2 points for correlation
	if (x.length < 2) {
		return NaN
	}

	// Check for non-numeric values
	const hasInvalidValues = x.some((val, i) =>
		isNullish(val) || typeof val !== "number" ||
		isNullish(y[i]) || typeof y[i] !== "number"
	)

	if (hasInvalidValues) {
		return NaN
	}

	// Calculate means
	const meanX = mean(x)
	const meanY = mean(y)

	// Calculate covariance and standard deviations
	const stats = x.reduce((acc, xi, i) => {
		const dx = xi - meanX
		const dy = y[i] - meanY
		return {
			covariance: acc.covariance + dx * dy,
			varianceX: acc.varianceX + dx * dx,
			varianceY: acc.varianceY + dy * dy,
		}
	}, { covariance: 0, varianceX: 0, varianceY: 0 })

	const { covariance, varianceX, varianceY } = stats

	// Check for zero variance (constant values)
	if (varianceX === 0 || varianceY === 0) {
		return 0
	}

	// Calculate correlation coefficient
	const stdDevX = Math.sqrt(varianceX)
	const stdDevY = Math.sqrt(varianceY)

	return covariance / (stdDevX * stdDevY)
}

export default correlation
