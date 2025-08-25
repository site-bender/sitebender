/**
 * Finds the index of the first occurrence of a value in an array
 *
 * Uses Object.is for comparison, which correctly handles NaN and -0/+0.
 * Returns undefined instead of -1 when not found, making it safer for FP composition.
 *
 * @curried (item) => (array) => result
 * @param item - The value to search for
 * @param array - The array to search in
 * @returns Index of first occurrence or undefined if not found
 * @example
 * ```typescript
 * indexOf(3)([1, 2, 3, 2, 3]) // 2
 * indexOf("hello")(["hi", "hello", "world"]) // 1
 * indexOf(5)([1, 2, 3]) // undefined
 * indexOf(NaN)([1, NaN, 3]) // 1 (correctly finds NaN)
 *
 * // Find position of specific value
 * const findThree = indexOf(3)
 * findThree([1, 2, 3, 4]) // 2
 * findThree([5, 6, 7]) // undefined
 * ```
 */
const indexOf = <T>(item: T) => (array: Array<T>): number | undefined => {
	for (let i = 0; i < array.length; i++) {
		if (Object.is(array[i], item)) {
			return i
		}
	}
	return undefined
}

export default indexOf
