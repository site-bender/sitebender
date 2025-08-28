import percentile from "../percentile/index.ts"

/**
 * Calculates the interquartile range (IQR) of a dataset
 *
 * Computes the difference between the third quartile (Q3, 75th percentile)
 * and the first quartile (Q1, 25th percentile). The IQR represents the
 * middle 50% of the data and is a robust measure of spread that is not
 * affected by outliers. Returns NaN for invalid inputs or empty arrays.
 *
 * @param data - Array of numeric values
 * @returns Interquartile range (Q3 - Q1), or NaN if invalid
 * @example
 * ```typescript
 * // Basic IQR calculation
 * interquartileRange([1, 2, 3, 4, 5])
 * // 3 (Q3=4.5, Q1=1.5)
 *
 * interquartileRange([1, 2, 3, 4, 5, 6, 7, 8, 9])
 * // 5 (Q3=7.5, Q1=2.5)
 *
 * // Dataset with outliers (IQR is robust)
 * interquartileRange([1, 2, 3, 4, 5, 100])
 * // 2.5
 *
 * // Symmetric distribution
 * interquartileRange([10, 20, 30, 40, 50])
 * // 30
 *
 * // Single value
 * interquartileRange([42])  // 0
 *
 * // Invalid inputs
 * interquartileRange([])  // NaN
 * interquartileRange(null)  // NaN
 * ```
 * @pure
 * @safe
 */
const interquartileRange = (
	data: number[] | null | undefined,
): number => {
	if (data == null || !Array.isArray(data)) {
		return NaN
	}

	if (data.length === 0) {
		return NaN
	}

	// Calculate Q1 (25th percentile) and Q3 (75th percentile)
	const q1 = percentile(25)(data)
	const q3 = percentile(75)(data)

	// If either percentile is NaN, return NaN
	if (isNaN(q1) || isNaN(q3)) {
		return NaN
	}

	// IQR is the difference between Q3 and Q1
	return q3 - q1
}

export default interquartileRange
