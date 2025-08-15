/**
 * Joins array elements into a string with a separator
 * 
 * Converts all elements to strings and concatenates them with the
 * specified separator between each element.
 * 
 * @curried (separator) => (array) => string
 * @param separator - String to insert between elements
 * @param array - The array to join
 * @returns Single string of joined elements
 * @example
 * ```typescript
 * join(", ")(["a", "b", "c"]) // "a, b, c"
 * join("-")(["one", "two"]) // "one-two"
 * join("")(["h", "e", "l", "l", "o"]) // "hello"
 * 
 * // Create CSV lines
 * const toCSV = join(",")
 * toCSV(["name", "age", "city"]) // "name,age,city"
 * ```
 */
const join = (separator: string) => (array: ReadonlyArray<string>): string =>
	array.join(separator)

export default join
