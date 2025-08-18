/**
 * Returns the index of the last occurrence of a substring
 * 
 * Finds the position of the last occurrence of a substring within a string,
 * optionally searching backwards from a given index. Returns -1 if the
 * substring is not found. This is a curried, functional wrapper around
 * the native lastIndexOf method with support for specifying a start position.
 * 
 * @curried (substring) => (fromIndex?) => (str) => number
 * @param substring - The substring to search for
 * @param fromIndex - Optional position to search backwards from (default: str.length - 1)
 * @param str - The string to search within
 * @returns Index of last occurrence, or -1 if not found
 * @example
 * ```typescript
 * // Basic last occurrence
 * lastIndexOf("o")(Infinity)("hello world")
 * // 7 (last 'o' in "world")
 * 
 * // Not found
 * lastIndexOf("xyz")(Infinity)("hello world")
 * // -1
 * 
 * // Found at end
 * lastIndexOf("world")(Infinity)("hello world")
 * // 6
 * 
 * // Case sensitive
 * lastIndexOf("World")(Infinity)("hello world")
 * // -1
 * 
 * // Empty substring (returns last position)
 * lastIndexOf("")(Infinity)("hello")
 * // 5
 * 
 * // Empty string search
 * lastIndexOf("hello")(Infinity)("")
 * // -1
 * 
 * // Both empty
 * lastIndexOf("")(Infinity)("")
 * // 0
 * 
 * // Search backwards from specific index
 * lastIndexOf("o")(5)("hello world")
 * // 4 (finds 'o' in "hello", not "world")
 * 
 * // Start index before first occurrence
 * lastIndexOf("world")(3)("hello world")
 * // -1 (can't find "world" before index 3)
 * 
 * // Negative start index
 * lastIndexOf("o")(-1)("hello world")
 * // -1 (negative index means no match possible)
 * 
 * // Multiple occurrences (finds last)
 * lastIndexOf("l")(Infinity)("hello world")
 * // 9 (last 'l' in "world")
 * 
 * // Find previous occurrence
 * const text = "hello world"
 * const lastL = lastIndexOf("l")(Infinity)(text)  // 9
 * const prevL = lastIndexOf("l")(lastL - 1)(text)  // 3
 * 
 * // Special characters
 * lastIndexOf("$")(Infinity)("Price: $100, Cost: $50")
 * // 20 (last dollar sign)
 * 
 * // Newline search
 * lastIndexOf("\n")(Infinity)("line1\nline2\nline3")
 * // 11 (last newline)
 * 
 * // Tab search
 * lastIndexOf("\t")(Infinity)("col1\tcol2\tcol3")
 * // 9 (last tab)
 * 
 * // Unicode characters
 * lastIndexOf("世")(Infinity)("世界 世界")
 * // 3 (last occurrence)
 * 
 * // Emoji search
 * lastIndexOf("🎉")(Infinity)("Start 🎉 Middle 🎉 End")
 * // 16 (last party emoji)
 * 
 * // Partial application
 * const findLastDot = lastIndexOf(".")(Infinity)
 * findLastDot("file.backup.txt")   // 11
 * findLastDot("script.min.js")     // 10
 * findLastDot("no-extension")      // -1
 * 
 * // Find file extension
 * const getExtension = (filename: string) => {
 *   const lastDot = lastIndexOf(".")(Infinity)(filename)
 *   return lastDot === -1 ? "" : filename.slice(lastDot)
 * }
 * getExtension("document.pdf")     // ".pdf"
 * getExtension("archive.tar.gz")   // ".gz"
 * getExtension("README")           // ""
 * 
 * // Find last path separator
 * const getFilename = (path: string) => {
 *   const lastSlash = lastIndexOf("/")(Infinity)(path)
 *   return lastSlash === -1 ? path : path.slice(lastSlash + 1)
 * }
 * getFilename("/usr/local/bin/node")  // "node"
 * getFilename("relative/path/file")   // "file"
 * getFilename("file.txt")             // "file.txt"
 * 
 * // URL parameter search (last occurrence)
 * const url = "https://example.com?foo=1&bar=2&foo=3"
 * lastIndexOf("foo=")(Infinity)(url)  // 33 (last foo parameter)
 * 
 * // Find all occurrences backwards
 * const findAllReverse = (substring: string, str: string): Array<number> => {
 *   const indices: Array<number> = []
 *   let index = str.length
 *   while ((index = lastIndexOf(substring)(index - 1)(str)) !== -1) {
 *     indices.push(index)
 *   }
 *   return indices
 * }
 * findAllReverse("l", "hello world")
 * // [9, 3, 2] (positions in reverse order)
 * 
 * // Email domain extraction
 * const getDomain = (email: string) => {
 *   const atIndex = lastIndexOf("@")(Infinity)(email)
 *   return atIndex === -1 ? "" : email.slice(atIndex + 1)
 * }
 * getDomain("user@subdomain@example.com")  // "example.com" (uses last @)
 * getDomain("invalid-email")                // ""
 * 
 * // CSV last column
 * const getLastColumn = (row: string) => {
 *   const lastComma = lastIndexOf(",")(Infinity)(row)
 *   return lastComma === -1 ? row : row.slice(lastComma + 1)
 * }
 * getLastColumn("name,age,city")    // "city"
 * getLastColumn("single-value")     // "single-value"
 * 
 * // Find closing tag
 * const html = "<div><div>nested</div></div>"
 * lastIndexOf("</div>")(Infinity)(html)  // 22 (last closing div)
 * 
 * // SQL last keyword
 * const query = "SELECT * FROM users WHERE age > 18 AND status = 'active'"
 * lastIndexOf("AND")(Infinity)(query)  // 36
 * 
 * // JSON last property
 * const json = '{"first": 1, "second": 2, "first": 3}'
 * lastIndexOf('"first"')(Infinity)(json)  // 27 (last occurrence, though invalid JSON)
 * 
 * // Handle null/undefined gracefully
 * lastIndexOf("test")(Infinity)(null)       // -1
 * lastIndexOf("test")(Infinity)(undefined)  // -1
 * lastIndexOf(null)(Infinity)("test")       // -1
 * lastIndexOf(undefined)(Infinity)("test")  // -1
 * 
 * // Extract before last delimiter
 * const beforeLast = (delimiter: string) => (str: string) => {
 *   const index = lastIndexOf(delimiter)(Infinity)(str)
 *   return index === -1 ? str : str.slice(0, index)
 * }
 * beforeLast(".")("file.backup.txt")  // "file.backup"
 * beforeLast("/")("/path/to/file")    // "/path/to"
 * 
 * // Line number from end
 * const getLineFromEnd = (n: number, text: string): string => {
 *   const lines = text.split("\n")
 *   return lines[lines.length - n] || ""
 * }
 * 
 * // Template variable detection (last)
 * const template = "${first} and ${second} or ${first}"
 * lastIndexOf("${")(Infinity)(template)  // 26 (last template var)
 * 
 * // Comment detection (last)
 * const code = "code; // comment1\nmore; // comment2"
 * lastIndexOf("//")(Infinity)(code)  // 24 (last comment)
 * 
 * // Markdown link detection (last)
 * const md = "[first](url1) and [second](url2)"
 * lastIndexOf("[")(Infinity)(md)  // 18 (last link start)
 * 
 * // Version number extraction
 * const versionString = "app-v1.2.3-beta.4"
 * const lastDot = lastIndexOf(".")(Infinity)(versionString)
 * const patchVersion = versionString.slice(lastDot + 1)
 * // "4"
 * 
 * // Remove after last occurrence
 * const removeAfterLast = (marker: string, str: string) => {
 *   const index = lastIndexOf(marker)(Infinity)(str)
 *   return index === -1 ? str : str.slice(0, index + marker.length)
 * }
 * removeAfterLast(".", "file.backup.old.txt")  // "file.backup.old."
 * 
 * // Check if ends at position
 * const endsAt = (substring: string, pos: number) => (str: string) =>
 *   lastIndexOf(substring)(pos)(str) === pos - substring.length + 1
 * endsAt("world", 11)("hello world")  // true
 * endsAt("world", 10)("hello world")  // false
 * ```
 * @property Case-sensitive - exact match required
 * @property Backward-search - searches from end or specified position backwards
 * @property Curried - enables partial application and composition
 */
const lastIndexOf = (
	substring: string | null | undefined
) => (
	fromIndex: number = Infinity
) => (
	str: string | null | undefined
): number => {
	if (str == null || typeof str !== "string") {
		return -1
	}
	
	if (substring == null || typeof substring !== "string") {
		return -1
	}
	
	// Use native lastIndexOf with the specified starting position
	// If fromIndex is Infinity or greater than string length, search from end
	const searchIndex = fromIndex === Infinity ? str.length - 1 : fromIndex
	return str.lastIndexOf(substring, searchIndex)
}

export default lastIndexOf