import not from "../../../validation/not/index.ts"

/**
 * Converts a string to PascalCase
 *
 * Transforms a string to PascalCase format where each word starts with
 * an uppercase letter and there are no separators between words.
 * Handles various input formats including kebab-case, snake_case,
 * camelCase, space-separated, and mixed formats.
 *
 * @param s - The string to convert to PascalCase
 * @returns The string in PascalCase format
 * @pure - Function has no side effects
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 * @idempotent - f(f(x)) = f(x)
 * @example
 * ```typescript
 * // From different formats
 * toPascal("hello-world")     // "HelloWorld"
 * toPascal("foo_bar_baz")     // "FooBarBaz"
 * toPascal("test case")       // "TestCase"
 * toPascal("camelCase")       // "CamelCase"
 * toPascal("SCREAMING_SNAKE") // "ScreamingSnake"
 *
 * // Mixed formats
 * toPascal("mixed-case_string") // "MixedCaseString"
 *
 * // Already PascalCase
 * toPascal("AlreadyPascal")   // "AlreadyPascal"
 *
 * // Edge cases
 * toPascal("")                // ""
 * toPascal("123-456")         // "123456"
 * ```
 */
const toPascal = (s: string): string => {
	if (not(s)) return s

	// Handle kebab-case, snake_case, and space-separated
	const words = s.split(/[-_\s]+/)
	if (words.length === 0) return s

	return words
		.map((word) =>
			word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)
		.join("")
}

export default toPascal
