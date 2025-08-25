/**
 * Swaps the case of all alphabetic characters in a string
 *
 * Converts uppercase letters to lowercase and lowercase letters to
 * uppercase. Non-alphabetic characters remain unchanged. This is
 * useful for text effects, encoding schemes, or case transformations.
 *
 * @param str - String to swap case
 * @returns String with swapped case
 * @example
 * ```typescript
 * // Basic case swapping
 * swapCase("Hello World")
 * // "hELLO wORLD"
 *
 * // All uppercase
 * swapCase("HELLO")
 * // "hello"
 *
 * // All lowercase
 * swapCase("hello")
 * // "HELLO"
 *
 * // Mixed case
 * swapCase("HeLLo WoRLd")
 * // "hEllO wOrlD"
 *
 * // Numbers and symbols unchanged
 * swapCase("Test123!@#")
 * // "tEST123!@#"
 *
 * // Empty string
 * swapCase("")
 * // ""
 *
 * // Single character
 * swapCase("a")
 * // "A"
 *
 * swapCase("A")
 * // "a"
 *
 * // Non-alphabetic unchanged
 * swapCase("123 !@# 456")
 * // "123 !@# 456"
 *
 * // Sentence case swap
 * swapCase("The Quick Brown Fox")
 * // "tHE qUICK bROWN fOX"
 *
 * // camelCase to PascalCase-ish
 * swapCase("camelCase")
 * // "CAMELcASE"
 *
 * // URL with mixed case
 * swapCase("https://Example.COM/Path")
 * // "HTTPS://eXAMPLE.com/pATH"
 *
 * // Acronyms
 * swapCase("HTML and CSS")
 * // "html AND css"
 *
 * // Unicode letters (if supported)
 * swapCase("Café CAFÉ")
 * // "cAFÉ cafÉ"
 *
 * // Double swap returns original
 * swapCase(swapCase("Hello World"))
 * // "Hello World"
 *
 * // Use for simple encoding
 * const encode = swapCase
 * const decode = swapCase  // Same operation
 * decode(encode("Secret Message"))
 * // "Secret Message"
 *
 * // Alternating case detector
 * const hasAlternatingCase = (str: string) => {
 *   const swapped = swapCase(str)
 *   return str !== swapped &&
 *          str.toLowerCase() !== str &&
 *          str.toUpperCase() !== str
 * }
 * hasAlternatingCase("HeLLo")  // true
 * hasAlternatingCase("hello")  // false
 *
 * // Toggle case command
 * const toggleCase = (text: string, enabled: boolean) => {
 *   return enabled ? swapCase(text) : text
 * }
 * toggleCase("Hello", true)   // "hELLO"
 * toggleCase("Hello", false)  // "Hello"
 *
 * // Handle null/undefined
 * swapCase(null)       // ""
 * swapCase(undefined)  // ""
 *
 * // Email with swapped case
 * swapCase("John.Doe@Example.Com")
 * // "jOHN.dOE@eXAMPLE.cOM"
 *
 * // Code with swapped case
 * swapCase("const myVar = 'VALUE';")
 * // "CONST MYvAR = 'value';"
 *
 * // Markdown headers
 * swapCase("# Main Title")
 * // "# mAIN tITLE"
 *
 * // File paths
 * swapCase("/Users/John/Documents")
 * // "/uSERS/jOHN/dOCUMENTS"
 * ```
 * @property Reversible - applying twice returns original
 * @property Character-preserving - only changes case, not characters
 * @property Unicode-aware - handles accented characters
 */
const swapCase = (
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}

	return str.replace(/[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/g, (char) => {
		return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
	})
}

export default swapCase
