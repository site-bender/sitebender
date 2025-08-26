/**
 * Removes diacritical marks from characters
 *
 * Converts accented characters to their basic Latin equivalents by removing
 * diacritical marks (accents, tildes, umlauts, etc.). This is useful for
 * search normalization, URL slugs, or creating ASCII-safe strings. The
 * function handles a comprehensive set of Latin-based diacritics but
 * preserves non-Latin scripts unchanged.
 *
 * @param str - String to remove diacritics from
 * @returns String with diacritical marks removed
 * @example
 * ```typescript
 * // Basic usage
 * deburr("café")
 * // "cafe"
 *
 * deburr("naïve résumé")
 * // "naive resume"
 *
 * // Various languages
 * deburr("niño mañana")  // Spanish
 * // "nino manana"
 *
 * deburr("über schön")   // German
 * // "uber schon"
 *
 * deburr("São Paulo")     // Portuguese
 * // "Sao Paulo"
 *
 * // Case preserved
 * deburr("CaféMañana")
 * // "CafeManana"
 *
 * // Search normalization
 * const normalize = (s: string) => deburr(s.toLowerCase())
 * normalize("Café") === normalize("cafe")
 * // true
 *
 * // Non-Latin scripts unchanged
 * deburr("你好 мир שלום")
 * // "你好 мир שלום"
 * ```
 * @pure
 * @immutable
 * @safe
 */
const deburr = (
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}

	// Normalize to NFD (Canonical Decomposition) to separate base characters from combining marks
	// Then remove combining diacritical marks (Unicode category Mn)
	// Also handle some special Latin characters that don't decompose
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "") // Remove combining diacritical marks
		.replace(/ø/g, "o")
		.replace(/Ø/g, "O")
		.replace(/æ/g, "ae")
		.replace(/Æ/g, "AE")
		.replace(/œ/g, "oe")
		.replace(/Œ/g, "OE")
		.replace(/ð/g, "d")
		.replace(/Ð/g, "D")
		.replace(/þ/g, "th")
		.replace(/Þ/g, "Th")
		.replace(/ß/g, "ss")
		.replace(/ł/g, "l")
		.replace(/Ł/g, "L")
		.replace(/đ/g, "d")
		.replace(/Đ/g, "D")
		.replace(/ı/g, "i")
		.replace(/İ/g, "I")
}

export default deburr
