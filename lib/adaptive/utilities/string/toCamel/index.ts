import not from "../../predicates/not/index.ts"

/**
 * Converts a string to camelCase
 * 
 * @param s - The string to convert to camelCase
 * @returns The string in camelCase format
 * @example
 * ```typescript
 * toCamel("hello-world") // "helloWorld"
 * toCamel("foo_bar_baz") // "fooBarBaz"
 * toCamel("test case") // "testCase"
 * ```
 */
const toCamel = (s: string): string => {
	if (not(s)) return s

	// Handle kebab-case, snake_case, and space-separated
	const words = s.split(/[-_\s]+/)
	if (words.length === 0) return s

	const [first, ...rest] = words
	const camelCased = [
		first.toLowerCase(),
		...rest.map((word) =>
			word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		),
	]

	return camelCased.join("")
}

export default toCamel
