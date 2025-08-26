/**
 * Generates an array of numbers from start to end (exclusive)
 *
 * Creates an array containing a sequence of numbers from start up to but
 * not including end, incrementing by 1. If start is greater than or equal
 * to end, returns an empty array. For custom step values, use rangeStep.
 * Useful for generating sequences, creating indices, or iteration without
 * loops.
 *
 * @curried (start) => (end) => result
 * @param start - Starting number (inclusive)
 * @param end - Ending number (exclusive)
 * @returns Array of numbers from start to end-1
 * @example
 * ```typescript
 * // Basic range
 * range(0)(5)
 * // [0, 1, 2, 3, 4]
 *
 * // Starting from 1
 * range(1)(6)
 * // [1, 2, 3, 4, 5]
 *
 * // Negative to positive
 * range(-2)(3)
 * // [-2, -1, 0, 1, 2]
 *
 * // Generate indices for array
 * const arr = ["a", "b", "c"]
 * const indices = range(0)(arr.length)
 * // [0, 1, 2]
 *
 * // Create pagination
 * const pageSize = 10
 * const page = 3
 * range(page * pageSize)((page + 1) * pageSize)
 * // [30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
 *
 * // Generate test data
 * range(1)(6).map(n => ({ id: n, value: n * 10 }))
 * // [{ id: 1, value: 10 }, { id: 2, value: 20 }, ..., { id: 5, value: 50 }]
 *
 * // Create alphabet
 * range(0)(26).map(i => String.fromCharCode(65 + i))
 * // ["A", "B", "C", ..., "Z"]
 *
 * // Partial application for reusable ranges
 * const fromZero = range(0)
 * fromZero(5)   // [0, 1, 2, 3, 4]
 * fromZero(10)  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * // Edge cases
 * range(5)(5)   // [] (start equals end)
 * range(5)(3)   // [] (start greater than end)
 * range(5)(6)   // [5] (single element)
 * ```
 * @curried Returns function for reusable range generation
 * @pure Function has no side effects
 * @immutable Generates new array without side effects
 * @safe Works with all numeric inputs
 */
const range = (
	start: number,
) =>
(
	end: number,
): Array<number> => {
	if (start >= end) {
		return []
	}

	return Array.from({ length: end - start }, (_, i) => start + i)
}

export default range
