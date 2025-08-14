/**
 * Replaces an item at a specific index using a transformation function
 * 
 * @param i - Index of the item to replace
 * @returns Function that takes a transformer function and returns function that replaces item at index
 * @example
 * ```typescript
 * replaceAt(1)(n => n * 2)([1, 2, 3, 4]) // [1, 4, 3, 4]
 * replaceAt(0)(s => s.toUpperCase())(["hello", "world"]) // ["HELLO", "world"]
 * replaceAt(10)(x => x)([1, 2, 3]) // [1, 2, 3] (invalid index, returns original)
 * ```
 */
const replaceAt =
	<T>(i: number) => (f: (item: T) => T) => (arr: Array<T>): Array<T> =>
		i < 0 || i >= arr.length ? arr : arr
			.slice(0, i)
			.concat(f(arr[i]))
			.concat(arr.slice(i + 1))

export default replaceAt
