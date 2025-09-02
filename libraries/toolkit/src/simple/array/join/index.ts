import isNullish from "../../validation/isNullish/index.ts"

/**
 * Joins array elements into a string with a separator
 *
 * Converts all elements to strings and concatenates them with the
 * specified separator between each element. Returns empty string
 * for null/undefined arrays.
 *
 * @param separator - String to insert between elements
 * @param array - The array to join
 * @returns Single string of joined elements
 *
 * @pure
 * @curried
 * @safe
 *
 * @example
 * ```typescript
 * // Basic usage
 * join(", ")(["a", "b", "c"]) // "a, b, c"
 * join("-")(["one", "two", "three"]) // "one-two-three"
 * join("")(["h", "e", "l", "l", "o"]) // "hello"
 *
 * // Numbers are converted to strings
 * join(", ")([1, 2, 3]) // "1, 2, 3"
 *
 * // Create CSV lines
 * const toCSV = join(",")
 * toCSV(["name", "age", "city"]) // "name,age,city"
 *
 * // Edge cases
 * join(", ")([]) // ""
 * join(", ")(null) // ""
 * join(", ")(undefined) // ""
 * join(", ")(["single"]) // "single"
 * ```
 */
const join = <T>(separator: string) =>
(
	array: ReadonlyArray<T> | null | undefined,
): string =>
	isNullish(array) ? "" : array.join(separator)

export default join
