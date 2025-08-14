/**
 * Functional programming wrapper for Array.join()
 * Curried version: takes separator, then array
 *
 * @param separator - String to use as separator between elements
 * @param arr - The array to join
 * @returns Joined string
 * @example
 * ```typescript
 * join(", ")(["a", "b", "c"]) // "a, b, c"
 * join("-")(["one", "two"]) // "one-two"
 * ```
 */
const join = (separator: string) => (arr: ReadonlyArray<string>): string =>
	arr.join(separator)

export default join
