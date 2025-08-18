/**
 * Removes an element at a specific index from an array
 * 
 * Supports negative indices (counting from end). Returns original array
 * if index is out of bounds. Creates new array, doesn't mutate.
 * 
 * @curried (index) => (array) => result
 * @param index - Position to remove (negative counts from end)
 * @param array - The array to remove from
 * @returns New array with element at index removed
 * @example
 * ```typescript
 * removeAt(1)([1, 2, 3, 4]) // [1, 3, 4]
 * removeAt(0)(["a", "b", "c"]) // ["b", "c"]
 * removeAt(-1)([1, 2, 3]) // [1, 2] (removes last)
 * removeAt(10)([1, 2, 3]) // [1, 2, 3] (out of bounds)
 * 
 * // Remove by position
 * const removeSecond = removeAt(1)
 * removeSecond(["first", "second", "third"]) // ["first", "third"]
 * ```
 */
const removeAt = <T>(index: number) => (array: Array<T>): Array<T> => {
	const len = array.length
	const normalizedIndex = index < 0 ? len + index : index
	
	return normalizedIndex >= 0 && normalizedIndex < len
		? [...array.slice(0, normalizedIndex), ...array.slice(normalizedIndex + 1)]
		: array
}

export default removeAt
