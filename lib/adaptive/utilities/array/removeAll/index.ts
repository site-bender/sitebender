import filter from "../filter/index.ts"

/**
 * Removes all occurrences of an item from an array
 * 
 * @param item - The item to remove all occurrences of
 * @returns Function that takes an array and returns a new array with all occurrences removed
 * @example
 * ```typescript
 * removeAll(2)([1, 2, 3, 2, 4]) // [1, 3, 4]
 * removeAll("b")(["a", "b", "c", "b"]) // ["a", "c"]
 * removeAll(5)([1, 2, 3]) // [1, 2, 3] (item not found, returns original)
 * ```
 */
const removeAll = <T>(item: T) => (arr: Array<T>): Array<T> => {
	return filter((i: T) => i !== item)(arr)
}

export default removeAll
