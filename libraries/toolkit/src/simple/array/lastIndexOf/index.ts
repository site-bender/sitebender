/**
 * Finds the index of the last occurrence of a value in an array
 *
 * Searches from end to start using Object.is for comparison, which correctly
 * handles NaN and -0/+0. Returns undefined instead of -1 when not found,
 * making it safer for FP composition.
 *
 * @param item - The value to search for
 * @param array - The array to search in
 * @returns Index of last occurrence or undefined if not found
 * 
 * @pure
 * @curried
 * @safe
 * 
 * @example
 * ```typescript
 * lastIndexOf(3)([1, 2, 3, 2, 3]) // 4
 * lastIndexOf("hello")(["hello", "world", "hello"]) // 2
 * lastIndexOf(5)([1, 2, 3]) // undefined
 * lastIndexOf(NaN)([NaN, 1, NaN, 3]) // 2 (correctly finds last NaN)
 *
 * // Partial application
 * const findLastThree = lastIndexOf(3)
 * findLastThree([3, 1, 2, 3, 4]) // 3
 * findLastThree([1, 2, 4]) // undefined
 * ```
 */
const lastIndexOf = <T>(item: T) => (array: Array<T>): number | undefined => {
	const reversedIndex = array
		.slice()
		.reverse()
		.findIndex(x => Object.is(x, item))
	
	return reversedIndex === -1 
		? undefined 
		: array.length - 1 - reversedIndex
}

export default lastIndexOf
