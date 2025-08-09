/**
 * Functional programming wrapper for Array.join()
 * Curried version: takes separator, then array
 *
 * @param separator - String to use as separator between elements
 * @returns Function that takes array and returns joined string
 */
const join = (separator: string) => (arr: readonly unknown[]): string =>
	arr.join(separator)

export default join
