/**
 * Checks if a string contains a substring
 *
 * Determines whether a string includes a specified substring. This is
 * a curried, functional wrapper around the native includes method that
 * provides consistent behavior with null/undefined handling. The search
 * is case-sensitive and checks for exact substring matches.
 *
 * @curried (substring) => (str) => boolean
 * @param substring - The substring to search for
 * @param str - The string to search within
 * @returns True if the string contains the substring, false otherwise
 * @example
 * ```typescript
 * // Basic substring check
 * contains("world")("hello world")
 * // true
 *
 * // Not found
 * contains("foo")("hello world")
 * // false
 *
 * // Case sensitive
 * contains("World")("hello world")
 * // false
 *
 * // Empty substring (always true for non-null strings)
 * contains("")("hello")
 * // true
 *
 * // Empty string
 * contains("hello")("")
 * // false
 *
 * // Both empty
 * contains("")("")
 * // true
 *
 * // Substring at start
 * contains("hello")("hello world")
 * // true
 *
 * // Substring at end
 * contains("world")("hello world")
 * // true
 *
 * // Substring in middle
 * contains("lo wo")("hello world")
 * // true
 *
 * // Special characters
 * contains("$100")("Price: $100")
 * // true
 *
 * // Regex special characters (treated as literals)
 * contains(".*")("Match .* literally")
 * // true
 *
 * // Unicode
 * contains("世界")("hello 世界")
 * // true
 *
 * // Emojis
 * contains("🎉")("Party 🎉 time!")
 * // true
 *
 * // Whitespace
 * contains(" ")("hello world")
 * // true
 *
 * // Newlines
 * contains("\n")("line1\nline2")
 * // true
 *
 * // Numbers in strings
 * contains("123")("abc123def")
 * // true
 *
 * // Partial application for validation
 * const hasHttp = contains("http://")
 * hasHttp("http://example.com")   // true
 * hasHttp("https://example.com")  // false
 * hasHttp("ftp://example.com")    // false
 *
 * // Email validation helper
 * const hasAtSymbol = contains("@")
 * hasAtSymbol("user@example.com")  // true
 * hasAtSymbol("invalid-email")     // false
 *
 * // File extension check
 * const isJavaScript = contains(".js")
 * isJavaScript("script.js")     // true
 * isJavaScript("script.ts")     // false
 * isJavaScript("module.json")   // true (contains ".js" in ".json")
 *
 * // Filter array of strings
 * const strings = ["apple", "banana", "grape", "pineapple"]
 * strings.filter(contains("apple"))
 * // ["apple", "pineapple"]
 *
 * // Check for prohibited words
 * const hasBadWord = contains("forbidden")
 * hasBadWord("This is forbidden content")  // true
 * hasBadWord("This is allowed content")    // false
 *
 * // SQL injection detection
 * const hasSqlKeyword = contains("DROP TABLE")
 * hasSqlKeyword("DROP TABLE users")  // true
 * hasSqlKeyword("Normal query")      // false
 *
 * // Path checking
 * const isAbsolutePath = contains("/")
 * isAbsolutePath("/usr/local/bin")  // true
 * isAbsolutePath("relative/path")   // true
 * isAbsolutePath("file.txt")        // false
 *
 * // URL protocol check
 * const protocols = ["http://", "https://", "ftp://"]
 * const hasProtocol = (url: string) =>
 *   protocols.some(p => contains(p)(url))
 * hasProtocol("https://example.com")  // true
 * hasProtocol("example.com")          // false
 *
 * // Multi-word search
 * const searchTerms = ["quick", "brown", "fox"]
 * const text = "The quick brown fox jumps"
 * searchTerms.every(term => contains(term)(text))
 * // true (all terms found)
 *
 * // Handle null/undefined gracefully
 * contains("test")(null)       // false
 * contains("test")(undefined)  // false
 * contains(null)("test")       // false
 * contains(undefined)("test")  // false
 *
 * // Chain with other string operations
 * const processString = (s: string) => {
 *   if (contains("error")(s.toLowerCase())) {
 *     return "Error found!"
 *   }
 *   return "OK"
 * }
 * processString("ERROR: Failed")  // "Error found!"
 * processString("Success")        // "OK"
 *
 * // Template literal check
 * const template = "${name} is ${age} years old"
 * contains("${")(template)  // true (has template variables)
 *
 * // Comment detection
 * const hasComment = contains("//")
 * hasComment("const x = 1 // initialize")  // true
 * hasComment("const x = 1")                // false
 * ```
 * @property Case-sensitive - exact match required
 * @property Literal - special regex characters treated as literals
 * @property Curried - enables partial application and composition
 */
const contains = (
	substring: string | null | undefined
) => (
	str: string | null | undefined
): boolean => {
	if (str == null || typeof str !== "string") {
		return false
	}

	if (substring == null || typeof substring !== "string") {
		return false
	}

	return str.includes(substring)
}

export default contains
