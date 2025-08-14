/**
 * Finds the index of the last occurrence of an item in an array
 * 
 * @param item - The item to search for
 * @returns Function that takes an array and returns the index of last occurrence or undefined
 * @example
 * ```typescript
 * lastIndexOf(3)([1, 2, 3, 2, 3]) // 4
 * lastIndexOf("hello")(["hello", "world", "hello"]) // 2
 * lastIndexOf(5)([1, 2, 3]) // undefined
 * ```
 */
const lastIndexOf = <T>(item: T) => (arr: Array<T>): number | undefined => {
	const index = arr.lastIndexOf(item)
	return index > -1 ? index : undefined
}

export default lastIndexOf
