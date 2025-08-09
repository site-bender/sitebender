/**
 * Functional programming wrapper for Array.reduce()
 * Curried version: takes reducer function, then initial value, then array
 *
 * @param f - Reducer function that takes (accumulator, current, index, array)
 * @returns Function that takes initial value and returns function that takes array
 */
const reduce =
	<T, U>(f: (acc: U, curr: T, index: number, array: readonly T[]) => U) =>
	(i: U) =>
	(arr: readonly T[]): U => arr.reduce(f, i)

export default reduce
