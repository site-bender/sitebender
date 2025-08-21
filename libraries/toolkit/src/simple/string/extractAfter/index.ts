/**
 * Extracts substring after a specified marker
 * 
 * Returns the portion of a string that appears after the first occurrence
 * of a specified marker. If the marker is not found, returns an empty string.
 * Useful for parsing structured text, URLs, and extracting values from
 * formatted strings.
 * 
 * @curried (marker) => (text) => result
 * @param marker - The string to search for
 * @param text - The text to extract from
 * @returns Substring after the marker, or empty string if marker not found
 * @example
 * ```typescript
 * // Extract after delimiter
 * extractAfter(":")("name:John Doe")
 * // "John Doe"
 * 
 * // Extract after space
 * extractAfter(" ")("Hello World")
 * // "World"
 * 
 * // Extract query string
 * extractAfter("?")("https://example.com/page?param=value")
 * // "param=value"
 * 
 * // Extract fragment
 * extractAfter("#")("https://example.com/page#section")
 * // "section"
 * 
 * // Extract file extension
 * extractAfter(".")("document.pdf")
 * // "pdf"
 * 
 * // Multiple occurrences - gets after first
 * extractAfter(".")("file.backup.old.txt")
 * // "backup.old.txt"
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
 * // Empty marker returns original
 * extractAfter("")("hello world")
 * // "hello world"
 * 
 * // Marker at the end
 * extractAfter(":")("ends with:")
 * // ""
 * 
 * // Parse email domain
 * extractAfter("@")("user@example.com")
 * // "example.com"
 * 
 * // Extract timestamp
 * extractAfter("[")("[2024-01-01] Log entry")
 * // "2024-01-01] Log entry"
 * 
 * // Combine with other operations
 * const getTimestamp = extractAfter("[")
 * const logs = [
 *   "[10:30:15] User login",
 *   "[10:31:22] Data processed",
 *   "[10:32:45] Task completed"
 * ]
 * logs.map(getTimestamp)
 * // ["10:30:15] User login", "10:31:22] Data processed", "10:32:45] Task completed"]
 * 
 * // Extract after newline
 * extractAfter("\n")("First line\nSecond line\nThird line")
 * // "Second line\nThird line"
 * 
 * // Extract SQL table name
 * extractAfter("FROM ")("SELECT * FROM users WHERE active = true")
 * // "users WHERE active = true"
 * 
 * // Partial application for parsing
 * const afterColon = extractAfter(":")
 * afterColon("error:File not found")     // "File not found"
 * afterColon("warning:Low memory")       // "Low memory"
 * afterColon("info:Process started")     // "Process started"
 * 
 * const afterSlash = extractAfter("/")
 * afterSlash("user/profile/settings")    // "profile/settings"
 * afterSlash("api/v2/users")            // "v2/users"
 * 
 * // Extract command arguments
 * extractAfter(" ")("git commit -m 'Initial commit'")
 * // "commit -m 'Initial commit'"
 * 
 * // Case sensitive
 * extractAfter("Name:")("name:john Name:Jane")
 * // "Jane"
 * 
 * // Handle special characters
 * extractAfter("*/")("/* comment */ code")
 * // " code"
 * 
 * // Empty text
 * extractAfter(":")("")
 * // ""
 * 
 * // Marker is the entire string
 * extractAfter("hello")("hello")
 * // ""
 * ```
 * @property Immutable - doesn't modify input strings
 * @property First-match - returns content after first occurrence
 * @property Case-sensitive - marker matching is case-sensitive
 */
const extractAfter = (
	marker: string
) => (
	text: string
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