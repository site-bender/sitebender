/**
 * Counts the number of occurrences of a pattern in a string
 *
 * Counts how many times a substring or regular expression pattern appears
 * in a string. For string patterns, it counts non-overlapping occurrences.
 * For regex patterns, ensure the global flag is set for multiple matches.
 * Returns 0 for null/undefined inputs or if no matches are found.
 *
 * @curried (pattern) => (str) => number
 * @param pattern - String or RegExp pattern to count
 * @param str - String to search within
 * @returns Number of matches found
 * @example
 * ```typescript
 * // Count substring occurrences
 * countMatches("l")("hello world")
 * // 3
 *
 * // Count word occurrences
 * countMatches("the")("the quick brown fox jumps over the lazy dog")
 * // 2
 *
 * // Case sensitive
 * countMatches("The")("the quick brown fox jumps over the lazy dog")
 * // 0
 *
 * // No matches
 * countMatches("xyz")("hello world")
 * // 0
 *
 * // Empty pattern (matches at every position including end)
 * countMatches("")("hello")
 * // 6 (before each char and after last)
 *
 * // Empty string
 * countMatches("a")("")
 * // 0
 *
 * // Regex pattern with global flag
 * countMatches(/[aeiou]/g)("hello world")
 * // 3 (e, o, o)
 *
 * // Regex without global flag (auto-adds global flag)
 * countMatches(/[aeiou]/)("hello world")
 * // 3 (e, o, o - global flag is added automatically)
 *
 * // Word boundary regex
 * countMatches(/\bthe\b/gi)("The theme of the movie")
 * // 2 ("The" and "the", not "theme")
 *
 * // Digit counting
 * countMatches(/\d/g)("abc123def456")
 * // 6
 *
 * // Non-overlapping matches
 * countMatches("aa")("aaaa")
 * // 2 (matches at positions 0-1 and 2-3)
 *
 * // Overlapping scenario (still non-overlapping)
 * countMatches("aba")("abababa")
 * // 2 (positions 0-2 and 4-6)
 *
 * // Special characters
 * countMatches("$")("Price: $100, Cost: $50")
 * // 2
 *
 * // Newline counting
 * countMatches("\n")("line1\nline2\nline3")
 * // 2
 *
 * // Tab counting
 * countMatches("\t")("col1\tcol2\tcol3")
 * // 2
 *
 * // Unicode characters
 * countMatches("😊")("Hello 😊 World 😊!")
 * // 2
 *
 * // Chinese characters
 * countMatches("好")("你好世界，好的")
 * // 2
 *
 * // Partial application for analysis
 * const countVowels = countMatches(/[aeiou]/gi)
 * countVowels("hello")     // 2
 * countVowels("world")     // 1
 * countVowels("rhythm")    // 0
 *
 * // Count specific words
 * const countThe = countMatches(/\bthe\b/gi)
 * countThe("The cat in the hat")     // 2
 * countThe("There is something")     // 0
 *
 * // Email pattern counting
 * const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
 * countMatches(emailPattern)("Contact: john@example.com or jane@test.org")
 * // 2
 *
 * // URL counting
 * const urlPattern = /https?:\/\/[^\s]+/g
 * countMatches(urlPattern)("Visit https://example.com and http://test.org")
 * // 2
 *
 * // Phone number pattern
 * const phonePattern = /\b\d{3}-\d{3}-\d{4}\b/g
 * countMatches(phonePattern)("Call 555-123-4567 or 555-987-6543")
 * // 2
 *
 * // Sentence counting (simple)
 * countMatches(/[.!?]/g)("Hello. How are you? I'm fine!")
 * // 3
 *
 * // Word counting (simple)
 * countMatches(/\b\w+\b/g)("Hello world, how are you?")
 * // 5
 *
 * // Hashtag counting
 * countMatches(/#\w+/g)("Check out #javascript and #typescript #coding")
 * // 3
 *
 * // Mention counting
 * countMatches(/@\w+/g)("Thanks @john and @jane for the help")
 * // 2
 *
 * // Line counting
 * const countLines = (s: string) => countMatches("\n")(s) + 1
 * countLines("line1\nline2\nline3")
 * // 3
 *
 * // Character frequency analysis
 * const text = "hello world"
 * const chars = ["h", "e", "l", "o", "w", "r", "d"]
 * const frequencies = chars.map(c => ({
 *   char: c,
 *   count: countMatches(c)(text)
 * }))
 * // [
 * //   { char: "h", count: 1 },
 * //   { char: "e", count: 1 },
 * //   { char: "l", count: 3 },
 * //   { char: "o", count: 2 },
 * //   { char: "w", count: 1 },
 * //   { char: "r", count: 1 },
 * //   { char: "d", count: 1 }
 * // ]
 *
 * // Handle null/undefined gracefully
 * countMatches("test")(null)       // 0
 * countMatches("test")(undefined)  // 0
 * countMatches(null)("test")       // 0
 * countMatches(undefined)("test")  // 0
 *
 * // Case-insensitive substring count
 * const countWordIgnoreCase = (word: string) =>
 *   countMatches(new RegExp(word, "gi"))
 * countWordIgnoreCase("the")("The theme of THE movie")
 * // 3 (matches "The", "the" in "theme", and "THE")
 *
 * // SQL keyword detection
 * const sqlKeywords = ["SELECT", "FROM", "WHERE", "JOIN"]
 * const query = "SELECT * FROM users WHERE id = 1"
 * sqlKeywords.map(kw => countMatches(kw)(query))
 * // [1, 1, 1, 0]
 * ```
 * @property Non-overlapping - counts don't overlap for string patterns
 * @property Regex-aware - supports regular expressions with flags
 * @property Zero-default - returns 0 for null/undefined or no matches
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
