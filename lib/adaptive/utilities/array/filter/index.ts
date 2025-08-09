/**
 * Functional programming wrapper for Array.filter()
 * Curried version: takes predicate function, then array
 *
 * @param f - Predicate function that takes (value, index, array)
 * @returns Function that takes array and returns filtered array
 */
const filter =
	<T>(f: (value: T, index: number, array: readonly T[]) => boolean) =>
	(arr: readonly T[]): readonly T[] => arr.filter(f)

export default filter
