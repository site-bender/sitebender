import levenshtein from "../levenshtein/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates similarity percentage between two strings
 *
 * Computes how similar two strings are as a percentage from 0 to 100,
 * based on the Levenshtein edit distance. A score of 100 means identical
 * strings, while 0 means completely different. Useful for fuzzy matching,
 * duplicate detection, and content comparison.
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 * @param str1 - First string to compare
 * @param str2 - Second string to compare
 * @returns Similarity percentage (0-100)
 * @example
 * ```typescript
 * // Identical strings
 * similarity("hello")("hello")
 * // 100
 *
 * // Completely different strings
 * similarity("abc")("xyz")
 * // 0
 *
 * // One character difference
 * similarity("hello")("hallo")
 * // 80 (4/5 characters match)
 *
 * // Empty strings
 * similarity("")("")
 * // 100 (both empty = identical)
 *
 * similarity("hello")("")
 * // 0 (one empty = no similarity)
 *
 * // Case sensitive comparison
 * similarity("Hello")("hello")
 * // 80 (only first char differs)
 *
 * // Partial application for fuzzy matching
 * const similarToHello = similarity("hello")
 * const candidates = ["hello", "hallo", "help", "world", "jello"]
 * const matches = candidates
 *   .map(word => ({ word, score: similarToHello(word) }))
 *   .filter(item => item.score > 70)
 * // [{ word: "hello", score: 100 }, { word: "hallo", score: 80 }]
 *
 * // Handle null/undefined
 * similarity(null)("test")       // 0
 * similarity("test")(undefined)  // 0
 * ```
 */
const similarity = (
	str1: string | null | undefined,
) =>
(
	str2: string | null | undefined,
): number => {
	// Handle null/undefined cases
	if (
		isNullish(str1) || isNullish(str2) || typeof str1 !== "string" ||
		typeof str2 !== "string"
	) {
		return 0
	}

	// Handle empty strings
	if (str1.length === 0 && str2.length === 0) {
		return 100 // Both empty strings are identical
	}

	if (str1.length === 0 || str2.length === 0) {
		return 0 // One empty string means no similarity
	}

	// Calculate Levenshtein distance
	const distance = levenshtein(str1)(str2)

	// Handle the edge case where distance might be Infinity
	if (!isFinite(distance)) {
		return 0
	}

	// Calculate similarity as percentage
	// Similarity = (1 - (distance / maxLength)) * 100
	const maxLength = Math.max(str1.length, str2.length)
	const similarityRatio = 1 - (distance / maxLength)

	// Convert to percentage and ensure it's in range [0, 100]
	const percentage = Math.max(0, Math.min(100, similarityRatio * 100))

	// Round to 2 decimal places for cleaner output
	return Math.round(percentage * 100) / 100
}

export default similarity
