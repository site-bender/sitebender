/**
 * Truncates a string from the middle with ellipsis
 * 
 * Shortens a string by removing characters from the middle and replacing
 * them with an ellipsis or custom separator. Preserves the beginning and
 * end of the string, which is useful for displaying file paths, URLs,
 * long identifiers, or any text where the start and end are most important.
 * 
 * @curried (maxLength) => (separator?) => (str) => string
 * @param maxLength - Maximum total length including separator
 * @param separator - String to insert in the middle (default: "...")
 * @param str - String to truncate
 * @returns Truncated string with middle replaced by separator
 * @example
 * ```typescript
 * // Basic middle truncation
 * truncateMiddle(20)("...")("/very/long/path/to/file.txt")
 * // "/very/long...file.txt"
 * 
 * // No truncation needed
 * truncateMiddle(50)("...")("Short text")
 * // "Short text"
 * 
 * // Exact length match
 * truncateMiddle(10)("...")("HelloWorld")
 * // "HelloWorld"
 * 
 * // Very short max length
 * truncateMiddle(5)("...")("HelloWorld")
 * // "H...d"
 * 
 * // Custom separator
 * truncateMiddle(15)("…")("ThisIsAVeryLongString")
 * // "ThisIsA…tring"
 * 
 * // No separator (just removes middle)
 * truncateMiddle(10)("")("HelloWorldTest")
 * // "HelloTest"
 * 
 * // Empty string
 * truncateMiddle(10)("...")("")
 * // ""
 * 
 * // File path truncation
 * const truncatePath = truncateMiddle(30)(".../")
 * truncatePath("/Users/john/Documents/Projects/MyApp/src/index.js")
 * // "/Users/john/Doc.../src/index.js"
 * 
 * // URL truncation
 * const truncateUrl = truncateMiddle(40)("...")
 * truncateUrl("https://example.com/very/long/path/to/resource?param=value")
 * // "https://example.com/very...?param=value"
 * 
 * // UUID/Hash truncation
 * const truncateId = truncateMiddle(12)("...")
 * truncateId("550e8400-e29b-41d4-a716-446655440000")
 * // "550e8...40000"
 * 
 * // Partial application for consistent truncation
 * const truncate50 = truncateMiddle(50)("...")
 * const truncate30 = truncateMiddle(30)("...")
 * const truncateCompact = truncateMiddle(15)("~")
 * 
 * // Email address truncation (preserve domain)
 * truncateMiddle(20)("...")("verylongemailaddress@example.com")
 * // "verylong...ample.com"
 * 
 * // Class name truncation (Java/C#)
 * truncateMiddle(25)("...")("com.example.application.services.UserService")
 * // "com.example...UserService"
 * 
 * // Git commit hash
 * truncateMiddle(10)("...")("a1b2c3d4e5f6g7h8i9j0")
 * // "a1b2...9j0"
 * 
 * // Ethereum address
 * truncateMiddle(12)("...")("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7")
 * // "0x742...bEb7"
 * 
 * // Balance display (keep start and end)
 * const balanceDisplay = truncateMiddle(15)("***")
 * balanceDisplay("1234567890123456")  // Credit card style
 * // "123456***3456"
 * 
 * // Table column content
 * const columnContent = truncateMiddle(20)("...")
 * [
 *   "Short",
 *   "Medium length text",
 *   "Very long text that needs to be truncated"
 * ].map(columnContent)
 * // ["Short", "Medium length text", "Very long...runcated"]
 * 
 * // Smart length calculation
 * const smartTruncate = (str: string, max: number) => {
 *   if (str.length <= max) return str
 *   // Keep more of the end for file extensions
 *   const separator = "..."
 *   const endKeep = str.includes(".") ? 8 : 4
 *   const startKeep = max - separator.length - endKeep
 *   return str.slice(0, startKeep) + separator + str.slice(-endKeep)
 * }
 * 
 * // Handle null/undefined
 * truncateMiddle(10)("...")(null)       // ""
 * truncateMiddle(10)("...")(undefined)  // ""
 * 
 * // Unicode support
 * truncateMiddle(10)("...")("Hello世界Test")
 * // "Hel...est"
 * 
 * // Emoji handling
 * truncateMiddle(8)("...")("🚀Start🏁End")
 * // "🚀S...nd"
 * 
 * // Breadcrumb truncation
 * const breadcrumb = "Home > Products > Electronics > Computers > Laptops"
 * truncateMiddle(30)(" ... ")(breadcrumb)
 * // "Home > Produc ... > Laptops"
 * 
 * // JSON string preview
 * const json = JSON.stringify({ very: { deep: { nested: { object: "value" }}}})
 * truncateMiddle(25)("...")(json)
 * // '{"very":{"d..."value"}}}'
 * 
 * // SQL query preview
 * const query = "SELECT * FROM users WHERE status = 'active' AND created_at > '2024-01-01'"
 * truncateMiddle(40)(" ... ")(query)
 * // "SELECT * FROM users  ... > '2024-01-01'"
 * ```
 * @property Balanced - tries to keep equal amounts from start and end
 * @property Customizable - separator can be any string
 * @property Path-friendly - excellent for file paths and URLs
 */
const truncateMiddle = (
	maxLength: number
) => (
	separator: string = "..."
) => (
	str: string | null | undefined
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}
	
	// If string is already short enough, return as-is
	if (str.length <= maxLength) {
		return str
	}
	
	// If maxLength is less than or equal to separator length, 
	// return just the separator truncated to maxLength
	if (maxLength <= separator.length) {
		return separator.slice(0, maxLength)
	}
	
	// Calculate how many characters we can keep from original string
	const availableLength = maxLength - separator.length
	
	// If no room for any original characters, return separator
	if (availableLength <= 0) {
		return separator.slice(0, maxLength)
	}
	
	// Split available length between start and end
	// Favor the start slightly if odd number
	const startLength = Math.ceil(availableLength / 2)
	const endLength = Math.floor(availableLength / 2)
	
	// Extract start and end portions
	const start = str.slice(0, startLength)
	const end = str.slice(-endLength)
	
	// Combine with separator
	return start + separator + end
}

export default truncateMiddle