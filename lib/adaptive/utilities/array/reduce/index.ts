/**
 * Reduces an array to a single value using a reducer function
 * 
 * @param fn - Reducer function that accumulates values
 * @param initial - Initial value for the accumulator
 * @param array - The array to reduce
 * @returns The final accumulated value
 * @example
 * ```typescript
 * reduce((acc, n) => acc + n, 0)([1, 2, 3]) // 6
 * reduce((acc, s) => acc + s, "")([\"a\", \"b\", \"c\"]) // "abc"
 * ```
 */
export default function reduce<T, U>(
	fn: (acc: U, item: T, index?: number) => U,
	initial: U,
) {
	return (array: Array<T>): U => array.reduce(fn, initial)
}
