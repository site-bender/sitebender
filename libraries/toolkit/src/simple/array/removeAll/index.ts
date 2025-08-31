import filter from "../filter/index.ts"

/**
 * Removes all occurrences of a value from an array
 *
 * Uses strict equality (===) to find items. Returns new array with
 * all matching elements removed. Preserves order of remaining elements.
 *
 * @param item - The value to remove all occurrences of
 * @param array - The array to filter
 * @returns New array with all occurrences removed
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * removeAll(2)([1, 2, 3, 2, 4]) // [1, 3, 4]
 * removeAll("b")(["a", "b", "c", "b"]) // ["a", "c"]
 * removeAll(5)([1, 2, 3]) // [1, 2, 3] (not found)
 *
 * // Clean up duplicates
 * const removeNulls = removeAll(null)
 * removeNulls([1, null, 2, null, 3]) // [1, 2, 3]
 * ```
 */
const removeAll = <T>(item: T) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => filter((element: T) => element !== item)(array)

export default removeAll
