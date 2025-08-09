/**
 * Functional programming wrapper for Array.find()
 * Curried version: takes predicate function, then array
 *
 * @param f - Predicate function that takes (value, index, array)
 * @returns Function that takes array and returns found item or undefined
 */
const find =
	<T>(f: (value: T, index: number, array: readonly T[]) => boolean) =>
	(arr: readonly T[]): T | undefined => arr.find(f)

export default find
