/**
 * Transforms each element of an array using a mapping function
 * 
 * Applies the function to each element in order, creating a new array
 * with the transformed values. Original array remains unchanged.
 * 
 * @curried (fn) => (array) => result
 * @param fn - Function that transforms each element (item, index, array) => newItem
 * @param array - The array to transform
 * @returns New array with transformed elements
 * @example
 * ```typescript
 * map((n: number) => n * 2)([1, 2, 3]) // [2, 4, 6]
 * map((s: string) => s.toUpperCase())(["a", "b"]) // ["A", "B"]
 * 
 * // Using index parameter
 * map((item: string, i: number) => `${i}: ${item}`)(["a", "b"]) // ["0: a", "1: b"]
 * 
 * // Compose with other functions
 * const double = map((n: number) => n * 2)
 * const addOne = map((n: number) => n + 1)
 * double(addOne([1, 2, 3])) // [4, 6, 8]
 * ```
 */
const map = <T, U>(fn: (item: T, index: number, array: Array<T>) => U) =>
	(array: Array<T>): Array<U> => array.map(fn)

export default map
