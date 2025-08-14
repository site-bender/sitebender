import not from "../../predicates/not/index.ts"

/**
 * Converts a string to kebab-case
 * 
 * @param s - The string to convert to kebab-case
 * @returns The string in kebab-case format
 * @example
 * ```typescript
 * toKebab("helloWorld") // "hello-world"
 * toKebab("foo_bar_baz") // "foo-bar-baz"
 * toKebab("Test Case") // "test-case"
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