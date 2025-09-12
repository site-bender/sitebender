/**
 * Maps each element to an array and flattens the result by one level
 *
 * Equivalent to map followed by flatten(1). Useful for expanding elements
 * into multiple values or filtering while mapping (return [] to exclude).
 *
 * @pure
 * @immutable
 * @curried
 * @param fn - Function that transforms each element to a value or array
 * @param array - The array to transform
 * @returns New flattened array of transformed elements
 * @example
 * ```typescript
 * flatMap((n: number) => [n, n * 2])([1, 2, 3]) // [1, 2, 2, 4, 3, 6]
 * flatMap((s: string) => s.split(""))(["hi", "bye"]) // ["h", "i", "b", "y", "e"]
 *
 * // Filter and map in one step
 * flatMap((n: number) => n > 0 ? [n * 2] : [])([1, -2, 3]) // [2, 6]
 *
 * // Expand to multiple items
 * flatMap((n: number) => Array(n).fill(n))([1, 2, 3]) // [1, 2, 2, 3, 3, 3]
 * ```
 */
const flatMap = <T, U>(
	fn: (item: T, index: number, array: Array<T>) => U | ReadonlyArray<U>,
) =>
(array: Array<T>): Array<U> => array.flatMap(fn)

export default flatMap
