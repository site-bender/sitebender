import not from "../../predicates/not/index.ts"

// Words that should not be capitalized in title case (except when first or last)
const TITLE_CASE_EXCEPTIONS = [
	// Articles
	"a",
	"an",
	"the",
	// Coordinating conjunctions
	"and",
	"but",
	"for",
	"nor",
	"or",
	"so",
	"yet",
	// Prepositions (common ones, typically 4 letters or fewer)
	"as",
	"at",
	"by",
	"in",
	"of",
	"on",
	"to",
	"up",
	"via",
	"with",
	"from",
	"into",
	"like",
	"near",
	"once",
	"onto",
	"over",
	"past",
	"than",
	"till",
	"upon",
	// Other common lowercase words
	"vs",
	"versus",
	"v",
	"per",
]

/**
 * Converts a string to Title Case with proper grammar rules
 *
 * Transforms a string to Title Case format following English title
 * capitalization rules. Capitalizes the first letter of major words
 * while keeping articles, conjunctions, and short prepositions lowercase
 * (except when they are the first or last word). Handles various input
 * formats including camelCase, kebab-case, snake_case, and mixed formats.
 *
 * @param s - The string to convert to Title Case
 * @returns The string in Title Case format
 * @pure - Function has no side effects
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 * @example
 * ```typescript
 * // Basic title case
 * toTitle("hello world")         // "Hello World"
 * toTitle("the lord of the rings") // "The Lord of the Rings"
 * toTitle("a tale of two cities")  // "A Tale of Two Cities"
 *
 * // Preserves articles and prepositions
 * toTitle("war and peace")       // "War and Peace"
 * toTitle("the cat in the hat")  // "The Cat in the Hat"
 * toTitle("to be or not to be")  // "To Be or Not to Be"
 *
 * // From different formats
 * toTitle("snake_case_title")    // "Snake Case Title"
 * toTitle("kebab-case-title")    // "Kebab Case Title"
 * toTitle("camelCaseTitle")      // "Camel Case Title"
 *
 * // Edge cases
 * toTitle("")                    // ""
 * toTitle("a")                   // "A" (single word always capitalized)
 * ```
 */
const toTitle = (s: string): string => {
	if (not(s)) return s

	// Handle kebab-case, snake_case, camelCase, and space-separated
	const normalized = s
		.replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase/PascalCase
		.replace(/[-_]+/g, " ") // kebab-case and snake_case
		.trim()

	const words = normalized.split(/\s+/)
	if (words.length === 0) return s

	return words
		.map((word, index) => {
			const lowerWord = word.toLowerCase()

			// Always capitalize first and last words
			if (index === 0 || index === words.length - 1) {
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
			}

			// Check if word is in exceptions list
			if (TITLE_CASE_EXCEPTIONS.includes(lowerWord)) {
				return lowerWord
			}

			// Capitalize all other words
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		})
		.join(" ")
}

export default toTitle
