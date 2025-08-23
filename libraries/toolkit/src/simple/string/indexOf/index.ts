/**
 * Returns the index of the first occurrence of a substring
 * 
 * Finds the position of the first occurrence of a substring within a string,
 * optionally starting from a given index. Returns -1 if the substring is not
 * found. This is a curried, functional wrapper around the native indexOf
 * method with additional support for specifying a start position.
 * 
 * @curried (substring) => (fromIndex?) => (str) => number
 * @param substring - The substring to search for
 * @param fromIndex - Optional starting position (default: 0)
 * @param str - The string to search within
 * @returns Index of first occurrence, or -1 if not found
 * @example
 * ```typescript
 * // Basic substring search
 * indexOf("world")(0)("hello world")
 * // 6
 * 
 * // Not found
 * indexOf("xyz")(0)("hello world")
 * // -1
 * 
 * // Found at beginning
 * indexOf("hello")(0)("hello world")
 * // 0
 * 
 * // Case sensitive
 * indexOf("World")(0)("hello world")
 * // -1
 * 
 * // Empty substring (always 0 for non-empty strings)
 * indexOf("")(0)("hello")
 * // 0
 * 
 * // Empty string search
 * indexOf("hello")(0)("")
 * // -1
 * 
 * // Both empty
 * indexOf("")(0)("")
 * // 0
 * 
 * // Search from specific index
 * indexOf("o")(5)("hello world")
 * // 7 (finds second 'o')
 * 
 * // Start index beyond string length
 * indexOf("o")(20)("hello world")
 * // -1
 * 
 * // Negative start index (treated as 0)
 * indexOf("hello")(-5)("hello world")
 * // 0
 * 
 * // Multiple occurrences (finds first)
 * indexOf("l")(0)("hello world")
 * // 2
 * 
 * // Skip first occurrence
 * indexOf("l")(3)("hello world")
 * // 3 (next 'l')
 * 
 * // Special characters
 * indexOf("$")(0)("Price: $100")
 * // 7
 * 
 * // Newline search
 * indexOf("\n")(0)("line1\nline2")
 * // 5
 * 
 * // Tab search
 * indexOf("\t")(0)("col1\tcol2")
 * // 4
 * 
 * // Unicode characters
 * indexOf("世")(0)("hello 世界")
 * // 6
 * 
 * // Emoji search
 * indexOf("🎉")(0)("Party 🎉 time!")
 * // 6
 * 
 * // Partial application without fromIndex
 * const findHello = indexOf("hello")(0)
 * findHello("hello world")     // 0
 * findHello("say hello there")  // 4
 * findHello("goodbye")          // -1
 * 
 * // Find all occurrences
 * const findAll = (substring: string, str: string): Array<number> => {
 *   const indices: Array<number> = []
 *   let index = 0
 *   while ((index = indexOf(substring)(index)(str)) !== -1) {
 *     indices.push(index)
 *     index += substring.length
 *   }
 *   return indices
 * }
 * findAll("l", "hello world")
 * // [2, 3, 9]
 * 
 * // Check if starts with (at position)
 * const startsAt = (substring: string, pos: number) => (str: string) =>
 *   indexOf(substring)(pos)(str) === pos
 * startsAt("world", 6)("hello world")  // true
 * startsAt("world", 5)("hello world")  // false
 * 
 * // Find file extension
 * const findExtension = (filename: string) => {
 *   const dotIndex = indexOf(".")(0)(filename)
 *   return dotIndex === -1 ? "" : filename.slice(dotIndex)
 * }
 * findExtension("script.js")   // ".js"
 * findExtension("no-extension") // ""
 * 
 * // URL parameter search
 * const url = "https://example.com?name=John&age=30"
 * indexOf("?")(0)(url)   // 19
 * indexOf("&")(0)(url)   // 29
 * indexOf("=")(0)(url)   // 24
 * 
 * // Path separator search
 * indexOf("/")(0)("/usr/local/bin")  // 0
 * indexOf("/")(1)("/usr/local/bin")  // 4
 * indexOf("/")(5)("/usr/local/bin")  // 10
 * 
 * // Email validation helper
 * const hasAt = (email: string) => indexOf("@")(0)(email) !== -1
 * hasAt("user@example.com")  // true
 * hasAt("invalid-email")     // false
 * 
 * // CSV parsing helper
 * const firstComma = indexOf(",")(0)
 * firstComma("name,age,city")  // 4
 * firstComma("single-value")   // -1
 * 
 * // Find closing bracket
 * const findClosing = indexOf(")")(indexOf("(")(0)("func(arg)"))
 * // 8
 * 
 * // SQL keyword position
 * indexOf("WHERE")(0)("SELECT * FROM users WHERE id = 1")
 * // 20
 * 
 * // HTML tag search
 * indexOf("<div")(0)('<div class="container">Content</div>')
 * // 0
 * 
 * // JSON property search
 * indexOf('"name"')(0)('{"name": "John", "age": 30}')
 * // 1
 * 
 * // Handle null/undefined gracefully
 * indexOf("test")(0)(null)       // -1
 * indexOf("test")(0)(undefined)  // -1
 * indexOf(null)(0)("test")       // -1
 * indexOf(undefined)(0)("test")  // -1
 * 
 * // Chain with other operations
 * const extractAfter = (marker: string) => (str: string) => {
 *   const index = indexOf(marker)(0)(str)
 *   return index === -1 ? "" : str.slice(index + marker.length)
 * }
 * extractAfter(": ")("Error: Something went wrong")
 * // "Something went wrong"
 * 
 * // Find line number of substring
 * const findLine = (substring: string, text: string): number => {
 *   const index = indexOf(substring)(0)(text)
 *   if (index === -1) return -1
 *   return text.slice(0, index).split("\n").length
 * }
 * findLine("error", "line1\nline2\nerror here")
 * // 3
 * 
 * // Template variable detection
 * indexOf("${")(0)("Hello ${name}, welcome!")
 * // 6
 * 
 * // Comment detection
 * indexOf("//")(0)("const x = 1; // comment")
 * // 13
 * 
 * // Markdown link detection
 * indexOf("[")(0)("Check [this link](url)")
 * // 6
 * ```
 * @property Case-sensitive - exact match required
 * @property Position-aware - supports starting from specific index
 * @property Curried - enables partial application and composition
 */
const indexOf = (
	substring: string | null | undefined
) => (
	fromIndex: number = 0
) => (
	str: string | null | undefined
): number => {
	if (str == null || typeof str !== "string") {
		return -1
	}
	
	if (substring == null || typeof substring !== "string") {
		return -1
	}
	
	// Use native indexOf with the specified starting position
	return str.indexOf(substring, fromIndex)
}

export default indexOf