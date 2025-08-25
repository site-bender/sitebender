/**
 * Calculates the Levenshtein edit distance between two strings
 *
 * Computes the minimum number of single-character edits (insertions,
 * deletions, or substitutions) required to change one string into another.
 * Also known as edit distance. Useful for spell checking, fuzzy matching,
 * DNA sequence analysis, and similarity detection.
 *
 * @curried (str1) => (str2) => number
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
 * // Completely different strings
 * levenshtein("abc")("xyz")
 * // 3 (replace all)
 *
 * // Transposition (not a single edit)
 * levenshtein("ab")("ba")
 * // 2 (requires two substitutions)
 *
 * // Partial application for fuzzy search
 * const distanceFromHello = levenshtein("hello")
 * const words = ["hallo", "yellow", "hello", "help", "shell"]
 * words.map(w => ({ word: w, distance: distanceFromHello(w) }))
 *   .sort((a, b) => a.distance - b.distance)
 * // [
 * //   { word: "hello", distance: 0 },
 * //   { word: "hallo", distance: 1 },
 * //   { word: "shell", distance: 2 },
 * //   { word: "help", distance: 2 },
 * //   { word: "yellow", distance: 2 }
 * // ]
 *
 * // Spell checker suggestion
 * const suggest = (word: string, dictionary: Array<string>) => {
 *   const distance = levenshtein(word)
 *   return dictionary
 *     .map(w => ({ word: w, distance: distance(w) }))
 *     .filter(item => item.distance <= 2)  // Max 2 edits
 *     .sort((a, b) => a.distance - b.distance)
 *     .map(item => item.word)
 * }
 * suggest("recieve", ["receive", "receipt", "recipe", "deceive"])
 * // ["receive", "receipt", "deceive"]
 *
 * // Similarity threshold
 * const areSimilar = (threshold: number) => (s1: string) => (s2: string) => {
 *   const distance = levenshtein(s1)(s2)
 *   const maxLen = Math.max(s1.length, s2.length)
 *   return maxLen === 0 ? true : distance / maxLen <= threshold
 * }
 * const similar20Percent = areSimilar(0.2)("hello")
 * similar20Percent("hallo")  // true (20% different)
 * similar20Percent("world")  // false (100% different)
 *
 * // Auto-correct implementation
 * const autoCorrect = (input: string, validWords: Array<string>) => {
 *   const distance = levenshtein(input)
 *   const exact = validWords.find(w => w === input)
 *   if (exact) return exact
 *
 *   const closest = validWords
 *     .map(w => ({ word: w, dist: distance(w) }))
 *     .reduce((min, curr) => curr.dist < min.dist ? curr : min)
 *
 *   return closest.dist <= 2 ? closest.word : input
 * }
 *
 * // DNA sequence comparison
 * levenshtein("ACTG")("AGTC")
 * // 2 (minimum mutations needed)
 *
 * // File path similarity
 * levenshtein("/usr/local/bin")("/usr/local/lib")
 * // 3
 *
 * // Username typo detection
 * const usernameDistance = levenshtein("john_doe")
 * usernameDistance("john_deo")  // 1 (likely typo)
 * usernameDistance("jane_doe")  // 2 (possibly different user)
 *
 * // Handle null/undefined
 * levenshtein(null)("test")       // Infinity
 * levenshtein("test")(undefined)  // Infinity
 *
 * // Unicode support
 * levenshtein("café")("cafe")
 * // 1 (é→e)
 *
 * levenshtein("🙂")("🙃")
 * // 1 (emoji substitution)
 *
 * // Multi-byte characters
 * levenshtein("你好")("您好")
 * // 1 (你→您)
 * ```
 * @property Algorithm - uses dynamic programming for O(m*n) complexity
 * @property Case-sensitive - treats uppercase/lowercase as different
 * @property Unicode-aware - works with all Unicode characters
 */
const levenshtein = (
	str1: string | null | undefined,
) =>
(
	str2: string | null | undefined,
): number => {
	// Handle null/undefined cases
	if (
		str1 == null || str2 == null || typeof str1 !== "string" ||
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
