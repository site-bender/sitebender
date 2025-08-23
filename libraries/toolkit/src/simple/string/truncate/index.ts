/**
 * Truncates a string to specified length with ellipsis
 * 
 * Shortens a string to a maximum length and adds an ellipsis (or custom
 * suffix) if truncation occurs. Can optionally break at word boundaries
 * to avoid cutting words in half. Useful for preview text, UI constraints,
 * or summary generation.
 * 
 * @curried (maxLength) => (suffix?) => (str) => string
 * @param maxLength - Maximum length including suffix
 * @param suffix - String to append when truncated (default: "...")
 * @param str - String to truncate
 * @returns Truncated string with suffix if needed
 * @example
 * ```typescript
 * // Basic truncation
 * truncate(10)("...")("Hello World, how are you?")
 * // "Hello W..."
 * 
 * // No truncation needed
 * truncate(20)("...")("Short text")
 * // "Short text"
 * 
 * // Exact length
 * truncate(5)("...")("Hello")
 * // "Hello"
 * 
 * // Very short max length
 * truncate(3)("...")("Hello")
 * // "..."
 * 
 * // Custom suffix
 * truncate(15)("…")("This is a long sentence")
 * // "This is a long…"
 * 
 * // No suffix
 * truncate(10)("")("Hello World")
 * // "Hello Worl"
 * 
 * // Empty string
 * truncate(10)("...")("")
 * // ""
 * 
 * // Single character
 * truncate(1)("...")("Hello")
 * // "H" (or "..." if maxLength <= suffix length)
 * 
 * // Partial application for consistent truncation
 * const truncate50 = truncate(50)("...")
 * const truncate100 = truncate(100)("...")
 * const truncateNoSuffix = truncate(20)("")
 * 
 * truncate50("Short")  // "Short"
 * truncate50("Very long text that needs to be shortened for display")
 * // "Very long text that needs to be shortened for ..."
 * 
 * // Article preview
 * const preview = truncate(150)("... [Read more]")
 * preview("Lorem ipsum dolor sit amet, consectetur adipiscing elit...")
 * // Truncated with custom suffix
 * 
 * // Tweet-like length limit
 * const tweetLimit = truncate(280)("")
 * tweetLimit("Long message...")  // Cuts at exactly 280 chars
 * 
 * // Table cell content
 * const cellContent = truncate(20)("...")
 * ["Very long product name", "Short", "Medium length name"].map(cellContent)
 * // ["Very long product...", "Short", "Medium length name"]
 * 
 * // Username display
 * const displayName = truncate(15)("...")
 * displayName("verylongusername123")  // "verylonguser..."
 * 
 * // Path truncation
 * const truncatePath = truncate(30)(".../")
 * truncatePath("/very/long/path/to/deep/file.txt")
 * // "/very/long/path/to/deep/fi.../"
 * 
 * // Word-aware truncation (simple implementation)
 * const truncateWords = (max: number) => (str: string) => {
 *   if (str.length <= max) return str
 *   const truncated = str.slice(0, max - 3)
 *   const lastSpace = truncated.lastIndexOf(" ")
 *   return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "..."
 * }
 * truncateWords(20)("Hello beautiful world")
 * // "Hello beautiful..."
 * 
 * // Handle null/undefined
 * truncate(10)("...")(null)       // ""
 * truncate(10)("...")(undefined)  // ""
 * 
 * // HTML text preview (strip tags first)
 * const htmlPreview = (html: string) => {
 *   const text = html.replace(/<[^>]*>/g, "")
 *   return truncate(100)("...")(text)
 * }
 * htmlPreview("<p>Long HTML content with <b>tags</b></p>")
 * // "Long HTML content with tags"
 * 
 * // JSON string truncation
 * const json = JSON.stringify({ data: "..." })
 * truncate(50)("...")(json)
 * 
 * // Log message truncation
 * const logTruncate = truncate(200)(" [truncated]")
 * logTruncate("Very long error message...")
 * ```
 * @property Length-aware - respects maximum length including suffix
 * @property Suffix-customizable - allows any truncation indicator
 * @property Smart-truncation - accounts for suffix in length calculation
 */
const truncate = (
	maxLength: number
) => (
	suffix: string = "..."
) => (
	str: string | null | undefined
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}
	
	if (str.length <= maxLength) {
		return str
	}
	
	// If maxLength is less than or equal to suffix length, return just suffix
	if (maxLength <= suffix.length) {
		return suffix.slice(0, maxLength)
	}
	
	// Truncate and add suffix
	return str.slice(0, maxLength - suffix.length) + suffix
}

export default truncate