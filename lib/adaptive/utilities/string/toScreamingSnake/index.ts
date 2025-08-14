import not from "../../predicates/not/index.ts"

/**
 * Converts a string to SCREAMING_SNAKE_CASE
 * 
 * @param s - The string to convert to SCREAMING_SNAKE_CASE
 * @returns The string in SCREAMING_SNAKE_CASE format
 * @example
 * ```typescript
 * toScreamingSnake("helloWorld") // "HELLO_WORLD"
 * toScreamingSnake("foo-bar-baz") // "FOO_BAR_BAZ"
 * toScreamingSnake("Test Case") // "TEST_CASE"
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