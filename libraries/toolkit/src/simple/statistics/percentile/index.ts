import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the nth percentile of a dataset
 *
 * Finds the value below which a given percentage of observations fall.
 * Uses linear interpolation between closest ranks when the percentile
 * falls between two values. Requires percentile between 0 and 100.
 * Returns NaN for invalid inputs or empty arrays.
 *
 * @param p - Percentile to calculate (0-100)
 * @param data - Array of numeric values
 * @returns Value at the given percentile, or NaN if invalid
 * @example
 * ```typescript
 * // Basic percentiles
 * percentile(50)([1, 2, 3, 4, 5])
 * // 3 (median)
 *
 * percentile(25)([1, 2, 3, 4, 5])
 * // 1.5 (first quartile)
 *
 * percentile(75)([1, 2, 3, 4, 5])
 * // 4.5 (third quartile)
 *
 * percentile(0)([1, 2, 3, 4, 5])  // 1 (minimum)
 * percentile(100)([1, 2, 3, 4, 5])  // 5 (maximum)
 *
 * // Unsorted data (automatically sorted)
 * percentile(50)([5, 1, 3, 2, 4])
 * // 3
 *
 * // Invalid inputs
 * percentile(-10)([1, 2, 3])  // NaN
 * percentile(50)([])  // NaN
 * ```
 * @pure
 * @curried
 * @safe
 */
const percentile = (
	p: number | null | undefined,
) =>
(
	data: number[] | null | undefined,
): number => {
	if (isNullish(p) || typeof p !== "number") {
		return NaN
	}

	if (p < 0 || p > 100) {
		return NaN
	}

	if (isNullish(data) || !Array.isArray(data)) {
		return NaN
	}

	if (data.length === 0) {
		return NaN
	}

	// Check for non-numeric values
	const hasInvalidValues = data.some(value => 
		isNullish(value) || typeof value !== "number"
	)
	
	if (hasInvalidValues) {
		return NaN
	}

	// Sort the data
	const sorted = [...data].sort((a, b) => a - b)

	// Handle edge cases
	if (p === 0) {
		return sorted[0]
	}
	if (p === 100) {
		return sorted[sorted.length - 1]
	}

	// Calculate the position
	const index = (p / 100) * (sorted.length - 1)
	const lower = Math.floor(index)
	const upper = Math.ceil(index)
	const weight = index - lower

	// Interpolate if necessary
	if (lower === upper) {
		return sorted[lower]
	}

	return sorted[lower] * (1 - weight) + sorted[upper] * weight
}

export default percentile
