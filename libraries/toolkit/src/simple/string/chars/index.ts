/**
 * Splits a string into an array of individual characters
 * 
 * Converts a string into an array where each element is a single character
 * or grapheme cluster. Uses Intl.Segmenter when available for proper
 * grapheme cluster segmentation (handles complex emojis, combining characters,
 * etc.), falling back to spread operator for basic Unicode support.
 * 
 * @param str - String to split into characters
 * @returns Array of individual characters/graphemes
 * @example
 * ```typescript
 * // Basic ASCII characters
 * chars("hello")
 * // ["h", "e", "l", "l", "o"]
 * 
 * // Empty string
 * chars("")
 * // []
 * 
 * // Single character
 * chars("a")
 * // ["a"]
 * 
 * // Numbers and symbols
 * chars("123!@#")
 * // ["1", "2", "3", "!", "@", "#"]
 * 
 * // Spaces and whitespace
 * chars("a b c")
 * // ["a", " ", "b", " ", "c"]
 * 
 * // Complex emoji (family with ZWJ)
 * chars("👨‍👩‍👧‍👦🎉")
 * // ["👨‍👩‍👧‍👦", "🎉"] (if Intl.Segmenter available)
 * // Note: Falls back to split components without Intl.Segmenter
 * 
 * // Unicode characters
 * chars("café")
 * // ["c", "a", "f", "é"]
 * 
 * // Mixed content
 * chars("Hello 世界 🌍")
 * // ["H", "e", "l", "l", "o", " ", "世", "界", " ", "🌍"]
 * 
 * // Special characters (newline and tab)
 * chars("line\nbreak\ttab")
 * // ["l", "i", "n", "e", "\n", "b", "r", "e", "a", "k", "\t", "t", "a", "b"]
 * 
 * // Combining diacritical marks
 * chars("e\u0301")  // é as e + combining acute accent
 * // ["é"] (if Intl.Segmenter available, otherwise ["e", "́"])
 * 
 * // Use for character counting
 * chars("hello").length
 * // 5
 * 
 * // Use for character manipulation
 * chars("hello").map(c => c.toUpperCase())
 * // ["H", "E", "L", "L", "O"]
 * 
 * // Use for character filtering
 * chars("h3ll0").filter(c => /[a-z]/i.test(c))
 * // ["h", "l", "l"]
 * 
 * // Use for palindrome check
 * const isPalindrome = (s: string) => {
 *   const arr = chars(s.toLowerCase())
 *   return arr.join("") === arr.reverse().join("")
 * }
 * isPalindrome("racecar")  // true
 * isPalindrome("hello")    // false
 * 
 * // Character frequency
 * chars("hello").reduce((acc, char) => {
 *   acc[char] = (acc[char] || 0) + 1
 *   return acc
 * }, {} as Record<string, number>)
 * // { h: 1, e: 1, l: 2, o: 1 }
 * 
 * // First n characters
 * chars("hello world").slice(0, 5)
 * // ["h", "e", "l", "l", "o"]
 * 
 * // Last n characters
 * chars("hello world").slice(-5)
 * // ["w", "o", "r", "l", "d"]
 * 
 * // Unique characters
 * [...new Set(chars("hello"))]
 * // ["h", "e", "l", "o"]
 * 
 * // Character positions
 * chars("hello").map((char, index) => ({ char, index }))
 * // [
 * //   { char: "h", index: 0 },
 * //   { char: "e", index: 1 },
 * //   { char: "l", index: 2 },
 * //   { char: "l", index: 3 },
 * //   { char: "o", index: 4 }
 * // ]
 * 
 * // Join with separator
 * chars("hello").join("-")
 * // "h-e-l-l-o"
 * 
 * // Character replacement
 * chars("hello").map(c => c === "l" ? "L" : c).join("")
 * // "heLLo"
 * 
 * // Handle null/undefined gracefully
 * chars(null)       // []
 * chars(undefined)  // []
 * 
 * // Multi-byte characters (e.g., Chinese)
 * chars("你好世界")
 * // ["你", "好", "世", "界"]
 * 
 * // Mathematical symbols
 * chars("∑∫∂∇")
 * // ["∑", "∫", "∂", "∇"]
 * 
 * // Currency symbols
 * chars("$€£¥₹")
 * // ["$", "€", "£", "¥", "₹"]
 * 
 * // Flag emojis (regional indicator pairs)
 * chars("🇺🇸🇬🇧🇯🇵")
 * // ["🇺🇸", "🇬🇧", "🇯🇵"] (if Intl.Segmenter available)
 * // Note: Falls back to individual indicators without Intl.Segmenter
 * 
 * // Zero-width joiner sequences
 * chars("👨‍💻👩‍🔬")
 * // ["👨‍💻", "👩‍🔬"] (if Intl.Segmenter available)
 * 
 * // Skin tone modifiers
 * chars("👋🏽👋🏿")
 * // ["👋🏽", "👋🏿"] (if Intl.Segmenter available)
 * ```
 * @property Grapheme-aware - properly handles grapheme clusters when Intl.Segmenter available
 * @property Emoji-safe - correctly handles complex emoji sequences
 * @property Array-returning - always returns an array, even for empty input
 */
const chars = (
	str: string | null | undefined
): Array<string> => {
	if (str == null || typeof str !== "string") {
		return []
	}
	
	// Use Intl.Segmenter if available for proper grapheme cluster handling
	if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
		try {
			const segmenter = new (Intl as any).Segmenter(undefined, { granularity: 'grapheme' })
			return Array.from(segmenter.segment(str), (segment: any) => segment.segment)
		} catch {
			// Fall back to spread operator if Segmenter fails
		}
	}
	
	// Fallback: Using spread operator for basic Unicode handling
	// This handles most cases but may split complex emoji sequences
	return [...str]
}

export default chars