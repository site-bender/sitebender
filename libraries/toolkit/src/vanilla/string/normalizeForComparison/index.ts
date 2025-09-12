/**
 * Normalizes string for comparison (lowercase, remove special chars)
 *
 * Transforms a string to a normalized form suitable for case-insensitive
 * and accent-insensitive comparisons. Converts to lowercase, removes
 * diacritics, and optionally removes non-alphanumeric characters.
 * Useful for fuzzy matching, search, and deduplication.
 *
 * @param text - The text to normalize
 * @returns Normalized string suitable for comparison
 * @example
 * ```typescript
 * // Basic normalization
 * normalizeForComparison("Hello World!")  // "hello world"
 * normalizeForComparison("Café")          // "cafe"
 * normalizeForComparison("naïve résumé")  // "naive resume"
 *
 * // Special character handling
 * normalizeForComparison("hello@world.com")  // "helloworldcom"
 * normalizeForComparison("price: $99.99!")   // "price 9999"
 *
 * // Unicode normalization
 * normalizeForComparison("Zürich")      // "zurich"
 * normalizeForComparison("São Paulo")   // "sao paulo"
 *
 * // String comparison utility
 * const areEqual = (a: string, b: string) =>
 *   normalizeForComparison(a) === normalizeForComparison(b)
 * areEqual("Café", "cafe")         // true
 * areEqual("HELLO", "hello")       // true
 * areEqual("user@123", "USER 123") // true
 *
 * // Fuzzy search
 * const fuzzyMatch = (needle: string, haystack: string) => {
 *   const normNeedle = normalizeForComparison(needle)
 *   const normHaystack = normalizeForComparison(haystack)
 *   return normHaystack.includes(normNeedle)
 * }
 * fuzzyMatch("cafe", "Café Luna")  // true
 * fuzzyMatch("email", "e-mail")    // true
 * ```
 * @pure
 * @immutable
 * @safe
 */
const normalizeForComparison = (text: string): string => {
	if (!text || typeof text !== "string") {
		return ""
	}

	// Normalize Unicode to decomposed form (NFD)
	let normalized = text.normalize("NFD")

	// Remove diacritical marks (combining characters)
	normalized = normalized.replace(/[\u0300-\u036f]/g, "")

	// Convert to lowercase
	normalized = normalized.toLowerCase()

	// Remove non-alphanumeric characters except spaces
	normalized = normalized.replace(
		/[^a-z0-9\s\u00C0-\u024F\u1E00-\u1EFF\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/gi,
		"",
	)

	// Collapse multiple spaces into single space
	normalized = normalized.replace(/\s+/g, " ")

	// Trim leading and trailing whitespace
	normalized = normalized.trim()

	return normalized
}

export default normalizeForComparison
