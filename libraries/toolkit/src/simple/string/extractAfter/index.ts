/**
 * Extracts substring after a specified marker
 *
 * Returns the portion of a string that appears after the first occurrence
 * of a specified marker. If the marker is not found, returns an empty string.
 * Useful for parsing structured text, URLs, and extracting values from
 * formatted strings.
 *
 * @param marker - The string to search for
 * @param text - The text to extract from
 * @returns Substring after the marker, or empty string if marker not found
 * @example
 * ```typescript
 * // Extract after delimiter
 * extractAfter(":")("name:John Doe")
 * // "John Doe"
 *
 * // Extract query string
 * extractAfter("?")("https://example.com/page?param=value")
 * // "param=value"
 *
 * // Extract after multi-character marker
 * extractAfter("//")("https://example.com/path")
 * // "example.com/path"
 *
 * // Extract value from key-value pair
 * extractAfter("=")("API_KEY=abc123xyz")
 * // "abc123xyz"
 *
 * // Marker not found
 * extractAfter(":")("no colon here")
 * // ""
 *
 * // Multiple occurrences - gets after first
 * extractAfter(".")("file.backup.old.txt")
 * // "backup.old.txt"
 *
 * // Parse email domain
 * extractAfter("@")("user@example.com")
 * // "example.com"
 *
 * // Partial application for parsing
 * const afterColon = extractAfter(":")
 * afterColon("error:File not found")     // "File not found"
 * afterColon("warning:Low memory")       // "Low memory"
 * ```
 * @pure - Function has no side effects
 * @curried - Function is curried for partial application
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 */
const extractAfter = (
	marker: string,
) =>
(
	text: string,
): string => {
	if (!text || !marker) {
		return marker ? "" : text
	}

	const index = text.indexOf(marker)

	if (index === -1) {
		return ""
	}

	return text.slice(index + marker.length)
}

export default extractAfter
