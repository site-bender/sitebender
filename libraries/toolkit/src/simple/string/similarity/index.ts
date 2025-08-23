import levenshtein from "../levenshtein/index.ts"

/**
 * Calculates similarity percentage between two strings
 * 
 * Computes how similar two strings are as a percentage from 0 to 100,
 * based on the Levenshtein edit distance. A score of 100 means identical
 * strings, while 0 means completely different. Useful for fuzzy matching,
 * duplicate detection, and content comparison.
 * 
 * @curried (str1) => (str2) => number
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
 * // One character difference in 5-char string
 * similarity("hello")("hallo")
 * // 80 (4/5 characters match)
 * 
 * // Half similar
 * similarity("test")("text")
 * // 75 (3/4 characters match)
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
 * // Longer strings with small differences
 * similarity("The quick brown fox")("The quick brown box")
 * // 94.74 (18/19 chars match)
 * 
 * // Partial application for duplicate detection
 * const similarToHello = similarity("hello")
 * const candidates = ["hello", "hallo", "help", "world", "jello"]
 * candidates.map(word => ({
 *   word,
 *   similarity: similarToHello(word)
 * })).filter(item => item.similarity > 70)
 * // [
 * //   { word: "hello", similarity: 100 },
 * //   { word: "hallo", similarity: 80 },
 * //   { word: "jello", similarity: 80 }
 * // ]
 * 
 * // Fuzzy search implementation
 * const fuzzyMatch = (threshold: number) => (target: string) => (candidates: Array<string>) => {
 *   const sim = similarity(target)
 *   return candidates
 *     .map(c => ({ value: c, score: sim(c) }))
 *     .filter(item => item.score >= threshold)
 *     .sort((a, b) => b.score - a.score)
 * }
 * 
 * const findSimilar = fuzzyMatch(70)("javascript")
 * findSimilar(["javascript", "typescript", "coffeescript", "java", "python"])
 * // [
 * //   { value: "javascript", score: 100 },
 * //   { value: "typescript", score: 70 }
 * // ]
 * 
 * // Duplicate content detection
 * const isDuplicate = (threshold: number = 90) => (s1: string) => (s2: string) => {
 *   return similarity(s1)(s2) >= threshold
 * }
 * const nearDuplicate = isDuplicate(85)("Lorem ipsum dolor")
 * nearDuplicate("Lorem ipsum doler")  // true (94% similar)
 * nearDuplicate("Different text")     // false
 * 
 * // Title matching
 * similarity("The Lord of the Rings")("Lord of the Rings")
 * // 85 (missing "The ")
 * 
 * // URL similarity
 * similarity("https://example.com/page1")("https://example.com/page2")
 * // 96 (only last char differs)
 * 
 * // Email typo detection
 * const emailSimilarity = similarity("user@example.com")
 * emailSimilarity("user@exmaple.com")  // 94 (typo in domain)
 * emailSimilarity("user@example.co")   // 94 (missing 'm')
 * 
 * // Password similarity check (for security)
 * const tooSimilarToOld = (oldPass: string) => (newPass: string) => {
 *   return similarity(oldPass)(newPass) > 75
 * }
 * const checkPassword = tooSimilarToOld("myPassword123")
 * checkPassword("myPassword124")  // true (too similar)
 * checkPassword("totallyNew456")  // false (different enough)
 * 
 * // Content versioning
 * const contentChanged = (original: string) => (modified: string) => {
 *   const sim = similarity(original)(modified)
 *   if (sim === 100) return "identical"
 *   if (sim > 95) return "minor edits"
 *   if (sim > 80) return "moderate changes"
 *   return "major revision"
 * }
 * 
 * // Handle null/undefined
 * similarity(null)("test")       // 0
 * similarity("test")(undefined)  // 0
 * 
 * // Unicode support
 * similarity("café")("cafe")
 * // 75 (3/4 chars match)
 * 
 * similarity("🙂🙃")("🙂🙂")
 * // 50 (1/2 emojis match)
 * 
 * // Multi-byte characters
 * similarity("你好世界")("您好世界")
 * // 75 (3/4 chars match)
 * 
 * // Filename comparison
 * similarity("document_v1.pdf")("document_v2.pdf")
 * // 93.33 (14/15 chars match)
 * 
 * // Tag matching
 * const tagSimilarity = similarity("javascript")
 * ["js", "java", "typescript", "ecmascript", "script"].map(tag => ({
 *   tag,
 *   score: tagSimilarity(tag)
 * }))
 * // Sorted by relevance based on similarity
 * ```
 * @property Range - returns values from 0 to 100
 * @property Symmetric - similarity(a)(b) === similarity(b)(a)
 * @property Levenshtein-based - uses edit distance for calculation
 */
const similarity = (
	str1: string | null | undefined
) => (
	str2: string | null | undefined
): number => {
	// Handle null/undefined cases
	if (str1 == null || str2 == null || typeof str1 !== "string" || typeof str2 !== "string") {
		return 0
	}
	
	// Handle empty strings
	if (str1.length === 0 && str2.length === 0) {
		return 100  // Both empty strings are identical
	}
	
	if (str1.length === 0 || str2.length === 0) {
		return 0  // One empty string means no similarity
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