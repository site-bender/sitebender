/**
 * Removes a suffix from a string if present
 *
 * Strips a specified suffix from the end of a string, but only if the
 * string actually ends with that suffix. If the suffix is not found at
 * the end, returns the original string unchanged. This is useful for
 * removing file extensions, trailing punctuation, or any suffixed identifiers.
 *
 * @curried (suffix) => (str) => string
 * @param suffix - The suffix to remove
 * @param str - The string to remove suffix from
 * @returns String with suffix removed if it was present
 * @example
 * ```typescript
 * // Basic suffix removal
 * removeSuffix(".txt")("document.txt")
 * // "document"
 *
 * // Suffix not present (unchanged)
 * removeSuffix(".txt")("document.pdf")
 * // "document.pdf"
 *
 * // Case sensitive
 * removeSuffix(".TXT")("document.txt")
 * // "document.txt"
 *
 * // Empty suffix (unchanged)
 * removeSuffix("")("hello")
 * // "hello"
 *
 * // Empty string
 * removeSuffix("hello")("")
 * // ""
 *
 * // Suffix is entire string
 * removeSuffix("hello")("hello")
 * // ""
 *
 * // Suffix longer than string (unchanged)
 * removeSuffix("hello world")("world")
 * // "world"
 *
 * // File extension removal
 * removeSuffix(".js")("script.js")
 * // "script"
 *
 * removeSuffix(".min.js")("script.min.js")
 * // "script"
 *
 * // Multiple extensions
 * removeSuffix(".tar.gz")("archive.tar.gz")
 * // "archive"
 *
 * // URL parameters
 * removeSuffix("?v=123")("script.js?v=123")
 * // "script.js"
 *
 * // Trailing slash
 * removeSuffix("/")("https://example.com/")
 * // "https://example.com"
 *
 * // Line ending removal
 * removeSuffix("\n")("Hello World\n")
 * // "Hello World"
 *
 * removeSuffix("\r\n")("Hello World\r\n")
 * // "Hello World"
 *
 * // Punctuation removal
 * removeSuffix(".")("End of sentence.")
 * // "End of sentence"
 *
 * removeSuffix("!")("Wow!")
 * // "Wow"
 *
 * // Partial application for reusable cleaners
 * const removeJs = removeSuffix(".js")
 * const removeJson = removeSuffix(".json")
 * const removeTrailingSlash = removeSuffix("/")
 *
 * removeJs("app.js")           // "app"
 * removeJson("config.json")    // "config"
 * removeTrailingSlash("/path/") // "/path"
 *
 * // Remove any extension
 * const removeExtension = (filename: string) => {
 *   const lastDot = filename.lastIndexOf(".")
 *   return lastDot === -1 ? filename : filename.slice(0, lastDot)
 * }
 * removeExtension("file.backup.txt")  // "file.backup"
 *
 * // Clean multiple suffixes
 * const removeSuffixes = (suffixes: Array<string>, str: string) => {
 *   for (const suffix of suffixes) {
 *     if (str.endsWith(suffix)) {
 *       return removeSuffix(suffix)(str)
 *     }
 *   }
 *   return str
 * }
 * removeSuffixes([".js", ".ts", ".jsx", ".tsx"], "component.tsx")
 * // "component"
 *
 * // Version suffix
 * removeSuffix("-v2")("api-service-v2")
 * // "api-service"
 *
 * // Timestamp suffix
 * removeSuffix("_2024")("backup_2024")
 * // "backup"
 *
 * // Remove units
 * removeSuffix("px")("100px")
 * // "100"
 *
 * removeSuffix("%")("50%")
 * // "50"
 *
 * // Language suffix
 * removeSuffix("-en")("content-en")
 * // "content"
 *
 * // Remove brackets
 * removeSuffix("]")("array[0]")
 * // "array[0" (only removes closing bracket)
 *
 * // SQL table suffix
 * removeSuffix("_table")("users_table")
 * // "users"
 *
 * // Remove trailing dots
 * removeSuffix("...")("Loading...")
 * // "Loading"
 *
 * // Git branch suffix
 * removeSuffix("-dev")("feature-branch-dev")
 * // "feature-branch"
 *
 * // Remove query string
 * removeSuffix("?debug=true")("https://api.example.com/endpoint?debug=true")
 * // "https://api.example.com/endpoint"
 *
 * // Clean markdown links
 * removeSuffix(")")("[Link](url)")
 * // "[Link](url" (only removes last parenthesis)
 *
 * // Remove trailing spaces
 * removeSuffix("  ")("text  ")
 * // "text"
 *
 * // Email domain
 * const removeDomain = removeSuffix("@example.com")
 * removeDomain("user@example.com")     // "user"
 * removeDomain("user@different.com")   // "user@different.com"
 *
 * // Remove numbering
 * removeSuffix("_1")("item_1")
 * // "item"
 *
 * // Clean temporary file suffix
 * removeSuffix(".tmp")("document.tmp")
 * // "document"
 *
 * removeSuffix("~")("backup~")
 * // "backup"
 *
 * // Remove environment suffix
 * removeSuffix(".prod")("config.prod")
 * // "config"
 *
 * removeSuffix(".dev")("config.dev")
 * // "config"
 *
 * // Chain multiple removals
 * const cleanFilename = (filename: string) => {
 *   return removeSuffix(".bak")(
 *     removeSuffix(".tmp")(
 *       removeSuffix("~")(filename)
 *     )
 *   )
 * }
 * cleanFilename("file.txt.tmp")  // "file.txt"
 * cleanFilename("file~")         // "file"
 *
 * // Remove port from host
 * removeSuffix(":3000")("localhost:3000")
 * // "localhost"
 *
 * // Handle null/undefined gracefully
 * removeSuffix("test")(null)       // ""
 * removeSuffix("test")(undefined)  // ""
 * removeSuffix(null)("test")       // "test"
 * removeSuffix(undefined)("test")  // "test"
 *
 * // Currency suffix
 * removeSuffix(" USD")("100.00 USD")
 * // "100.00"
 *
 * // Remove emoji suffix
 * removeSuffix(" 🎉")("Celebration 🎉")
 * // "Celebration"
 *
 * // XML closing tag
 * removeSuffix("</tag>")("<tag>content</tag>")
 * // "<tag>content"
 *
 * // Remove hash suffix
 * removeSuffix("#section")("https://example.com/page#section")
 * // "https://example.com/page"
 *
 * // Test suffix patterns
 * const hasSuffix = (suffix: string) => (str: string) =>
 *   str !== removeSuffix(suffix)(str)
 *
 * const isJsFile = hasSuffix(".js")
 * isJsFile("script.js")   // true
 * isJsFile("script.ts")   // false
 *
 * // Clean multiple similar suffixes
 * const removeTimestamp = (filename: string) => {
 *   // Removes any _YYYYMMDD suffix
 *   const match = filename.match(/_\d{8}$/)
 *   return match ? filename.slice(0, -match[0].length) : filename
 * }
 * removeTimestamp("report_20240115")  // "report"
 * removeTimestamp("report")           // "report"
 *
 * // Remove parenthetical suffix
 * const removeParenthetical = (str: string) => {
 *   const match = str.match(/\s*\([^)]*\)$/)
 *   return match ? str.slice(0, -match[0].length) : str
 * }
 * removeParenthetical("Title (2024)")     // "Title"
 * removeParenthetical("Name (copy)")      // "Name"
 * removeParenthetical("Plain text")       // "Plain text"
 * ```
 * @property Conditional - only removes if suffix exists
 * @property Case-sensitive - exact match required
 * @property Single-removal - only removes from end, not elsewhere
 */
const removeSuffix = (
	suffix: string | null | undefined,
) =>
(
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}

	if (suffix == null || typeof suffix !== "string" || suffix === "") {
		return str
	}

	// Only remove if string ends with the suffix
	return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str
}

export default removeSuffix
