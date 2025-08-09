/**
 * Functional programming wrapper for Array.map()
 * Curried version: takes transform function, then array
 *
 * @param f - Transform function that takes (value, index, array)
 * @returns Function that takes array and returns mapped array
 */
const map =
	<T, U>(f: (value: T, index: number, array: readonly T[]) => U) =>
	(arr: readonly T[]): readonly U[] => arr.map(f)

export default map
