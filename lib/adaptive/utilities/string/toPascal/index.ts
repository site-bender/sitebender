import not from "../../predicates/not/index.ts"

/**
 * Converts a string to PascalCase
 * 
 * @param s - The string to convert to PascalCase
 * @returns The string in PascalCase format
 * @example
 * ```typescript
 * toPascal("hello-world") // "HelloWorld"
 * toPascal("foo_bar_baz") // "FooBarBaz"
 * toPascal("test case") // "TestCase"
 * ```
 */
const toPascal = (s: string): string => {
	if (not(s)) return s

	// Handle kebab-case, snake_case, and space-separated
	const words = s.split(/[-_\s]+/)
	if (words.length === 0) return s

	return words
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join("")
}

export default toPascal