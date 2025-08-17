/**
 * Removes a prefix from a string if present
 * 
 * Strips a specified prefix from the beginning of a string, but only if
 * the string actually starts with that prefix. If the prefix is not found
 * at the start, returns the original string unchanged. This is useful for
 * cleaning URLs, file paths, namespaces, or any prefixed identifiers.
 * 
 * @curried (prefix) => (str) => string
 * @param prefix - The prefix to remove
 * @param str - The string to remove prefix from
 * @returns String with prefix removed if it was present
 * @example
 * ```typescript
 * // Basic prefix removal
 * removePrefix("Mr. ")("Mr. Smith")
 * // "Smith"
 * 
 * // Prefix not present (unchanged)
 * removePrefix("Mr. ")("Mrs. Smith")
 * // "Mrs. Smith"
 * 
 * // Case sensitive
 * removePrefix("MR. ")("Mr. Smith")
 * // "Mr. Smith"
 * 
 * // Empty prefix (unchanged)
 * removePrefix("")("hello")
 * // "hello"
 * 
 * // Empty string
 * removePrefix("hello")("")
 * // ""
 * 
 * // Prefix is entire string
 * removePrefix("hello")("hello")
 * // ""
 * 
 * // Prefix longer than string (unchanged)
 * removePrefix("hello world")("hello")
 * // "hello"
 * 
 * // URL protocol removal
 * removePrefix("https://")("https://example.com")
 * // "example.com"
 * 
 * removePrefix("http://")("https://example.com")
 * // "https://example.com" (doesn't start with http://)
 * 
 * // File path cleaning
 * removePrefix("/usr/local/")("/usr/local/bin/node")
 * // "bin/node"
 * 
 * // Remove leading slash
 * removePrefix("/")("/path/to/file")
 * // "path/to/file"
 * 
 * // Namespace stripping
 * removePrefix("app.")("app.controllers.UserController")
 * // "controllers.UserController"
 * 
 * // Phone country code
 * removePrefix("+1"))("+1-555-123-4567")
 * // "-555-123-4567"
 * 
 * // Remove comment markers
 * removePrefix("// ")("// This is a comment")
 * // "This is a comment"
 * 
 * removePrefix("#")("# Python comment")
 * // " Python comment"
 * 
 * // Partial application for reusable cleaners
 * const removeHttps = removePrefix("https://")
 * const removeHttp = removePrefix("http://")
 * const removeWww = removePrefix("www.")
 * 
 * removeHttps("https://example.com")  // "example.com"
 * removeHttp("http://example.com")    // "example.com"
 * removeWww("www.example.com")        // "example.com"
 * 
 * // Clean multiple protocols
 * const removeProtocol = (url: string) => {
 *   const protocols = ["https://", "http://", "ftp://", "file://"]
 *   for (const protocol of protocols) {
 *     if (url.startsWith(protocol)) {
 *       return removePrefix(protocol)(url)
 *     }
 *   }
 *   return url
 * }
 * removeProtocol("https://example.com")  // "example.com"
 * removeProtocol("ftp://files.com")      // "files.com"
 * 
 * // Environment variable cleaning
 * removePrefix("REACT_APP_")("REACT_APP_API_KEY")
 * // "API_KEY"
 * 
 * // Docker image tag
 * removePrefix("docker.io/")("docker.io/library/node:latest")
 * // "library/node:latest"
 * 
 * // Git branch prefix
 * removePrefix("origin/")("origin/feature/new-feature")
 * // "feature/new-feature"
 * 
 * // Date prefix removal
 * removePrefix("2024-01-01-")("2024-01-01-daily-report.pdf")
 * // "daily-report.pdf"
 * 
 * // Remove line numbers
 * const removeeLineNum = removePrefix(/^\d+:\s*/)
 * removeLineNum("42: const x = 1")
 * // "const x = 1"
 * 
 * // AWS ARN cleaning
 * removePrefix("arn:aws:s3:::")("arn:aws:s3:::my-bucket/key")
 * // "my-bucket/key"
 * 
 * // Package scope removal
 * removePrefix("@company/")("@company/package-name")
 * // "package-name"
 * 
 * // Remove dot prefix
 * removePrefix(".")(".hidden-file")
 * // "hidden-file"
 * 
 * // SQL table prefix
 * removePrefix("tbl_")("tbl_users")
 * // "users"
 * 
 * // Remove BOM (Byte Order Mark)
 * removePrefix("\uFEFF")("\uFEFFContent here")
 * // "Content here"
 * 
 * // Remove indentation
 * removePrefix("    ")("    indented line")
 * // "indented line"
 * 
 * // Markdown header
 * removePrefix("# ")("# Title")
 * // "Title"
 * 
 * removePrefix("## ")("## Subtitle")
 * // "Subtitle"
 * 
 * // Remove quotes
 * removePrefix('"')('"quoted string"')
 * // 'quoted string"' (only removes from start)
 * 
 * // Language prefix
 * removePrefix("en-")("en-US")
 * // "US"
 * 
 * // Remove timestamp prefix
 * removePrefix("[2024-01-01 10:00:00] ")("[2024-01-01 10:00:00] Log message")
 * // "Log message"
 * 
 * // CSS class prefix
 * removePrefix("btn-")("btn-primary")
 * // "primary"
 * 
 * // Remove multiple prefixes in sequence
 * const cleanPath = (path: string) => {
 *   return removePrefix("./")(removePrefix("/")(path))
 * }
 * cleanPath("/./relative/path")  // "relative/path"
 * cleanPath("./relative/path")   // "relative/path"
 * cleanPath("relative/path")     // "relative/path"
 * 
 * // Version prefix
 * removePrefix("v")("v1.2.3")
 * // "1.2.3"
 * 
 * // Handle null/undefined gracefully
 * removePrefix("test")(null)       // ""
 * removePrefix("test")(undefined)  // ""
 * removePrefix(null)("test")       // "test"
 * removePrefix(undefined)("test")  // "test"
 * 
 * // Currency symbol removal
 * removePrefix("$")("$100.00")
 * // "100.00"
 * 
 * removePrefix("€")("€50.00")
 * // "50.00"
 * 
 * // Remove emoji prefix
 * removePrefix("🔥 ")("🔥 Hot topic")
 * // "Hot topic"
 * 
 * // XML namespace
 * removePrefix("ns:")("ns:element")
 * // "element"
 * 
 * // Remove hash prefix
 * removePrefix("#")("#hashtag")
 * // "hashtag"
 * 
 * // Remove mention prefix
 * removePrefix("@")("@username")
 * // "username"
 * 
 * // Test prefix patterns
 * const hasPrefix = (prefix: string) => (str: string) =>
 *   str !== removePrefix(prefix)(str)
 * 
 * const isHttps = hasPrefix("https://")
 * isHttps("https://example.com")  // true
 * isHttps("http://example.com")   // false
 * 
 * // Clean multiple similar prefixes
 * const removeDatePrefix = (filename: string) => {
 *   // Removes any YYYY-MM-DD- prefix
 *   const match = filename.match(/^\d{4}-\d{2}-\d{2}-/)
 *   return match ? filename.slice(match[0].length) : filename
 * }
 * removeDatePrefix("2024-01-15-report.pdf")  // "report.pdf"
 * removeDatePrefix("report.pdf")             // "report.pdf"
 * ```
 * @property Conditional - only removes if prefix exists
 * @property Case-sensitive - exact match required
 * @property Single-removal - only removes from beginning, not elsewhere
 */
const removePrefix = (
	prefix: string | null | undefined
) => (
	str: string | null | undefined
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}
	
	if (prefix == null || typeof prefix !== "string" || prefix === "") {
		return str
	}
	
	// Only remove if string starts with the prefix
	return str.startsWith(prefix) 
		? str.slice(prefix.length)
		: str
}

export default removePrefix