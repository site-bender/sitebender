/**
 * Checks if a number is within a specified range
 *
 * Determines whether a value falls within the given bounds. By default,
 * the range is inclusive of the start and exclusive of the end [start, end).
 * If start is greater than end, the parameters are swapped. Returns false
 * for invalid inputs to support safe error handling.
 *
 * @param start - Start of range (inclusive)
 * @param end - End of range (exclusive)
 * @param value - Number to check
 * @returns True if value is in range [start, end), false otherwise
 * @example
 * ```typescript
 * inRange(0)(10)(5)
 * // true
 *
 * inRange(0)(10)(0)
 * // true
 *
 * inRange(0)(10)(10)
 * // false
 *
 * inRange(1.5)(2.5)(2.0)
 * // true
 *
 * inRange(-5)(5)(0)
 * // true
 *
 * inRange(10)(0)(5)
 * // true
 *
 * inRange(5)(5)(5)
 * // false
 *
 * inRange(null)(10)(5)
 * // false
 * ```
 * @curried - (start) => (end) => (value) => boolean
 * @pure - Always returns same result for same inputs
 * @safe - Returns false for invalid inputs
 */
const inRange = (
	start: number | null | undefined,
) =>
(
	end: number | null | undefined,
) =>
(
	value: number | null | undefined,
): boolean => {
	if (start == null || typeof start !== "number") {
		return false
	}

	if (end == null || typeof end !== "number") {
		return false
	}

	if (value == null || typeof value !== "number") {
		return false
	}

	// Handle NaN
	if (isNaN(start) || isNaN(end) || isNaN(value)) {
		return false
	}

	// Auto-swap if start > end
	const min = Math.min(start, end)
	const max = Math.max(start, end)

	// Check range [min, max)
	return value >= min && value < max
}

export default inRange
