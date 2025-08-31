import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns a new array with elements in reverse order
 *
 * Creates a new array without modifying the original. Empty arrays
 * return empty arrays.
 *
 * @param array - The array to reverse
 * @returns New array with elements in reverse order
 * @pure
 * @immutable
 * @safe
 * @idempotent
 * @example
 * ```typescript
 * reverse([1, 2, 3]) // [3, 2, 1]
 * reverse(["a", "b", "c"]) // ["c", "b", "a"]
 * reverse([]) // []
 * reverse([42]) // [42]
 *
 * // Reverse processing order
 * const original = [1, 2, 3, 4]
 * const reversed = reverse(original) // [4, 3, 2, 1]
 * // original is still [1, 2, 3, 4]
 * ```
 */
const reverse = <T>(array: ReadonlyArray<T> | null | undefined): Array<T> => {
	if (isNullish(array) || !Array.isArray(array)) {
		return []
	}
	return [...array].reverse()
}

export default reverse
