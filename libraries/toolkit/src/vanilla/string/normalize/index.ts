import isNullish from "../../validation/isNullish/index.ts"

/**
 * Normalizes Unicode characters in a string
 *
 * Converts a string to a normalized Unicode form (NFC, NFD, NFKC, or NFKD).
 * This is essential for consistent string comparison, searching, and storage
 * when dealing with Unicode text that may have multiple representations of
 * the same character. Default form is NFC (Canonical Composition).
 *
 * @param form - Unicode normalization form: "NFC" | "NFD" | "NFKC" | "NFKD" (default: "NFC")
 * @param str - String to normalize
 * @returns Normalized string
 * @example
 * ```typescript
 * // Default NFC normalization (composed form)
 * normalize()("é")  // "é" (U+00E9)
 *
 * // NFD normalization (decomposed form)
 * normalize("NFD")("é")  // "é" (U+0065 + U+0301: e + combining accent)
 *
 * // String comparison consistency
 * const composed = "é"
 * const decomposed = "e\u0301"
 * composed === decomposed  // false
 * normalize()(composed) === normalize()(decomposed)  // true
 *
 * // NFKC normalization (compatibility composition)
 * normalize("NFKC")("ﬁ")  // "fi" (ligature to separate letters)
 * normalize("NFKC")("①")   // "1" (circled to plain digit)
 *
 * // Handle null/undefined gracefully
 * normalize()(null)       // ""
 * normalize()(undefined)  // ""
 *
 * // Partial application
 * const toNFC = normalize("NFC")
 * const toNFKC = normalize("NFKC")
 * toNFC("café")   // Composed form
 * toNFKC("Ｈｅｌｌｏ")  // "Hello" (full-width to ASCII)
 *
 * // String comparison utility
 * const compare = (a: string, b: string) => normalize()(a) === normalize()(b)
 * compare("café", "cafe\u0301")  // true
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 */
const normalize = (
	form: "NFC" | "NFD" | "NFKC" | "NFKD" | null | undefined = "NFC",
) =>
(
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
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
