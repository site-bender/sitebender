import replaceAt from "../replaceAt/index.ts"

/**
 * Replaces the first occurrence of a value using a transformation function
 *
 * Uses strict equality (===) to find the item. Returns original array
 * if item not found. Only replaces first occurrence.
 *
 * @curried (target) => (replacer) => (array) => result
 * @param target - The value to find and replace
 * @param replacer - Function to transform the found item
 * @param array - The array to search in
 * @returns New array with first occurrence replaced
 * @example
 * ```typescript
 * replaceFirst(2)(n => n * 10)([1, 2, 3, 2, 4]) // [1, 20, 3, 2, 4]
 * replaceFirst("old")(s => "new")(["old", "test", "old"]) // ["new", "test", "old"]
 * replaceFirst(5)(n => n)([1, 2, 3]) // [1, 2, 3] (not found)
 *
 * // Update first error
 * const fixFirstError = replaceFirst("ERROR")(s => "WARNING")
 * fixFirstError(["ERROR", "info", "ERROR"]) // ["WARNING", "info", "ERROR"]
 * ```
 */
const replaceFirst =
	<T>(target: T) => (replacer: (item: T) => T) => (array: Array<T>): Array<T> =>
		replaceAt<T>(array.indexOf(target))(replacer)(array)

export default replaceFirst
