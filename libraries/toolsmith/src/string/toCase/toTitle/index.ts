import not from "../../../validation/not/index.ts"

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

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
				return word.charAt(0).toUpperCase() +
					word.slice(1).toLowerCase()
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
