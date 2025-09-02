import not from "../../predicates/not/index.ts"

/**
 * Converts a string to snake_case
 *
 * Transforms a string to snake_case format where words are lowercase
 * and separated by underscores. Handles various input formats including
 * camelCase, PascalCase, kebab-case, space-separated, and mixed formats.
 *
 * @param s - The string to convert to snake_case
 * @returns The string in snake_case format
 * @pure - Function has no side effects
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 * @idempotent - f(f(x)) = f(x)
 * @example
 * ```typescript
 * // From different formats
 * toSnake("helloWorld")       // "hello_world"
 * toSnake("HelloWorld")       // "hello_world"
 * toSnake("foo-bar-baz")      // "foo_bar_baz"
 * toSnake("Test Case")        // "test_case"
 * toSnake("SCREAMING-KEBAB")  // "screaming_kebab"
 *
 * // Mixed formats
 * toSnake("mixedCase-string") // "mixed_case_string"
 *
 * // Already snake_case
 * toSnake("already_snake")    // "already_snake"
 *
 * // Edge cases
 * toSnake("")                 // ""
 * toSnake("123")              // "123"
 * ```
 */
const toSnake = (s: string): string => {
	if (not(s)) return s

	// Handle camelCase, PascalCase, kebab-case, and space-separated
	return s
		.replace(/([a-z])([A-Z])/g, "$1_$2") // camelCase/PascalCase
		.replace(/[-\s]+/g, "_") // kebab-case and spaces
		.toLowerCase()
}

export default toSnake
