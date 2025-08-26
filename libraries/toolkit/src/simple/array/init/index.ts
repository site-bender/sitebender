import dropLast from "../dropLast/index.ts"

/**
 * Returns all elements of an array except the last
 *
 * Returns a new array containing all elements except the last one.
 * This is the Haskell term for getting the initial portion of a list,
 * complementing `tail` (all but first) and `last` (final element).
 * Empty arrays return empty arrays. Single-element arrays return
 * empty arrays.
 *
 * @pure
 * @immutable
 * @param array - The array to get the initial elements from
 * @returns New array with all elements except the last
 * @example
 * ```typescript
 * // Basic usage
 * init([1, 2, 3, 4])         // [1, 2, 3]
 * init(["a", "b", "c"])      // ["a", "b"]
 *
 * // Edge cases
 * init([42])                 // [] (single element)
 * init([])                   // [] (empty array)
 *
 * // Remove trailing element
 * const path = ["root", "users", "john", "documents", "file.txt"]
 * const directory = init(path)  // ["root", "users", "john", "documents"]
 * ```
 */
const init = <T>(array: ReadonlyArray<T> | null | undefined): Array<T> => {
	if (array === null || array === undefined) {
		return []
	}
	return dropLast<T>(1)(array as Array<T>)
}

export default init
