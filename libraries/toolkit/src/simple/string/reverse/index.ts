import isNullish from "../../validation/isNullish/index.ts"

/**
 * Reverses the characters in a string
 *
 * Returns a new string with the characters in reverse order. This function
 * properly handles Unicode characters, including emojis and combining
 * characters, when Intl.Segmenter is available. Falls back to basic
 * reversal for simpler cases. Useful for palindrome checking, text effects,
 * or string manipulation puzzles.
 *
 * @pure
 * @immutable
 * @safe
 * @param str - String to reverse
 * @returns String with characters in reverse order
 * @example
 * ```typescript
 * // Basic reversal
 * reverse("hello")       // "olleh"
 *
 * // Single character
 * reverse("a")           // "a"
 *
 * // Empty string
 * reverse("")            // ""
 *
 * // Numbers and symbols
 * reverse("123!@#")      // "#@!321"
 *
 * // Spaces preserved
 * reverse("hello world") // "dlrow olleh"
 *
 * // Unicode characters
 * reverse("Hello 世界")  // "界世 olleH"
 *
 * // Emojis (properly handled with Intl.Segmenter)
 * reverse("Hello 🌍")    // "🌍 olleH"
 *
 * // Palindrome checking
 * const isPalindrome = (s: string) => {
 *   const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "")
 *   return clean === reverse(clean)
 * }
 * isPalindrome("racecar") // true
 * ```
 */
const reverse = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string") {
		return ""
	}

	if (str.length <= 1) {
		return str
	}

	// Use Intl.Segmenter if available for proper grapheme cluster handling
	if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
		try {
			const segmenter = new (Intl as any).Segmenter(undefined, {
				granularity: "grapheme",
			})
			const graphemes = Array.from(
				segmenter.segment(str),
				(segment: any) => segment.segment,
			)
			return graphemes.reverse().join("")
		} catch {
			// Fall back to spread operator if Segmenter fails
		}
	}

	// Fallback: Using spread operator for basic Unicode handling
	// This handles most cases but may split complex emoji sequences
	return [...str].reverse().join("")
}

export default reverse
