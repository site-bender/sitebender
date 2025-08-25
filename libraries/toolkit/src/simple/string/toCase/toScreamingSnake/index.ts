import not from "../../predicates/not/index.ts"

/**
 * Converts a string to SCREAMING_SNAKE_CASE
 *
 * Transforms a string to SCREAMING_SNAKE_CASE format where words are
 * uppercase and separated by underscores. Often used for constants and
 * environment variables. Handles various input formats including camelCase,
 * PascalCase, kebab-case, space-separated, and mixed formats.
 *
 * @curried Single parameter - already curried
 * @param s - The string to convert to SCREAMING_SNAKE_CASE
 * @returns The string in SCREAMING_SNAKE_CASE format
 * @example
 * ```typescript
 * // From different formats
 * toScreamingSnake("helloWorld")    // "HELLO_WORLD"
 * toScreamingSnake("HelloWorld")    // "HELLO_WORLD"
 * toScreamingSnake("foo-bar-baz")   // "FOO_BAR_BAZ"
 * toScreamingSnake("Test Case")     // "TEST_CASE"
 * toScreamingSnake("snake_case")    // "SNAKE_CASE"
 *
 * // Mixed formats
 * toScreamingSnake("mixedCase-string") // "MIXED_CASE_STRING"
 * toScreamingSnake("API2JSON")         // "API2_JSON"
 *
 * // Already SCREAMING_SNAKE_CASE
 * toScreamingSnake("ALREADY_SCREAMING") // "ALREADY_SCREAMING"
 *
 * // Edge cases
 * toScreamingSnake("")              // ""
 * toScreamingSnake("a")             // "A"
 * toScreamingSnake("123")           // "123"
 * toScreamingSnake("___")           // "___"
 * ```
 */
const toScreamingSnake = (s: string): string => {
	if (not(s)) return s

	// Handle camelCase, PascalCase, kebab-case, and space-separated
	return s
		.replace(/([a-z])([A-Z])/g, "$1_$2") // camelCase/PascalCase
		.replace(/[-\s]+/g, "_") // kebab-case and spaces
		.toUpperCase()
}

export default toScreamingSnake
