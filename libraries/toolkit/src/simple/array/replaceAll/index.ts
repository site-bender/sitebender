/**
 * Replaces all occurrences of a value with the result of a function
 *
 * Uses strict equality (===) to find matches. The replacer function
 * receives the matched item and can transform it.
 *
 * @curried (target) => (replacer) => (array) => result
 * @param target - The value to replace
 * @param replacer - Function to transform matched items
 * @param array - The array to process
 * @returns New array with all occurrences replaced
 * @example
 * ```typescript
 * replaceAll(2)((n) => n * 10)([1, 2, 3, 2, 4]) // [1, 20, 3, 20, 4]
 * replaceAll("old")(() => "new")(["old", "test", "old"]) // ["new", "test", "new"]
 *
 * // Replace nulls with default
 * const replaceNulls = replaceAll(null)(() => 0)
 * replaceNulls([1, null, 2, null]) // [1, 0, 2, 0]
 * ```
 */
const replaceAll =
	<T>(target: T) => (replacer: (item: T) => T) => (array: Array<T>): Array<T> =>
		array.map((item) => (item === target ? replacer(item) : item))

export default replaceAll
