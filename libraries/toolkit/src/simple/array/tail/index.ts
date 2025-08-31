import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns all elements of an array except the first
 *
 * Returns a new array containing all elements after the first.
 * Empty arrays return empty arrays. Single-element arrays return
 * empty arrays. Useful for recursive processing.
 *
 * @param array - The array to get the tail from
 * @returns New array with all elements except the first
 * @example
 * ```typescript
 * // Basic usage
 * tail([1, 2, 3, 4])  // [2, 3, 4]
 * tail(["a"])         // []
 * tail([])            // []
 *
 * // Recursive processing
 * const sum = (arr: Array<number>): number =>
 *   arr.length === 0 ? 0 : arr[0] + sum(tail(arr))
 * sum([1, 2, 3, 4])  // 10
 *
 * // Null/undefined handling
 * tail(null)       // []
 * tail(undefined)  // []
 * ```
 * @pure
 * @immutable
 * @safe
 * @idempotent
 */
const tail = <T>(array: ReadonlyArray<T> | null | undefined): Array<T> => {
	if (isNullish(array) || !Array.isArray(array)) {
		return []
	}
	return array.slice(1)
}

export default tail
