import isNullish from "../../validation/isNullish/index.ts"

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
 * // Basic usage
 * chars("hello")
 * // ["h", "e", "l", "l", "o"]
 *
 * chars("")
 * // []
 *
 * chars("123!@#")
 * // ["1", "2", "3", "!", "@", "#"]
 *
 * // Complex emoji
 * chars("👨‍👩‍👧‍👦🎉")
 * // ["👨‍👩‍👧‍👦", "🎉"] (with Intl.Segmenter)
 *
 * // Unicode handling
 * chars("café")
 * // ["c", "a", "f", "é"]
 *
 * chars("你好世界")
 * // ["你", "好", "世", "界"]
 *
 * // Use with array methods
 * chars("hello").map(c => c.toUpperCase())
 * // ["H", "E", "L", "L", "O"]
 *
 * chars("hello").filter(c => c !== "l")
 * // ["h", "e", "o"]
 * ```
 * @pure
 * @immutable
 * @safe
 */
const chars = (
	str: string | null | undefined,
): Array<string> => {
	if (isNullish(str) || typeof str !== "string") {
		return []
	}

	// Use Intl.Segmenter if available for proper grapheme cluster handling
	if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
		try {
			const segmenter = new (Intl as any).Segmenter(undefined, {
				granularity: "grapheme",
			})
			return Array.from(
				segmenter.segment(str),
				(segment: any) => segment.segment,
			)
		} catch {
			// Fall back to spread operator if Segmenter fails
		}
	}

	// Fallback: Using spread operator for basic Unicode handling
	// This handles most cases but may split complex emoji sequences
	return [...str]
}

export default chars
