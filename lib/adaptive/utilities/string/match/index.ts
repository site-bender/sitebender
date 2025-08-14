/**
 * Matches a string against a regular expression and returns all matches
 * 
 * @param regex - Regular expression or string pattern to match
 * @returns Function that takes a string and returns array of matches
 * @example
 * ```typescript
 * match(/\d+/)("abc 123 def 456") // ["123", "456"]
 * match("test")("test this test") // ["test", "test"]
 * match(/xyz/)("hello world") // []
 * ```
 */
const match = (regex: string | RegExp) => (str: string): Array<string> => {
	const pattern = typeof regex === "string" ? new RegExp(regex, "g") : regex
	const m = str.match(pattern)

	return m == null ? [] : m
}

export default match
