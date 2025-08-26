/**
 * Splits a string into an array of lines
 *
 * Breaks a string into an array where each element is a line of text.
 * Handles multiple line ending styles (LF, CRLF, CR) and preserves empty
 * lines. This is useful for processing multi-line text, parsing files,
 * or analyzing text structure. Does not include the line endings in results.
 *
 * @param str - String to split into lines
 * @returns Array of lines without line endings
 * @example
 * ```typescript
 * // Basic line splitting
 * lines("line1\nline2\nline3")
 * // ["line1", "line2", "line3"]
 *
 * // Windows line endings (CRLF)
 * lines("line1\r\nline2\r\nline3")
 * // ["line1", "line2", "line3"]
 *
 * // Mixed line endings
 * lines("line1\nline2\r\nline3\rline4")
 * // ["line1", "line2", "line3", "line4"]
 *
 * // Empty lines preserved
 * lines("line1\n\nline3")
 * // ["line1", "", "line3"]
 *
 * // Empty string and null handling
 * lines("")         // [""]
 * lines(null)       // []
 * lines(undefined)  // []
 *
 * // Process file content
 * const fileContent = "Name,Age,City\nJohn,30,NYC\nJane,25,LA"
 * const rows = lines(fileContent)
 * // ["Name,Age,City", "John,30,NYC", "Jane,25,LA"]
 *
 * // Filter empty lines
 * const nonEmptyLines = (text: string) =>
 *   lines(text).filter(line => line.trim() !== "")
 * nonEmptyLines("line1\n\nline2\n  \nline3")
 * // ["line1", "line2", "line3"]
 *
 * // Line processing
 * const numberLines = (text: string) =>
 *   lines(text).map((line, i) => `${i + 1}: ${line}`)
 * numberLines("first\nsecond\nthird")
 * // ["1: first", "2: second", "3: third"]
 * ```
 * @pure - Function has no side effects
 * @immutable - Does not modify input
 * @safe - Returns safe values for invalid inputs
 */
const lines = (
	str: string | null | undefined,
): Array<string> => {
	if (str == null || typeof str !== "string") {
		return []
	}

	// Split on all common line endings: \r\n (Windows), \n (Unix), \r (old Mac)
	// This regex matches any of these line ending patterns
	return str.split(/\r\n|\r|\n/)
}

export default lines
