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
 * normalizeForComparison("Hello World!")
 * // "hello world"
 * 
 * // Remove diacritics
 * normalizeForComparison("Café")
 * // "cafe"
 * 
 * normalizeForComparison("naïve résumé")
 * // "naive resume"
 * 
 * // Preserve alphanumeric and spaces
 * normalizeForComparison("User123 Test-Case")
 * // "user123 testcase"
 * 
 * // Remove special characters
 * normalizeForComparison("hello@world.com")
 * // "helloworldcom"
 * 
 * normalizeForComparison("price: $99.99!")
 * // "price 9999"
 * 
 * // Unicode normalization
 * normalizeForComparison("Zürich")
 * // "zurich"
 * 
 * normalizeForComparison("São Paulo")
 * // "sao paulo"
 * 
 * // Multiple spaces collapsed
 * normalizeForComparison("too    many    spaces")
 * // "too many spaces"
 * 
 * // Trim whitespace
 * normalizeForComparison("  padded text  ")
 * // "padded text"
 * 
 * // Compare strings after normalization
 * const areEqual = (a: string, b: string) =>
 *   normalizeForComparison(a) === normalizeForComparison(b)
 * 
 * areEqual("Café", "cafe")         // true
 * areEqual("HELLO", "hello")       // true
 * areEqual("naïve", "naive")       // true
 * areEqual("user@123", "USER 123") // true
 * 
 * // Deduplication
 * const names = ["John Doe", "JOHN DOE", "john.doe", "John  Doe"]
 * const unique = new Set(names.map(normalizeForComparison))
 * // Set(["john doe", "johndoe"])
 * 
 * // Search normalization
 * const searchableText = (text: string) => 
 *   normalizeForComparison(text)
 * 
 * const documents = [
 *   "Café Menu",
 *   "Coffee Shop",
 *   "CAFE prices"
 * ]
 * 
 * const search = "cafe"
 * documents.filter(doc => 
 *   searchableText(doc).includes(searchableText(search))
 * )
 * // ["Café Menu", "CAFE prices"]
 * 
 * // Username normalization
 * normalizeForComparison("JohnDoe123")
 * // "johndoe123"
 * 
 * normalizeForComparison("john.doe_123")
 * // "johndoe123"
 * 
 * // Email comparison
 * normalizeForComparison("John.Doe@Example.COM")
 * // "johndoeexamplecom"
 * 
 * // Product names
 * normalizeForComparison("iPhone 14 Pro Max")
 * // "iphone 14 pro max"
 * 
 * normalizeForComparison("i-Phone.14.Pro.Max!")
 * // "iphone14promax"
 * 
 * // International text
 * normalizeForComparison("北京")  // Chinese
 * // "北京" (preserved, no latin conversion)
 * 
 * normalizeForComparison("Москва")  // Russian
 * // "москва" (lowercased Cyrillic)
 * 
 * normalizeForComparison("مرحبا")  // Arabic
 * // "مرحبا" (preserved)
 * 
 * // Mixed scripts
 * normalizeForComparison("Tokyo 東京")
 * // "tokyo 東京"
 * 
 * // Empty or whitespace
 * normalizeForComparison("")
 * // ""
 * 
 * normalizeForComparison("   ")
 * // ""
 * 
 * // Numbers preserved
 * normalizeForComparison("Order #12345")
 * // "order 12345"
 * 
 * normalizeForComparison("2.5 stars")
 * // "25 stars"
 * 
 * // Hashtags and mentions
 * normalizeForComparison("#trending @user")
 * // "trending user"
 * 
 * // File names
 * normalizeForComparison("My-Document_v2.1.pdf")
 * // "mydocumentv21pdf"
 * 
 * // Company names
 * normalizeForComparison("O'Reilly & Associates, Inc.")
 * // "oreilly associates inc"
 * 
 * // Fuzzy matching
 * const fuzzyMatch = (needle: string, haystack: string) => {
 *   const normNeedle = normalizeForComparison(needle)
 *   const normHaystack = normalizeForComparison(haystack)
 *   return normHaystack.includes(normNeedle)
 * }
 * 
 * fuzzyMatch("cafe", "Café Luna")      // true
 * fuzzyMatch("resume", "Résumé.pdf")   // true
 * fuzzyMatch("email", "e-mail address") // true
 * ```
 * @property Immutable - doesn't modify input string
 * @property Case-insensitive - converts to lowercase
 * @property Diacritic-insensitive - removes accents and marks
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
	normalized = normalized.replace(/[^a-z0-9\s\u00C0-\u024F\u1E00-\u1EFF\u4E00-\u9FFF\u0400-\u04FF\u0600-\u06FF]/gi, "")
	
	// Collapse multiple spaces into single space
	normalized = normalized.replace(/\s+/g, " ")
	
	// Trim leading and trailing whitespace
	normalized = normalized.trim()
	
	return normalized
}

export default normalizeForComparison