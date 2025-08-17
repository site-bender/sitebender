/**
 * Extracts a section of a string between two indices
 * 
 * Returns a substring starting from the start index up to but not including
 * the end index. Supports negative indices which count from the end of the
 * string. This is a curried wrapper around the native slice method, useful
 * for extracting portions of strings in a functional programming style.
 * 
 * @curried (start) => (end?) => (str) => string
 * @param start - Starting index (inclusive)
 * @param end - Ending index (exclusive, default: string length)
 * @param str - String to slice
 * @returns Extracted substring
 * @example
 * ```typescript
 * // Basic slicing
 * slice(0)(5)("hello world")
 * // "hello"
 * 
 * // From index to end
 * slice(6)(Infinity)("hello world")
 * // "world"
 * 
 * // Negative start index (from end)
 * slice(-5)(Infinity)("hello world")
 * // "world"
 * 
 * // Negative end index
 * slice(0)(-1)("hello world")
 * // "hello worl"
 * 
 * // Both negative
 * slice(-5)(-1)("hello world")
 * // "worl"
 * 
 * // Start equals end (empty)
 * slice(5)(5)("hello world")
 * // ""
 * 
 * // Start after end (empty)
 * slice(5)(3)("hello world")
 * // ""
 * 
 * // Out of bounds (safe)
 * slice(50)(100)("hello")
 * // ""
 * 
 * // Negative out of bounds (safe)
 * slice(-50)(5)("hello")
 * // "hello"
 * 
 * // Single character
 * slice(0)(1)("hello")
 * // "h"
 * 
 * // Last character
 * slice(-1)(Infinity)("hello")
 * // "o"
 * 
 * // Empty string
 * slice(0)(5)("")
 * // ""
 * 
 * // Partial application
 * const firstN = (n: number) => slice(0)(n)
 * const lastN = (n: number) => slice(-n)(Infinity)
 * const middle = (start: number, end: number) => slice(start)(end)
 * 
 * firstN(3)("hello")     // "hel"
 * lastN(3)("hello")      // "llo"
 * middle(1, 4)("hello")  // "ell"
 * 
 * // Extract file extension
 * const getExtension = (filename: string) => {
 *   const dotIndex = filename.lastIndexOf(".")
 *   return dotIndex === -1 ? "" : slice(dotIndex)(Infinity)(filename)
 * }
 * getExtension("file.txt")     // ".txt"
 * getExtension("archive.tar.gz") // ".gz"
 * 
 * // Extract filename without extension
 * const getBasename = (filename: string) => {
 *   const dotIndex = filename.lastIndexOf(".")
 *   return dotIndex === -1 ? filename : slice(0)(dotIndex)(filename)
 * }
 * getBasename("document.pdf")  // "document"
 * 
 * // Get substring between markers
 * const between = (start: string, end: string) => (str: string) => {
 *   const startIdx = str.indexOf(start)
 *   if (startIdx === -1) return ""
 *   const endIdx = str.indexOf(end, startIdx + start.length)
 *   if (endIdx === -1) return ""
 *   return slice(startIdx + start.length)(endIdx)(str)
 * }
 * between("(", ")")("hello (world) test")  // "world"
 * between("[", "]")("array[0]")            // "0"
 * 
 * // Truncate string
 * const truncate = (maxLength: number) => (str: string) => {
 *   if (str.length <= maxLength) return str
 *   return slice(0)(maxLength - 3)(str) + "..."
 * }
 * truncate(10)("Hello World")     // "Hello W..."
 * truncate(10)("Short")           // "Short"
 * 
 * // Remove first N characters
 * const dropFirst = (n: number) => slice(n)(Infinity)
 * dropFirst(3)("hello")  // "lo"
 * 
 * // Remove last N characters
 * const dropLast = (n: number) => slice(0)(-n)
 * dropLast(3)("hello")  // "he"
 * 
 * // Get middle portion
 * const getMiddle = (str: string) => {
 *   const len = str.length
 *   const mid = Math.floor(len / 2)
 *   return len % 2 === 0
 *     ? slice(mid - 1)(mid + 1)(str)
 *     : slice(mid)(mid + 1)(str)
 * }
 * getMiddle("test")   // "es"
 * getMiddle("tests")  // "s"
 * 
 * // Extract domain from email
 * const getDomain = (email: string) => {
 *   const atIndex = email.indexOf("@")
 *   return atIndex === -1 ? "" : slice(atIndex + 1)(Infinity)(email)
 * }
 * getDomain("user@example.com")  // "example.com"
 * 
 * // Extract username from email
 * const getUsername = (email: string) => {
 *   const atIndex = email.indexOf("@")
 *   return atIndex === -1 ? email : slice(0)(atIndex)(email)
 * }
 * getUsername("john.doe@example.com")  // "john.doe"
 * 
 * // Get line from multiline string
 * const getLine = (lineNum: number) => (text: string) => {
 *   const lines = text.split("\n")
 *   return lines[lineNum - 1] || ""
 * }
 * getLine(2)("line1\nline2\nline3")  // "line2"
 * 
 * // Extract year from date
 * slice(0)(4)("2024-01-15")  // "2024"
 * 
 * // Extract time from datetime
 * slice(11)(19)("2024-01-15T10:30:45Z")  // "10:30:45"
 * 
 * // Get protocol from URL
 * const getProtocol = (url: string) => {
 *   const colonIndex = url.indexOf(":")
 *   return colonIndex === -1 ? "" : slice(0)(colonIndex)(url)
 * }
 * getProtocol("https://example.com")  // "https"
 * getProtocol("ftp://files.com")      // "ftp"
 * 
 * // Extract hashtag
 * const getHashtag = (text: string) => {
 *   const hashIndex = text.indexOf("#")
 *   if (hashIndex === -1) return ""
 *   const spaceIndex = text.indexOf(" ", hashIndex)
 *   return slice(hashIndex)(spaceIndex === -1 ? Infinity : spaceIndex)(text)
 * }
 * getHashtag("Check out #javascript today")  // "#javascript"
 * 
 * // Pagination of text
 * const paginate = (pageSize: number, pageNum: number) => (text: string) => {
 *   const start = (pageNum - 1) * pageSize
 *   const end = start + pageSize
 *   return slice(start)(end)(text)
 * }
 * paginate(10, 2)("0123456789abcdefghijklmnop")  // "abcdefghij"
 * 
 * // Handle null/undefined gracefully
 * slice(0)(5)(null)       // ""
 * slice(0)(5)(undefined)  // ""
 * 
 * // Unicode handling
 * slice(0)(3)("Hello 世界")  // "Hel"
 * slice(6)(8)("Hello 世界")  // "世界"
 * 
 * // Emoji slicing (may split complex emojis)
 * slice(0)(2)("👋🌍🎉")  // "👋🌍"
 * 
 * // Extract area code
 * slice(0)(3)("5551234567")  // "555"
 * 
 * // Get file path without filename
 * const getDirectory = (path: string) => {
 *   const lastSlash = path.lastIndexOf("/")
 *   return lastSlash === -1 ? "" : slice(0)(lastSlash)(path)
 * }
 * getDirectory("/usr/local/bin/node")  // "/usr/local/bin"
 * 
 * // CSV field extraction
 * const getField = (fieldNum: number) => (csv: string) => {
 *   const fields = csv.split(",")
 *   return fields[fieldNum - 1] || ""
 * }
 * getField(2)("name,age,city")  // "age"
 * 
 * // Remove wrapper characters
 * const unwrap = (str: string) => slice(1)(-1)(str)
 * unwrap('"quoted"')   // "quoted"
 * unwrap("(parens)")   // "parens"
 * unwrap("[brackets]") // "brackets"
 * 
 * // Check if starts with by slicing
 * const startsWith = (prefix: string) => (str: string) =>
 *   slice(0)(prefix.length)(str) === prefix
 * startsWith("hello")("hello world")  // true
 * startsWith("hi")("hello world")     // false
 * ```
 * @property Index-based - uses numeric positions
 * @property Negative-aware - supports counting from end
 * @property Safe - handles out-of-bounds indices gracefully
 */
const slice = (
	start: number
) => (
	end: number = Infinity
) => (
	str: string | null | undefined
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}
	
	// Use native slice with proper handling of Infinity
	const actualEnd = end === Infinity ? str.length : end
	return str.slice(start, actualEnd)
}

export default slice