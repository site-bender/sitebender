import replaceAt from "../replaceAt/index.ts"

/**
 * Replaces the last occurrence of an item using a transformation function
 * 
 * @param item - The item to find and replace
 * @returns Function that takes a transformer function and returns function that replaces last occurrence
 * @example
 * ```typescript
 * replaceLast(2)(n => n * 10)([1, 2, 3, 2, 4]) // [1, 2, 3, 20, 4]
 * replaceLast("old")(s => "new")(["old", "test", "old"]) // ["old", "test", "new"]
 * ```
 */
const replaceLast =
	<T>(item: T) => (f: (item: T) => T) => (arr: Array<T>): Array<T> =>
		replaceAt<T>(arr.lastIndexOf(item))(f)(arr)

export default replaceLast
