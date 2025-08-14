/**
 * Removes the first occurrence of an item from an array
 * 
 * @param item - The item to remove
 * @returns Function that takes an array and returns a new array with first occurrence removed
 * @example
 * ```typescript
 * remove(2)([1, 2, 3, 2, 4]) // [1, 3, 2, 4]
 * remove("b")(["a", "b", "c", "b"]) // ["a", "c", "b"]
 * remove(5)([1, 2, 3]) // [1, 2, 3] (item not found, returns original)
 * ```
 */
const remove = <T>(item: T) => (array: Array<T>): Array<T> => {
	const index = array.indexOf(item)

	return index === -1
		? array
		: array.slice(0, index).concat(array.slice(index + 1))
}

export default remove
