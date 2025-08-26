/**
 * Counts the number of occurrences of a pattern in a string
 *
 * Counts how many times a substring or regular expression pattern appears
 * in a string. For string patterns, it counts non-overlapping occurrences.
 * For regex patterns, ensure the global flag is set for multiple matches.
 * Returns 0 for null/undefined inputs or if no matches are found.
 *
 * @param pattern - String or RegExp pattern to count
 * @param str - String to search within
 * @returns Number of matches found
 * @example
 * ```typescript
 * // Basic usage
 * countMatches("l")("hello world")
 * // 3
 *
 * countMatches("the")("the quick brown fox jumps over the lazy dog")
 * // 2
 *
 * // Case sensitive
 * countMatches("The")("the quick brown fox jumps over the lazy dog")
 * // 0
 *
 * // Empty pattern
 * countMatches("")("hello")
 * // 6 (before each char and after last)
 *
 * // Regex patterns
 * countMatches(/[aeiou]/gi)("hello world")
 * // 3 (e, o, o)
 *
 * countMatches(/\bthe\b/gi)("The theme of the movie")
 * // 2 ("The" and "the", not "theme")
 *
 * // Non-overlapping matches
 * countMatches("aa")("aaaa")
 * // 2 (matches at positions 0-1 and 2-3)
 *
 * // Unicode characters
 * countMatches("😊")("Hello 😊 World 😊!")
 * // 2
 *
 * // Partial application
 * const countVowels = countMatches(/[aeiou]/gi)
 * countVowels("hello")     // 2
 * countVowels("world")     // 1
 *
 * // Character frequency analysis  
 * const text = "hello world"
 * const chars = ["h", "e", "l", "o", "w", "r", "d"]
 * const frequencies = chars.map(c => ({
 *   char: c,
 *   count: countMatches(c)(text)
 * }))
 * // [{ char: "h", count: 1 }, { char: "e", count: 1 }, ...]
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 */
const countMatches = (
	pattern: string | RegExp | null | undefined,
) =>
(
	str: string | null | undefined,
): number => {
	if (str == null || typeof str !== "string") {
		return 0
	}

	if (pattern == null) {
		return 0
	}

	if (typeof pattern === "string") {
		if (pattern === "") {
			// Empty string matches at every position including end
			return str.length + 1
		}

		// Count non-overlapping occurrences of the substring
		let count = 0
		let index = 0

		while ((index = str.indexOf(pattern, index)) !== -1) {
			count++
			index += pattern.length
		}

		return count
	}

	if (pattern instanceof RegExp) {
		// Create a new regex with global flag if not present
		const globalPattern = pattern.global
			? pattern
			: new RegExp(pattern.source, pattern.flags + "g")

		const matches = str.match(globalPattern)
		return matches ? matches.length : 0
	}

	return 0
}

export default countMatches
