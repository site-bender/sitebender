import replaceAt from "../replaceAt/index.ts"

/**
 * Replaces the last occurrence of a value using a transformation function
 * 
 * Uses strict equality (===) to find the item. Returns original array
 * if item not found. Only replaces the last occurrence.
 * 
 * @curried (target) => (replacer) => (array) => result
 * @param target - The value to find and replace
 * @param replacer - Function to transform the found item
 * @param array - The array to search in
 * @returns New array with last occurrence replaced
 * @example
 * ```typescript
 * replaceLast(2)(n => n * 10)([1, 2, 3, 2, 4]) // [1, 2, 3, 20, 4]
 * replaceLast("old")(s => "new")(["old", "test", "old"]) // ["old", "test", "new"]
 * replaceLast(5)(n => n)([1, 2, 3]) // [1, 2, 3] (not found)
 * 
 * // Update last error
 * const fixLastError = replaceLast("ERROR")(s => "WARNING")
 * fixLastError(["ERROR", "info", "ERROR"]) // ["ERROR", "info", "WARNING"]
 * ```
 */
const replaceLast =
	<T>(target: T) => (replacer: (item: T) => T) => (array: Array<T>): Array<T> =>
		replaceAt<T>(array.lastIndexOf(target))(replacer)(array)

export default replaceLast
