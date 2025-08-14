import replaceAt from "../replaceAt/index.ts"

/**
 * Replaces the first occurrence of an item using a transformation function
 * 
 * @param item - The item to find and replace
 * @returns Function that takes a transformer function and returns function that replaces first occurrence
 * @example
 * ```typescript
 * replaceFirst(2)(n => n * 10)([1, 2, 3, 2, 4]) // [1, 20, 3, 2, 4]
 * replaceFirst("old")(s => "new")(["old", "test", "old"]) // ["new", "test", "old"]
 * ```
 */
const replaceFirst =
	<T>(item: T) => (f: (item: T) => T) => (arr: Array<T>): Array<T> =>
		replaceAt<T>(arr.indexOf(item))(f)(arr)

export default replaceFirst
