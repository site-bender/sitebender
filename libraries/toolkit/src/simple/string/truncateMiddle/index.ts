/**
 * Truncates a string from the middle with ellipsis
 *
 * Shortens a string by removing characters from the middle and replacing
 * them with an ellipsis or custom separator. Preserves the beginning and
 * end of the string, which is useful for displaying file paths, URLs,
 * long identifiers, or any text where the start and end are most important.
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 * @param maxLength - Maximum total length including separator
 * @param separator - String to insert in the middle (default: "...")
 * @param str - String to truncate
 * @returns Truncated string with middle replaced by separator
 * @example
 * ```typescript
 * // Basic middle truncation
 * truncateMiddle(20)("...")("/very/long/path/to/file.txt")
 * // "/very/long...file.txt"
 *
 * // No truncation needed
 * truncateMiddle(50)("...")("Short text")
 * // "Short text"
 *
 * // Very short max length
 * truncateMiddle(5)("...")("HelloWorld")
 * // "H...d"
 *
 * // Custom separator
 * truncateMiddle(15)("…")("ThisIsAVeryLongString")
 * // "ThisIsA…tring"
 *
 * // File path truncation
 * const truncatePath = truncateMiddle(30)(".../")
 * truncatePath("/Users/john/Documents/Projects/MyApp/src/index.js")
 * // "/Users/john/Doc.../src/index.js"
 *
 * // URL truncation
 * const truncateUrl = truncateMiddle(40)("...")
 * truncateUrl("https://example.com/very/long/path/to/resource?param=value")
 * // "https://example.com/very...?param=value"
 *
 * // Handle null/undefined
 * truncateMiddle(10)("...")(null)       // ""
 * truncateMiddle(10)("...")(undefined)  // ""
 * ```
 */
const truncateMiddle = (
	maxLength: number,
) =>
(
	separator: string = "...",
) =>
(
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}

	// If string is already short enough, return as-is
	if (str.length <= maxLength) {
		return str
	}

	// If maxLength is less than or equal to separator length,
	// return just the separator truncated to maxLength
	if (maxLength <= separator.length) {
		return separator.slice(0, maxLength)
	}

	// Calculate how many characters we can keep from original string
	const availableLength = maxLength - separator.length

	// If no room for any original characters, return separator
	if (availableLength <= 0) {
		return separator.slice(0, maxLength)
	}

	// Split available length between start and end
	// Favor the start slightly if odd number
	const startLength = Math.ceil(availableLength / 2)
	const endLength = Math.floor(availableLength / 2)

	// Extract start and end portions
	const start = str.slice(0, startLength)
	const end = str.slice(-endLength)

	// Combine with separator
	return start + separator + end
}

export default truncateMiddle
