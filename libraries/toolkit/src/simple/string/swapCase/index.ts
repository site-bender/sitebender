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
 * // Numbers and symbols unchanged
 * swapCase("Test123!@#")
 * // "tEST123!@#"
 *
 * // Empty string
 * swapCase("")
 * // ""
 *
 * // Double swap returns original
 * swapCase(swapCase("Hello World"))
 * // "Hello World"
 *
 * // Handle null/undefined
 * swapCase(null)       // ""
 * swapCase(undefined)  // ""
 *
 * // Unicode letters
 * swapCase("Café CAFÉ")
 * // "cAFÉ cafÉ"
 * ```
 * @pure
 * @immutable
 * @safe
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
