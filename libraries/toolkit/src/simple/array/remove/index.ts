/**
 * Removes the first occurrence of a value from an array
 *
 * Uses strict equality (===) to find the item. Returns original array
 * if item not found. Only removes first occurrence, not all.
 *
 * @curried (item) => (array) => result
 * @param item - The value to remove
 * @param array - The array to remove from
 * @returns New array with first occurrence removed, or original if not found
 * @example
 * ```typescript
 * remove(2)([1, 2, 3, 2, 4]) // [1, 3, 2, 4]
 * remove("b")(["a", "b", "c", "b"]) // ["a", "c", "b"]
 * remove(5)([1, 2, 3]) // [1, 2, 3] (not found)
 *
 * // Remove specific item
 * const removeNull = remove(null)
 * removeNull([1, null, 2, null]) // [1, 2, null]
 * ```
 */
const remove = <T>(item: T) => (array: Array<T>): Array<T> => {
	const index = array.indexOf(item)
	return index === -1
		? array
		: [...array.slice(0, index), ...array.slice(index + 1)]
}

export default remove
