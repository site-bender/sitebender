import type { Either } from "../../../types/either/index.ts"
import { left, right } from "../../../types/either/index.ts"
import wordsUnsafe from "../../../unsafe/string/words/index.ts"

export interface WordsError extends Error {
	name: "WordsError"
	input: unknown
}

/**
 * Safely splits a string into an array of words
 * 
 * Safe version that returns Either<WordsError, Array<string>>.
 * Intelligently identifies word boundaries in various formats including
 * camelCase, PascalCase, snake_case, kebab-case, and regular sentences.
 * 
 * @curried Single parameter - already curried
 * @param str - String to split into words
 * @returns Either with array of words or error
 * @example
 * ```typescript
 * // Success cases
 * words("camelCase")          // Right(["camel", "Case"])
 * words("XMLHttpRequest")     // Right(["XML", "Http", "Request"])
 * words("snake_case_example") // Right(["snake", "case", "example"])
 * 
 * // Handles null/undefined safely
 * words(null)                 // Right([])
 * words(undefined)            // Right([])
 * 
 * // Type validation
 * words(123)                  // Left(WordsError: "Input must be a string")
 * 
 * // Use with pipeline
 * import { pipeEither, map } from "../../../types/either/index.ts"
 * 
 * const processIdentifier = pipeEither(
 *   words,
 *   map(words => words.map(w => w.toLowerCase())),
 *   map(words => words.join("-"))
 * )
 * 
 * processIdentifier("getUserById") // Right("get-user-by-id")
 * ```
 */
const words = (str: unknown): Either<WordsError, Array<string>> => {
	try {
		// Allow null/undefined (returns empty array)
		if (str == null) {
			return right([])
		}
		
		// Validate input type
		if (typeof str !== "string") {
			const error: WordsError = {
				name: "WordsError",
				message: `Input must be a string, got ${typeof str}`,
				input: str
			} as WordsError
			return left(error)
		}
		
		const result = wordsUnsafe(str)
		return right(result)
	} catch (err) {
		const error: WordsError = {
			name: "WordsError",
			message: err instanceof Error ? err.message : String(err),
			input: str
		} as WordsError
		return left(error)
	}
}

export default words