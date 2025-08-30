import mean from "../../math/mean/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the covariance between two datasets
 *
 * Measures how two variables vary together. Positive covariance indicates
 * variables tend to increase together, negative indicates one increases as
 * the other decreases, and zero indicates no linear relationship. Returns
 * population covariance by default. Arrays must be of equal length. Returns
 * NaN for invalid inputs or arrays with less than 2 elements.
 *
 * @param x - First array of numeric values
 * @param y - Second array of numeric values
 * @param sample - If true, calculates sample covariance (divides by n-1)
 * @returns Covariance value, or NaN if invalid
 * @example
 * ```typescript
 * // Positive covariance
 * covariance([1, 2, 3, 4, 5])([2, 4, 6, 8, 10])()
 * // 4 (population covariance)
 *
 * // Sample covariance (divides by n-1)
 * covariance([1, 2, 3, 4, 5])([2, 4, 6, 8, 10])(true)
 * // 5
 *
 * // Negative covariance
 * covariance([1, 2, 3, 4, 5])([5, 4, 3, 2, 1])()
 * // -2
 *
 * // No covariance (independent)
 * covariance([1, 2, 3, 4, 5])([3, 3, 3, 3, 3])()
 * // 0
 *
 * // Invalid inputs
 * covariance([1, 2, 3])([1, 2])()  // NaN (different lengths)
 * covariance([5])([10])()  // NaN (too few elements)
 * ```
 * @pure
 * @curried
 * @safe
 */
const covariance = (
	x: number[] | null | undefined,
) =>
(
	y: number[] | null | undefined,
) =>
(
	sample: boolean = false,
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

	// Need at least 2 points for covariance
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

	// Calculate covariance
	const sum = x.reduce((acc, xi, i) => 
		acc + (xi - meanX) * (y[i] - meanY), 0
	)

	// Divide by n for population, n-1 for sample
	const divisor = sample ? x.length - 1 : x.length

	return sum / divisor
}

export default covariance
