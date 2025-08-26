/**
 * Escapes special regex characters in a string for literal pattern matching
 * 
 * Escapes all special regular expression metacharacters in a string so it
 * can be used as a literal pattern in a RegExp. This is essential when
 * building dynamic regular expressions from user input or when you need
 * to match strings that contain regex special characters literally.
 * 
 * @param str - String to escape regex characters in
 * @returns String with regex special characters escaped
 * @example
 * ```typescript
 * // Basic regex metacharacters
 * escapeRegExp("How much? $5.99")
 * // "How much\\? \\$5\\.99"
 * 
 * // All special characters
 * escapeRegExp(".*+?^${}()|[]\\")
 * // "\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\"
 * 
 * // Empty and null handling
 * escapeRegExp("")         // ""
 * escapeRegExp(null)       // ""
 * escapeRegExp(undefined)  // ""
 * 
 * // Dynamic regex creation
 * const search = "2.5+"
 * const pattern = new RegExp(escapeRegExp(search))
 * pattern.test("Price is 2.5+")  // true
 * pattern.test("Price is 2x5+")  // false
 * 
 * // User input sanitization
 * const userSearch = "What?"
 * const regex = new RegExp(escapeRegExp(userSearch), "gi")
 * "What? When? Where?".match(regex) // ["What?"]
 * 
 * // File extension matching
 * const ext = ".js"
 * const filePattern = new RegExp(escapeRegExp(ext) + "$")
 * filePattern.test("script.js")   // true
 * 
 * // IP address pattern
 * escapeRegExp("192.168.1.1")
 * // "192\\.168\\.1\\.1"
 * 
 * // Currency and mathematical symbols
 * escapeRegExp("$100.00 + 15%")
 * // "\\$100\\.00 \\+ 15%"
 * ```
 * @pure - Function has no side effects
 * @immutable - Does not modify input
 * @safe - Returns safe values for invalid inputs
 */
const escapeRegExp = (
	str: string | null | undefined
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}
	
	// Escape all regex metacharacters
	// Characters that have special meaning in regex: . * + ? ^ $ { } ( ) | [ ] \
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default escapeRegExp