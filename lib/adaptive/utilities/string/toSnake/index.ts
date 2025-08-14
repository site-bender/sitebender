import not from "../../predicates/not/index.ts"

/**
 * Converts a string to snake_case
 * 
 * @param s - The string to convert to snake_case
 * @returns The string in snake_case format
 * @example
 * ```typescript
 * toSnake("helloWorld") // "hello_world"
 * toSnake("foo-bar-baz") // "foo_bar_baz"
 * toSnake("Test Case") // "test_case"
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