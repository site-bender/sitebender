/**
 * Normalizes Unicode characters in a string
 *
 * Converts a string to a normalized Unicode form (NFC, NFD, NFKC, or NFKD).
 * This is essential for consistent string comparison, searching, and storage
 * when dealing with Unicode text that may have multiple representations of
 * the same character. Default form is NFC (Canonical Composition).
 *
 * @curried (form?) => (str) => string
 * @param form - Unicode normalization form: "NFC" | "NFD" | "NFKC" | "NFKD" (default: "NFC")
 * @param str - String to normalize
 * @returns Normalized string
 * @example
 * ```typescript
 * // Default NFC normalization (composed form)
 * normalize()("é")  // Single composed character
 * // "é" (U+00E9)
 *
 * // NFD normalization (decomposed form)
 * normalize("NFD")("é")
 * // "é" (U+0065 + U+0301: e + combining acute accent)
 *
 * // Visually identical but different representations
 * const composed = "é"  // Typed as single character
 * const decomposed = "e\u0301"  // e + combining accent
 * composed === decomposed  // false
 * normalize()(composed) === normalize()(decomposed)  // true
 *
 * // NFKC normalization (compatibility composition)
 * normalize("NFKC")("ﬁ")  // Ligature
 * // "fi" (converts to separate letters)
 *
 * // NFKD normalization (compatibility decomposition)
 * normalize("NFKD")("①")  // Circled number
 * // "1" (converts to plain digit)
 *
 * // Empty string
 * normalize()("")
 * // ""
 *
 * // No normalization needed
 * normalize()("hello")
 * // "hello"
 *
 * // Korean text normalization
 * const korean = "한글"  // Hangul
 * normalize("NFC")(korean)   // Composed
 * normalize("NFD")(korean)   // Decomposed into jamo
 *
 * // String comparison after normalization
 * const compare = (a: string, b: string) =>
 *   normalize()(a) === normalize()(b)
 * compare("café", "cafe\u0301")  // true
 *
 * // Search normalization
 * const normalizedSearch = (needle: string, haystack: string) => {
 *   const normNeedle = normalize()(needle)
 *   const normHaystack = normalize()(haystack)
 *   return normHaystack.includes(normNeedle)
 * }
 * normalizedSearch("cafe\u0301", "I like café")  // true
 *
 * // Partial application for consistent normalization
 * const toNFC = normalize("NFC")
 * const toNFD = normalize("NFD")
 * const toNFKC = normalize("NFKC")
 * const toNFKD = normalize("NFKD")
 *
 * toNFC("é")   // Composed form
 * toNFD("é")   // Decomposed form
 *
 * // Full-width to half-width conversion
 * normalize("NFKC")("Ｈｅｌｌｏ")
 * // "Hello" (full-width to normal ASCII)
 *
 * // Roman numerals normalization
 * normalize("NFKC")("Ⅻ")
 * // "XII" (single character to separate letters)
 *
 * // Fraction normalization
 * normalize("NFKC")("½")
 * // "1⁄2" (may vary by implementation)
 *
 * // Superscript/subscript normalization
 * normalize("NFKC")("x²")
 * // "x2" (superscript to normal)
 *
 * // Mathematical symbols
 * normalize("NFKC")("∑")  // Summation symbol
 * // "∑" (unchanged, not a compatibility character)
 *
 * // Alphabetic presentation forms
 * normalize("NFKC")("ﬀ")  // ff ligature
 * // "ff" (separate letters)
 *
 * // Arabic text normalization
 * const arabic = "السلام"
 * normalize("NFC")(arabic)  // Composed
 * normalize("NFD")(arabic)  // Decomposed
 *
 * // URL slug normalization
 * const makeSlug = (text: string) => {
 *   return normalize("NFKD")(text)
 *     .toLowerCase()
 *     .replace(/[^\w\s-]/g, "")
 *     .replace(/\s+/g, "-")
 * }
 * makeSlug("Café François")  // "cafe-francois"
 *
 * // Database storage normalization
 * const prepareForStorage = (text: string) => {
 *   return normalize("NFC")(text.trim())
 * }
 * prepareForStorage("  café  ")  // "café" (normalized and trimmed)
 *
 * // Sort with normalization
 * const names = ["André", "Andre\u0301", "Andrew"]
 * names.sort((a, b) => normalize()(a).localeCompare(normalize()(b)))
 * // Ensures consistent sorting regardless of encoding
 *
 * // File name normalization
 * const normalizeFilename = (filename: string) => {
 *   return normalize("NFC")(filename)
 * }
 * normalizeFilename("re\u0301sume\u0301.pdf")
 * // "résumé.pdf" (composed form)
 *
 * // Form input normalization
 * const normalizeInput = (input: string) => {
 *   return normalize("NFC")(input.trim())
 * }
 *
 * // Check if already normalized
 * const isNormalized = (str: string, form: string = "NFC") => {
 *   return str === normalize(form)(str)
 * }
 * isNormalized("café")       // true (if already NFC)
 * isNormalized("cafe\u0301")  // false (if decomposed)
 *
 * // Handle null/undefined gracefully
 * normalize()(null)       // ""
 * normalize()(undefined)  // ""
 * normalize(null)("test") // "test" (defaults to NFC)
 *
 * // Mixed scripts normalization
 * const mixed = "Hello 世界 مرحبا"
 * normalize("NFC")(mixed)  // Normalizes all scripts
 *
 * // Emoji normalization (usually unchanged)
 * normalize()("👨‍👩‍👧‍👦")
 * // "👨‍👩‍👧‍👦" (unchanged, already normalized)
 *
 * // Case folding with normalization
 * const caseInsensitiveCompare = (a: string, b: string) => {
 *   const normA = normalize("NFKC")(a.toLowerCase())
 *   const normB = normalize("NFKC")(b.toLowerCase())
 *   return normA === normB
 * }
 * caseInsensitiveCompare("Café", "CAFE\u0301")  // true
 *
 * // Remove diacritics after decomposition
 * const removeDiacritics = (str: string) => {
 *   return normalize("NFD")(str)
 *     .replace(/[\u0300-\u036f]/g, "")
 * }
 * removeDiacritics("café résumé")  // "cafe resume"
 *
 * // Length consistency
 * const s1 = "é"  // Composed
 * const s2 = "e\u0301"  // Decomposed
 * s1.length  // 1
 * s2.length  // 2
 * normalize()(s1).length === normalize()(s2).length  // true
 *
 * // Security: prevent homograph attacks
 * const sanitizeUsername = (username: string) => {
 *   return normalize("NFKC")(username.toLowerCase().trim())
 * }
 * sanitizeUsername("admin")  // "admin" (Latin)
 * sanitizeUsername("аdmin")  // "аdmin" (Cyrillic 'a', looks same but different)
 *
 * // Consistent hashing
 * const hashString = (str: string) => {
 *   const normalized = normalize("NFC")(str)
 *   // ... perform hashing on normalized string
 *   return normalized  // placeholder
 * }
 * ```
 * @property Unicode-compliant - follows Unicode normalization standards
 * @property Form-flexible - supports all four Unicode normalization forms
 * @property Comparison-safe - ensures consistent string comparison
 */
const normalize = (
	form: "NFC" | "NFD" | "NFKC" | "NFKD" | null | undefined = "NFC",
) =>
(
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}

	// Default to NFC if form is invalid
	const normalForm = form && ["NFC", "NFD", "NFKC", "NFKD"].includes(form)
		? form
		: "NFC"

	// Use native normalize method
	return str.normalize(normalForm)
}

export default normalize
