/**
 * Finds the index of the last occurrence of a value in an array
 * 
 * Searches from end to start using strict equality (===). Returns 
 * undefined instead of -1 when not found, making it safer for FP composition.
 * 
 * @curried (item) => (array) => result
 * @param item - The value to search for
 * @param array - The array to search in
 * @returns Index of last occurrence or undefined if not found
 * @example
 * ```typescript
 * lastIndexOf(3)([1, 2, 3, 2, 3]) // 4
 * lastIndexOf("hello")(["hello", "world", "hello"]) // 2
 * lastIndexOf(5)([1, 2, 3]) // undefined
 * 
 * // Find last position of value
 * const findLastThree = lastIndexOf(3)
 * findLastThree([3, 1, 2, 3, 4]) // 3
 * findLastThree([1, 2, 4]) // undefined
 * ```
 */
const lastIndexOf = <T>(item: T) => (array: Array<T>): number | undefined => {
	const index = array.lastIndexOf(item)
	return index === -1 ? undefined : index
}

export default lastIndexOf
