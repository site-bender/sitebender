import words from "../../words/index.ts"

/**
 * Converts a string to camelCase
 *
 * Transforms a string to camelCase format where the first word is lowercase
 * and subsequent words have their first letter capitalized, with no separators.
 * Handles various input formats including kebab-case, snake_case, space-separated,
 * and mixed formats.
 *
 * @param s - The string to convert to camelCase
 * @returns The string in camelCase format
 * @pure - Function has no side effects
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 * @idempotent - f(f(x)) = f(x)
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
 * toCamel("simpleword")       // "simpleword"
 *
 * // Edge cases
 * toCamel("")                 // ""
 * toCamel("a")                // "a"
 * toCamel("--")               // ""
 * toCamel("123-456")          // "123456"
 * ```
 */
const toCamel = (str: string | null | undefined): string => {
	const wordList = words(str)

	if (wordList.length === 0) {
		return ""
	}

	const [first, ...rest] = wordList

	return [
		first.toLowerCase(),
		...rest.map((word) =>
			word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		),
	].join("")
}

export default toCamel
