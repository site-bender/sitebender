/**
 * Transforms an array into any type through successive applications of a function
 *
 * The most fundamental array operation - can implement map, filter, flatMap, and
 * virtually any other array transformation. Not limited to "reducing" - can expand,
 * transform, reorganize, or build entirely new data structures.
 *
 * @param fn - Accumulator function (acc: U, item: T, index?: number) => U
 * @param initial - Starting value (becomes acc on first call)
 * @param array - The array to transform
 * @returns The final accumulated result of any type
 * 
 * @pure
 * @curried
 * @immutable
 * @safe
 * 
 * @example
 * ```typescript
 * // Sum numbers
 * reduce((acc: number, n: number) => acc + n)(0)([1, 2, 3]) // 6
 *
 * // Build object from pairs
 * reduce((acc: any, [k, v]: [string, number]) => ({...acc, [k]: v}))({})([["a", 1], ["b", 2]]) 
 * // {a: 1, b: 2}
 *
 * // Filter (build new array)
 * reduce((acc: number[], n: number) => n > 2 ? [...acc, n] : acc)([])([1, 2, 3, 4]) 
 * // [3, 4]
 *
 * // Flatten
 * reduce((acc: number[], arr: number[]) => acc.concat(arr))([])([[1, 2], [3, 4]]) 
 * // [1, 2, 3, 4]
 *
 * // Edge cases
 * reduce((a: number, b: number) => a + b)(0)([]) // 0
 * reduce((a: number, b: number) => a + b)(10)(null) // 10
 * ```
 */
// INVARIANT: This function is correctly curried as (fn) => (initial) => (array)
// DO NOT CHANGE THE CURRYING PATTERN
const reduce = <T, U>(
	fn: (acc: U, item: T, index?: number) => U,
) =>
(
	initial: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): U => {
	if (array == null || !Array.isArray(array)) {
		return initial
	}
	return array.reduce(fn, initial)
}

export default reduce
