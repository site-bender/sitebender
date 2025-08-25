import not from "../../predicates/not/index.ts"

/**
 * Converts a string to kebab-case
 *
 * Transforms a string to kebab-case format where words are lowercase
 * and separated by hyphens. Handles various input formats including
 * camelCase, PascalCase, snake_case, space-separated, and mixed formats.
 *
 * @curried Single parameter - already curried
 * @param s - The string to convert to kebab-case
 * @returns The string in kebab-case format
 * @example
 * ```typescript
 * // From different formats
 * toKebab("helloWorld")       // "hello-world"
 * toKebab("HelloWorld")       // "hello-world"
 * toKebab("foo_bar_baz")      // "foo-bar-baz"
 * toKebab("Test Case")        // "test-case"
 * toKebab("SCREAMING_SNAKE")  // "screaming-snake"
 *
 * // Mixed formats
 * toKebab("mixedCase_string") // "mixed-case-string"
 * toKebab("XML2JSON")         // "xml2-json"
 *
 * // Already kebab-case
 * toKebab("already-kebab")    // "already-kebab"
 *
 * // Edge cases
 * toKebab("")                 // ""
 * toKebab("a")                // "a"
 * toKebab("123")              // "123"
 * toKebab("---")              // "---"
 * ```
 */
const toKebab = (s: string): string => {
	if (not(s)) return s

	// Handle camelCase, PascalCase, snake_case, and space-separated
	return s
		.replace(/([a-z])([A-Z])/g, "$1-$2") // camelCase/PascalCase
		.replace(/[\s_]+/g, "-") // spaces and underscores
		.toLowerCase()
}

export default toKebab
