import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the Levenshtein edit distance between two strings
 *
 * Computes the minimum number of single-character edits (insertions,
 * deletions, or substitutions) required to change one string into another.
 * Also known as edit distance. Useful for spell checking, fuzzy matching,
 * DNA sequence analysis, and similarity detection.
 *
 * @param str1 - First string to compare
 * @param str2 - Second string to compare
 * @returns Minimum edit distance between the strings
 * @example
 * ```typescript
 * // Identical strings
 * levenshtein("hello")("hello")
 * // 0
 *
 * // One character difference
 * levenshtein("hello")("hallo")
 * // 1 (substitute e with a)
 *
 * // One character insertion
 * levenshtein("hello")("helllo")
 * // 1 (insert l)
 *
 * // One character deletion
 * levenshtein("hello")("helo")
 * // 1 (delete l)
 *
 * // Multiple changes
 * levenshtein("kitten")("sitting")
 * // 3 (k→s, e→i, insert g)
 *
 * // Empty strings
 * levenshtein("")("")
 * // 0
 *
 * levenshtein("hello")("")
 * // 5 (delete all 5 characters)
 *
 * levenshtein("")("world")
 * // 5 (insert all 5 characters)
 *
 * // Case sensitive
 * levenshtein("Hello")("hello")
 * // 1 (H→h)
 *
 * // Partial application for fuzzy search
 * const distanceFromHello = levenshtein("hello")
 * const words = ["hallo", "hello", "help", "shell"]
 * const results = words.map(w => ({ word: w, distance: distanceFromHello(w) }))
 *   .sort((a, b) => a.distance - b.distance)
 * // [{ word: "hello", distance: 0 }, { word: "hallo", distance: 1 }, ...]
 *
 * // Handle null/undefined
 * levenshtein(null)("test")       // Infinity
 * levenshtein("test")(undefined)  // Infinity
 * ```
 * @pure - Function has no side effects
 * @curried - Function is curried for partial application
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 */
const levenshtein = (
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
		return Infinity
	}

	// Handle empty strings
	if (str1.length === 0) return str2.length
	if (str2.length === 0) return str1.length

	// Create matrix for dynamic programming
	// We only need two rows at a time, so optimize space
	const prevRow = new Array(str2.length + 1)
	const currRow = new Array(str2.length + 1)

	// Initialize first row (transforming empty string to str2)
	for (let j = 0; j <= str2.length; j++) {
		prevRow[j] = j
	}

	// Fill the matrix
	for (let i = 1; i <= str1.length; i++) {
		// First column (transforming empty string to str1[0..i])
		currRow[0] = i

		for (let j = 1; j <= str2.length; j++) {
			// Cost of substitution (0 if characters match, 1 if different)
			const cost = str1[i - 1] === str2[j - 1] ? 0 : 1

			// Take minimum of:
			// - Deletion: prevRow[j] + 1
			// - Insertion: currRow[j - 1] + 1
			// - Substitution: prevRow[j - 1] + cost
			currRow[j] = Math.min(
				prevRow[j] + 1, // deletion
				currRow[j - 1] + 1, // insertion
				prevRow[j - 1] + cost, // substitution
			)
		}

		// Swap rows for next iteration
		for (let j = 0; j <= str2.length; j++) {
			prevRow[j] = currRow[j]
		}
	}

	// The final answer is in the last cell
	return currRow[str2.length]
}

export default levenshtein
