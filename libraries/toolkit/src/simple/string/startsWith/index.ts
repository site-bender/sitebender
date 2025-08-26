/**
 * Tests whether a string starts with a specified substring
 *
 * Checks if the string begins with the given search string. The comparison
 * is case-sensitive and position-sensitive. Returns a boolean indicating
 * whether the match is found at the beginning.
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 * @predicate
 * @param searchString - The substring to search for at the start
 * @param str - The string to test
 * @returns True if str starts with searchString, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * startsWith("hello")("hello world") // true
 * startsWith("Hello")("hello world") // false (case sensitive)
 * startsWith("test")("testing")      // true
 *
 * // Edge cases
 * startsWith("")("hello")      // true (empty string matches)
 * startsWith("hello")("")      // false (empty string doesn't contain "hello")
 * startsWith("test")("test")   // true (whole string match)
 *
 * // Partial application
 * const isHttps = startsWith("https://")
 * isHttps("https://example.com") // true
 * isHttps("http://example.com")  // false
 *
 * const isComment = startsWith("//")
 * isComment("// TODO: fix this") // true
 * isComment("/* comment */")     // false
 * ```
 */
const startsWith = (searchString: string) => (str: string): boolean =>
	str.startsWith(searchString)

export default startsWith
