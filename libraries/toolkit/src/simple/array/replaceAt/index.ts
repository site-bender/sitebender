/**
 * Replaces an element at a specific index using a transformation function
 *
 * The replacer function receives the current value at that index.
 * Returns original array if index is out of bounds.
 *
 * @curried (index) => (replacer) => (array) => result
 * @param index - Position to replace at (0-based)
 * @param replacer - Function to transform the element at index
 * @param array - The array to operate on
 * @returns New array with element at index transformed
 * @example
 * ```typescript
 * replaceAt(1)(n => n * 2)([1, 2, 3, 4]) // [1, 4, 3, 4]
 * replaceAt(0)(s => s.toUpperCase())(["hello", "world"]) // ["HELLO", "world"]
 * replaceAt(10)(x => x)([1, 2, 3]) // [1, 2, 3] (out of bounds)
 *
 * // Update specific position
 * const doubleSecond = replaceAt(1)((n: number) => n * 2)
 * doubleSecond([10, 20, 30]) // [10, 40, 30]
 * ```
 */
const replaceAt =
	<T>(index: number) =>
	(replacer: (item: T) => T) =>
	(array: Array<T>): Array<T> =>
		index < 0 || index >= array.length ? array : [
			...array.slice(0, index),
			replacer(array[index]),
			...array.slice(index + 1),
		]

export default replaceAt
