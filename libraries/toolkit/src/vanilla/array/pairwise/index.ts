import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns an array of adjacent pairs from the input array
 *
 * Creates a new array where each element is a tuple of two consecutive
 * elements from the original array. This is equivalent to a sliding window
 * of size 2 with step 1. Returns empty array if input has fewer than 2
 * elements. Useful for comparing adjacent elements, calculating differences,
 * or processing sequences pairwise.
 *
 * @param array - Array to create pairs from
 * @returns Array of adjacent pairs [element, nextElement]
 *
 * @pure
 * @immutable
 * @safe
 *
 * @example
 * ```typescript
 * // Basic pairing
 * pairwise([1, 2, 3, 4, 5])
 * // [[1, 2], [2, 3], [3, 4], [4, 5]]
 *
 * // Calculate differences between adjacent elements
 * const numbers = [10, 15, 12, 20, 18]
 * pairwise(numbers).map(([a, b]) => b - a)
 * // [5, -3, 8, -2]
 *
 * // Detect transitions
 * const states = ["idle", "idle", "active", "active", "idle"]
 * pairwise(states).map(([prev, curr]) =>
 *   prev !== curr ? `${prev}->${curr}` : "no change"
 * )
 * // ["no change", "idle->active", "no change", "active->idle"]
 *
 * // Edge cases
 * pairwise([])     // []
 * pairwise([42])   // []
 * pairwise([1, 2]) // [[1, 2]]
 * pairwise(null)   // []
 * ```
 */
const pairwise = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<[T, T]> => {
	if (isNullish(array) || array.length < 2) {
		return []
	}

	return Array.from({ length: array.length - 1 }, (_, i) =>
		[
			array[i],
			array[i + 1],
		] as [T, T])
}

export default pairwise
