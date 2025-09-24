/**
 * Generates an array of numbers from start to end (exclusive)
 *
 * Creates an array containing a sequence of numbers from start up to but
 * not including end, incrementing by 1. If start is greater than or equal
 * to end, returns an empty array. For custom step values, use rangeStep.
 * Useful for generating sequences, creating indices, or iteration without
 * loops.
 *
 * @param start - Starting number (inclusive)
 * @param end - Ending number (exclusive)
 * @returns Array of numbers from start to end-1
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 *
 * @example
 * ```typescript
 * // Basic range
 * range(0)(5) // [0, 1, 2, 3, 4]
 * range(1)(6) // [1, 2, 3, 4, 5]
 * range(-2)(3) // [-2, -1, 0, 1, 2]
 *
 * // Generate indices
 * const arr = ["a", "b", "c"]
 * range(0)(arr.length) // [0, 1, 2]
 *
 * // Partial application
 * const fromZero = range(0)
 * fromZero(5) // [0, 1, 2, 3, 4]
 *
 * // Edge cases
 * range(5)(5) // [] (start equals end)
 * range(5)(3) // [] (start greater than end)
 * range(5)(6) // [5] (single element)
 * ```
 */
const range = (
	start: number,
) =>
(
	end: number,
): Array<number> => {
	if (start >= end || !isFinite(end - start)) {
		return []
	}

	return Array.from({ length: end - start }, (_, i) => start + i)
}

export default range
