import type { ReplacerFunction } from "../../../types/string/index.ts"

/**
 * Replaces the first occurrence of a pattern in a string
 *
 * Searches for the first match of the search pattern and replaces it with
 * the replacement value. The search can be a string literal or a regular
 * expression. The replacement can be a string or a function that computes
 * the replacement. Only the first match is replaced unless using a global
 * regex.
 *
 * @curried (searchValue) => (replaceValue) => (str) => result
 * @param searchValue - String or RegExp pattern to search for
 * @param replaceValue - String or function to compute the replacement
 * @param str - The string to perform replacement on
 * @returns New string with the first match replaced
 * @example
 * ```typescript
 * // Basic string replacement
 * replace("foo")("bar")("foo baz foo") // "bar baz foo"
 * replace("hello")("hi")("hello world") // "hi world"
 * replace("x")("y")("xyz")              // "yyz"
 *
 * // No match found
 * replace("foo")("bar")("baz qux") // "baz qux" (unchanged)
 *
 * // Regular expression replacement
 * replace(/\d+/)("X")("abc123def456")     // "abcXdef456" (first match only)
 * replace(/[aeiou]/)("*")("hello")        // "h*llo" (first vowel only)
 * replace(/\s+/)("-")("hello   world")    // "hello-world"
 *
 * // Global regex replaces all matches
 * replace(/\d+/g)("X")("abc123def456")    // "abcXdefX"
 * replace(/[aeiou]/g)("*")("hello")       // "h*ll*"
 *
 * // Replacement function
 * replace(/(\d+)/)((match) => `[${match}]`)("test123end") // "test[123]end"
 * replace(/(\w+)/)((m) => m.toUpperCase())("hello world") // "HELLO world"
 *
 * // Special replacement patterns in string
 * replace("name")("$& Jr.")("name")    // "name Jr. Jr." ($& = matched string)
 * replace(/(hello) (world)/)("$2 $1")("hello world") // "world hello"
 *
 * // Edge cases
 * replace("")("X")("hello")     // "Xhello" (empty pattern at start)
 * replace("x")("y")("")         // "" (empty string)
 * replace("hello")("")("hello") // "" (replace with empty)
 *
 * // Partial application
 * const censorNumbers = replace(/\d+/g)("***")
 * censorNumbers("Call 555-1234") // "Call ***-***"
 * censorNumbers("Room 101")       // "Room ***"
 *
 * const fixTypo = replace("teh")("the")
 * fixTypo("teh quick brown fox") // "the quick brown fox"
 * ```
 */
const replace =
	(searchValue: string | RegExp) =>
	(replaceValue: string | ReplacerFunction) =>
	(str: string): string => {
		// TypeScript properly infers the overload when we check the type
		if (typeof replaceValue === "string") {
			return str.replace(searchValue, replaceValue)
		}
		// Function replacer
		return str.replace(searchValue, replaceValue)
	}

export default replace
