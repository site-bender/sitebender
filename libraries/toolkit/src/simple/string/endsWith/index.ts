/**
 * Tests whether a string ends with a specified substring
 *
 * Checks if the string ends with the given search string. The comparison
 * is case-sensitive and position-sensitive. Returns a boolean indicating
 * whether the match is found at the end.
 *
 * @curried (searchString) => (str) => result
 * @param searchString - The substring to search for at the end
 * @param str - The string to test
 * @returns True if str ends with searchString, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * endsWith("world")("hello world") // true
 * endsWith(".ts")("file.js")       // false
 * endsWith("!")("Hello!")          // true
 *
 * // Case sensitive
 * endsWith("World")("hello world") // false
 * endsWith("WORLD")("hello WORLD") // true
 *
 * // Edge cases
 * endsWith("")("hello")      // true (empty string matches)
 * endsWith("hello")("")      // false (empty string doesn't contain "hello")
 * endsWith("")("")           // true
 * endsWith("test")("test")   // true (whole string match)
 * endsWith("longer")("short") // false
 *
 * // Partial application
 * const isTypeScript = endsWith(".ts")
 * isTypeScript("app.ts")     // true
 * isTypeScript("app.js")     // false
 * isTypeScript("test.d.ts")  // true
 *
 * const isQuestion = endsWith("?")
 * isQuestion("How are you?") // true
 * isQuestion("I am fine.")   // false
 * ```
 */
const endsWith = (searchString: string) => (str: string): boolean =>
	str.endsWith(searchString)

export default endsWith
