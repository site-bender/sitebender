/**
 * Matches a string against a regular expression and returns matches
 *
 * Retrieves the matches when matching a string against a regular expression.
 * Returns an array of matches, or an empty array if no matches are found.
 * When using a string pattern, it's converted to a global RegExp. When using
 * a RegExp, its flags are preserved.
 *
 * @param pattern - Regular expression or string pattern to match
 * @param str - The string to search in
 * @returns Array of matches, or empty array if no matches
 * @example
 * ```typescript
 * // Basic usage
 * match(/\d+/g)("abc 123 def 456") // ["123", "456"]
 * match(/[aeiou]/g)("hello world")  // ["e", "o", "o"]
 * match("test")("test this test")   // ["test", "test"]
 *
 * // Non-global regex with capture groups
 * match(/(\d{3})-(\d{4})/)("Call 555-1234") // ["555-1234", "555", "1234"]
 *
 * // No matches
 * match(/xyz/)("hello world")       // []
 *
 * // Empty pattern behavior
 * match(/./g)("")                   // []
 * match("")("hello")                // ["", "", "", "", "", ""] (splits every position)
 *
 * // Partial application
 * const findNumbers = match(/\d+/g)
 * findNumbers("abc123def456")       // ["123", "456"]
 * findNumbers("no numbers here")    // []
 *
 * const findEmails = match(/\b[\w._%+-]+@[\w.-]+\.[A-Z|a-z]{2,}\b/g)
 * findEmails("Contact: john@example.com or jane@test.org")
 * // ["john@example.com", "jane@test.org"]
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 */
const match = (pattern: string | RegExp) => (str: string): Array<string> => {
	const regex = typeof pattern === "string"
		? new RegExp(pattern, "g")
		: pattern
	const matches = str.match(regex)
	return matches ?? []
}

export default match
