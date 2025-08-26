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
 * // Find increasing pairs
 * const values = [3, 1, 4, 1, 5, 9, 2]
 * pairwise(values).filter(([a, b]) => b > a)
 * // [[1, 4], [1, 5], [5, 9]]
 *
 * // Build ranges
 * const points = [0, 10, 25, 50, 100]
 * pairwise(points).map(([start, end]) => ({ start, end, size: end - start }))
 * // [{ start: 0, end: 10, size: 10 }, { start: 10, end: 25, size: 15 }, ...]
 *
 * // Empty array and edge cases
 * pairwise([])     // []
 * pairwise([42])   // []
 * pairwise([1, 2]) // [[1, 2]]
 *
 * // Check sorted property
 * const nums = [1, 2, 3, 2, 1]
 * pairwise(nums).every(([a, b]) => a <= b)
 * // false (not sorted)
 *
 * // Handle null/undefined gracefully
 * pairwise(null)      // []
 * pairwise(undefined) // []
 * ```
 * @pure Function has no side effects
 * @immutable Does not modify input array
 * @safe Handles null/undefined inputs gracefully
 */
const pairwise = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<[T, T]> => {
	if (array == null || !Array.isArray(array) || array.length < 2) {
		return []
	}

	return Array.from({ length: array.length - 1 }, (_, i) => [
		array[i],
		array[i + 1],
	] as [T, T])
}

export default pairwise
