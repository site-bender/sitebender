/**
 * Finds the index of the first occurrence of an item in an array
 * 
 * @param item - The item to search for
 * @returns Function that takes an array and returns the index of first occurrence or undefined
 * @example
 * ```typescript
 * indexOf(3)([1, 2, 3, 2, 3]) // 2
 * indexOf("hello")(["hi", "hello", "world"]) // 1
 * indexOf(5)([1, 2, 3]) // undefined
 * ```
 */
const indexOf = <T>(item: T) => (array: Array<T>): number | undefined => {
	const index = array.indexOf(item)
	return index > -1 ? index : undefined
}

export default indexOf
