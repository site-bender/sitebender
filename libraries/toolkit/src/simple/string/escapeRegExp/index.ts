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
 * // Parentheses and brackets
 * escapeRegExp("array[0] and (groups)")
 * // "array\\[0\\] and \\(groups\\)"
 * 
 * // Quantifiers
 * escapeRegExp("a+ b* c? d{2,3}")
 * // "a\\+ b\\* c\\? d\\{2,3\\}"
 * 
 * // Anchors
 * escapeRegExp("^start and end$")
 * // "\\^start and end\\$"
 * 
 * // Alternation
 * escapeRegExp("this|that")
 * // "this\\|that"
 * 
 * // Backslash
 * escapeRegExp("C:\\Users\\file.txt")
 * // "C:\\\\Users\\\\file\\.txt"
 * 
 * // Empty string
 * escapeRegExp("")
 * // ""
 * 
 * // No special characters
 * escapeRegExp("hello world")
 * // "hello world"
 * 
 * // All special characters
 * escapeRegExp(".*+?^${}()|[]\\")
 * // "\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\"
 * 
 * // Use in dynamic regex creation
 * const search = "2.5+"
 * const pattern = new RegExp(escapeRegExp(search))
 * pattern.test("Price is 2.5+")  // true
 * pattern.test("Price is 2x5+")  // false
 * 
 * // User input sanitization
 * const userSearch = "What?"
 * const regex = new RegExp(escapeRegExp(userSearch), "gi")
 * "What? When? Where?".match(regex)
 * // ["What?"]
 * 
 * // File extension matching
 * const ext = ".js"
 * const filePattern = new RegExp(escapeRegExp(ext) + "$")
 * filePattern.test("script.js")   // true
 * filePattern.test("script.json")  // false
 * 
 * // URL pattern matching
 * const url = "https://example.com/path?q=1"
 * const urlPattern = new RegExp("^" + escapeRegExp(url))
 * urlPattern.test("https://example.com/path?q=1&more=2")  // true
 * 
 * // Mathematical expressions
 * escapeRegExp("(a + b) * c^2")
 * // "\\(a \\+ b\\) \\* c\\^2"
 * 
 * // Regular expression patterns (treating them as literals)
 * escapeRegExp("[a-z]+")
 * // "\\[a-z\\]\\+"
 * 
 * // IP address pattern
 * escapeRegExp("192.168.1.1")
 * // "192\\.168\\.1\\.1"
 * 
 * // Email special chars
 * escapeRegExp("user+tag@example.com")
 * // "user\\+tag@example\\.com"
 * 
 * // Path separators
 * escapeRegExp("/usr/local/bin")
 * // "/usr/local/bin" (forward slashes not special in JS regex)
 * 
 * // Currency symbols
 * escapeRegExp("$100.00 USD")
 * // "\\$100\\.00 USD"
 * 
 * // Markdown formatting
 * escapeRegExp("**bold** and *italic*")
 * // "\\*\\*bold\\*\\* and \\*italic\\*"
 * 
 * // Code comments
 * escapeRegExp("// comment /* block */")
 * // "// comment /\\* block \\*/"
 * 
 * // Build case-insensitive word boundary search
 * const word = "C++"
 * const wordRegex = new RegExp(
 *   "\\b" + escapeRegExp(word) + "\\b",
 *   "gi"
 * )
 * "Learning C++ and C".match(wordRegex)
 * // ["C++"]
 * 
 * // Replace with escaped pattern
 * const find = "1.5"
 * const replacePattern = new RegExp(escapeRegExp(find), "g")
 * "Version 1.5 costs $1.50".replace(replacePattern, "2.0")
 * // "Version 2.0 costs $2.00"
 * 
 * // Escape for use in character class
 * const chars = "^-]\\"
 * const escaped = escapeRegExp(chars)
 * // "\\^\\-\\]\\\\"
 * 
 * // Complex pattern building
 * const prefix = "(@"
 * const suffix = ")"
 * const pattern = escapeRegExp(prefix) + "\\w+" + escapeRegExp(suffix)
 * new RegExp(pattern).test("(@user)")  // true
 * 
 * // Handle null/undefined gracefully
 * escapeRegExp(null)       // ""
 * escapeRegExp(undefined)  // ""
 * 
 * // Use in string split
 * const delimiter = "**"
 * const parts = "one**two**three".split(
 *   new RegExp(escapeRegExp(delimiter))
 * )
 * // ["one", "two", "three"]
 * 
 * // Template literal patterns
 * escapeRegExp("${variable}")
 * // "\\$\\{variable\\}"
 * 
 * // Glob pattern conversion
 * const glob = "*.{js,ts}"
 * escapeRegExp(glob)
 * // "\\*\\.\\{js,ts\\}"
 * 
 * // XML/HTML tag patterns
 * escapeRegExp("<tag>content</tag>")
 * // "<tag>content</tag>" (< and > not special in JS regex)
 * 
 * // Database LIKE pattern
 * const likePattern = "25%_discount"
 * escapeRegExp(likePattern)
 * // "25%_discount" (% and _ not special in JS regex)
 * 
 * // Escape already escaped string (double escaping)
 * escapeRegExp("\\n\\t\\r")
 * // "\\\\n\\\\t\\\\r"
 * 
 * // Build dynamic regex from array
 * const terms = ["1.0", "2.0+", "(beta)"]
 * const termsPattern = terms.map(escapeRegExp).join("|")
 * new RegExp(termsPattern).test("Version 2.0+")  // true
 * ```
 * @property Metachar-safe - escapes all regex special characters
 * @property Literal-matching - enables exact string matching in patterns
 * @property Dynamic-regex - safe for building regexes from user input
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