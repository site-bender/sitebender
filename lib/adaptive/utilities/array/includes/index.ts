/**
 * Functional programming wrapper for Array.includes()
 * Curried version: takes item to search for, then array
 *
 * @param item - Item to search for in the array
 * @returns Function that takes array and returns boolean
 */
const includes = <T>(item: T) => (arr: readonly T[]): boolean =>
	arr.includes(item)

export default includes
