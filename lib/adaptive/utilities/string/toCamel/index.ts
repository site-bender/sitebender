import not from "../../predicates/not/index.ts"

/**
 * Converts a string to camelCase
 * 
 * Transforms a string to camelCase format where the first word is lowercase
 * and subsequent words have their first letter capitalized, with no separators.
 * Handles various input formats including kebab-case, snake_case, space-separated,
 * and mixed formats.
 * 
 * @curried Single parameter - already curried
 * @param s - The string to convert to camelCase
 * @returns The string in camelCase format
 * @example
 * ```typescript
 * // From different formats
 * toCamel("hello-world")      // "helloWorld"
 * toCamel("foo_bar_baz")      // "fooBarBaz"
 * toCamel("test case")        // "testCase"
 * toCamel("SCREAMING_SNAKE")  // "screamingSnake"
 * toCamel("PascalCase")       // "pascalCase"
 * 
 * // Mixed separators
 * toCamel("mixed-case_string") // "mixedCaseString"
 * toCamel("one two-three_four") // "oneTwoThreeFour"
 * 
 * // Already camelCase
 * toCamel("alreadyCamelCase") // "alreadyCamelCase"
 * toCamel("simpleWord")       // "simpleword"
 * 
 * // Edge cases
 * toCamel("")                 // ""
 * toCamel("a")                // "a"
 * toCamel("--")               // ""
 * toCamel("123-456")          // "123456"
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
