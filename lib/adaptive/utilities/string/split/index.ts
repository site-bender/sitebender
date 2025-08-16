/**
 * Splits a string into an array using a separator
 * 
 * Divides a string into an ordered list of substrings by searching for the
 * separator pattern, puts these substrings into an array, and returns the array.
 * The separator can be a string or a regular expression. The separator itself
 * is not included in the resulting array elements.
 * 
 * @curried (separator) => (str) => result
 * @param separator - String or RegExp pattern to split on
 * @param str - The string to split
 * @returns Array of strings split by the separator
 * @example
 * ```typescript
 * // Basic usage with string separator
 * split(",")("a,b,c")        // ["a", "b", "c"]
 * split(" ")("hello world")  // ["hello", "world"]
 * split("-")("foo-bar-baz")  // ["foo", "bar", "baz"]
 * 
 * // Regular expression separator
 * split(/\s+/)("hello   world  test") // ["hello", "world", "test"]
 * split(/[,;]/)("a,b;c,d")            // ["a", "b", "c", "d"]
 * split(/\d+/)("a1b2c3")              // ["a", "b", "c", ""]
 * 
 * // Edge cases
 * split(",")("")          // [""]
 * split(",")("no-commas") // ["no-commas"]
 * split("")("hello")      // ["h", "e", "l", "l", "o"]
 * 
 * // Separator at boundaries
 * split(",")(",a,b,")  // ["", "a", "b", ""]
 * split(" ")(" hello ") // ["", "hello", ""]
 * 
 * // Partial application
 * const splitLines = split("\n")
 * splitLines("line1\nline2\nline3") // ["line1", "line2", "line3"]
 * 
 * const splitWords = split(/\s+/)
 * splitWords("the quick brown fox") // ["the", "quick", "brown", "fox"]
 * 
 * // Reconstruction property
 * const parts = split(",")("a,b,c")
 * parts.join(",") // "a,b,c" (original string)
 * ```
 */
const split = (separator: string | RegExp) => (str: string): Array<string> =>
	str.split(separator)

export default split