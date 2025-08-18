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
 * // Basic accents
 * deburr("café")
 * // "cafe"
 * 
 * // Multiple accents
 * deburr("naïve résumé")
 * // "naive resume"
 * 
 * // Spanish characters
 * deburr("niño mañana")
 * // "nino manana"
 * 
 * // German umlauts
 * deburr("über schön")
 * // "uber schon"
 * 
 * // French accents
 * deburr("château élève")
 * // "chateau eleve"
 * 
 * // Portuguese/Brazilian
 * deburr("São Paulo açaí")
 * // "Sao Paulo acai"
 * 
 * // Nordic characters
 * deburr("Åse Øyvind")
 * // "Ase Oyvind"
 * 
 * // Polish characters
 * deburr("Łódź Kraków")
 * // "Lodz Krakow"
 * 
 * // Czech/Slovak
 * deburr("Dvořák Škoda")
 * // "Dvorak Skoda"
 * 
 * // Romanian
 * deburr("București România")
 * // "Bucuresti Romania"
 * 
 * // Mixed case preserved
 * deburr("CaféMañana")
 * // "CafeManana"
 * 
 * // No diacritics (unchanged)
 * deburr("hello world")
 * // "hello world"
 * 
 * // Empty string
 * deburr("")
 * // ""
 * 
 * // Numbers and symbols (unchanged)
 * deburr("123 #$% @!")
 * // "123 #$% @!"
 * 
 * // URL slug creation
 * const slug = deburr("Café São Paulo").toLowerCase().replace(/\s+/g, "-")
 * // "cafe-sao-paulo"
 * 
 * // Search normalization
 * const normalize = (s: string) => deburr(s.toLowerCase())
 * normalize("Café") === normalize("cafe")
 * // true
 * 
 * // Name matching
 * const names = ["José", "André", "François"]
 * const searchName = "andre"
 * names.filter(name => 
 *   deburr(name.toLowerCase()).includes(searchName)
 * )
 * // ["André"]
 * 
 * // File name sanitization
 * const fileName = "résumé_2024.pdf"
 * deburr(fileName)
 * // "resume_2024.pdf"
 * 
 * // All vowel variants
 * deburr("àáäâèéëêìíïîòóöôùúüû")
 * // "aaaaeeeeiiiioooomuuu"
 * 
 * // Capital vowel variants
 * deburr("ÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛ")
 * // "AAAAEEEEIIIIOOOOMUUU"
 * 
 * // Consonant variants
 * deburr("ñÑçÇšŠžŽ")
 * // "nNcCsSzZ"
 * 
 * // Ligatures
 * deburr("œæŒÆ")
 * // "oeaeOEAE"
 * 
 * // Special Latin characters
 * deburr("ðÐþÞ")
 * // "dDthTh"
 * 
 * // Currency symbols (unchanged)
 * deburr("€$£¥")
 * // "€$£¥"
 * 
 * // Non-Latin scripts (unchanged)
 * deburr("你好 мир שלום")
 * // "你好 мир שלום"
 * 
 * // Mixed scripts
 * deburr("café 世界 naïve")
 * // "cafe 世界 naive"
 * 
 * // Create search index
 * const items = [
 *   { id: 1, name: "Café Noir" },
 *   { id: 2, name: "Château Rouge" },
 *   { id: 3, name: "São Paulo" }
 * ]
 * const searchIndex = items.map(item => ({
 *   ...item,
 *   searchKey: deburr(item.name.toLowerCase())
 * }))
 * // Search is now accent-insensitive
 * 
 * // Handle null/undefined gracefully
 * deburr(null)       // ""
 * deburr(undefined)  // ""
 * 
 * // Combining characters (decomposed)
 * deburr("e\u0301")  // é as e + combining acute
 * // "e"
 * 
 * // Multiple diacritics on same letter
 * deburr("ȩ")  // e with cedilla and acute
 * // "e"
 * 
 * // Use for sorting
 * const words = ["zebra", "âme", "école", "apple"]
 * words.sort((a, b) => deburr(a).localeCompare(deburr(b)))
 * // ["âme", "apple", "école", "zebra"]
 * 
 * // Use in regular expressions
 * const pattern = deburr("café").split("").join(".*")
 * new RegExp(pattern, "i").test("c-a-f-e")
 * // true
 * 
 * // Accent-insensitive comparison
 * const areEqual = (s1: string, s2: string) => 
 *   deburr(s1.toLowerCase()) === deburr(s2.toLowerCase())
 * areEqual("Café", "CAFE")   // true
 * areEqual("naïve", "naive")  // true
 * ```
 * @property Unicode-aware - uses NFD normalization for proper decomposition
 * @property Latin-focused - handles Latin-based diacritics comprehensively
 * @property Preserves-case - maintains original letter casing
 */
const deburr = (
	str: string | null | undefined
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