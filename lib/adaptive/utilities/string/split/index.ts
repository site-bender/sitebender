/**
 * Splits a string into an array using a separator
 * 
 * @param separator - String or RegExp to split on
 * @returns Function that takes a string and returns array of split parts
 * @example
 * ```typescript
 * split(",")("a,b,c") // ["a", "b", "c"]
 * split(/\s+/)("hello world test") // ["hello", "world", "test"]
 * ```
 */
const split = (separator: string | RegExp) => (str: string): Array<string> =>
	str.split(separator)

export default split
