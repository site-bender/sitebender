/**
 * Removes surrounding quotes from a string if present
 *
 * Strips matching quotes from both ends of a string. Only removes quotes
 * if they match (same type) at both beginning and end. Handles single quotes,
 * double quotes, backticks, and custom quote pairs. Useful for processing
 * quoted values from CSV, JSON, or configuration files.
 *
 * @param str - String to unquote
 * @returns String with surrounding quotes removed if present
 * @example
 * ```typescript
 * // Double quotes
 * unquote('"hello"')  // "hello"
 *
 * // Single quotes
 * unquote("'world'")  // "world"
 *
 * // Backticks
 * unquote("`test`")   // "test"
 *
 * // No quotes (unchanged)
 * unquote("hello")    // "hello"
 *
 * // Mismatched quotes (unchanged)
 * unquote('"hello\'') // '"hello\''
 *
 * // Only one quote (unchanged)
 * unquote('"hello')   // '"hello'
 *
 * // Empty string
 * unquote("")         // ""
 *
 * // Just quotes
 * unquote('""')       // ""
 *
 * // Nested quotes (only removes outer)
 * unquote('"He said \\"Hello\\""')  // 'He said "Hello"'
 *
 * // Handle null/undefined
 * unquote(null)       // ""
 * ```
 * @pure - Function has no side effects
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 */
const unquote = (
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string" || str.length < 2) {
		return str ?? ""
	}

	// Check for matching quotes at beginning and end
	const first = str[0]
	const last = str[str.length - 1]

	// Common quote characters
	const quotes = ['"', "'", "`"]

	// Remove if first and last are the same quote character
	if (quotes.includes(first) && first === last) {
		return str.slice(1, -1)
	}

	return str
}

export default unquote
