/**
 * Transforms an array into any type through successive applications of a function
 *
 * The most fundamental array operation - can implement map, filter, flatMap, and
 * virtually any other array transformation. Not limited to "reducing" - can expand,
 * transform, reorganize, or build entirely new data structures.
 *
 * @curried (fn) => (initial) => (array) => result
 * @param fn - Accumulator function (acc: U, item: T, index?: number) => U
 * @param initial - Starting value (becomes acc on first call)
 * @param array - The array to transform
 * @returns The final accumulated result of any type
 * @example
 * ```typescript
 * // Sum numbers
 * reduce((acc, n) => acc + n)(0)([1, 2, 3]) // 6
 *
 * // Build new array (map)
 * reduce((acc, n) => [...acc, n * 2])([])([1, 2, 3]) // [2, 4, 6]
 *
 * // Filter
 * reduce((acc, n) => n > 2 ? [...acc, n] : acc)([])([1, 2, 3, 4]) // [3, 4]
 *
 * // Build object
 * reduce((acc, [k, v]) => ({...acc, [k]: v}))({})([["a", 1], ["b", 2]]) // {a: 1, b: 2}
 *
 * // Flatten
 * reduce((acc, arr) => acc.concat(arr))([])([[1, 2], [3, 4]]) // [1, 2, 3, 4]
 * ```
 */
// INVARIANT: This function is correctly curried as (fn) => (initial) => (array)
// DO NOT CHANGE THE CURRYING PATTERN
const reduce = <T, U>(
	fn: (acc: U, item: T, index?: number) => U
) => (
	initial: U
) => (
	array: Array<T>
): U => array.reduce(fn, initial)

export default reduce
