import type { ReplacerFunction } from "../../../types/string/index.ts"

/**
 * Replaces all occurrences of a pattern in a string
 *
 * Searches for all matches of the search pattern and replaces them with
 * the replacement value. When using a string pattern, all occurrences are
 * replaced. When using a RegExp, it must have the global flag or an error
 * will be thrown (this is a JavaScript requirement for replaceAll).
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 * @param searchValue - String or global RegExp pattern to search for
 * @param replaceValue - String or function to compute the replacement
 * @param str - The string to perform replacement on
 * @returns New string with all matches replaced
 * @example
 * ```typescript
 * // Basic string replacement - replaces all
 * replaceAll("foo")("bar")("foo foo baz")  // "bar bar baz"
 * replaceAll("o")("0")("hello world")      // "hell0 w0rld"
 * replaceAll(" ")("_")("a b c d")          // "a_b_c_d"
 *
 * // Regular expression - must be global
 * replaceAll(/\d+/g)("X")("1 and 2 and 3")     // "X and X and X"
 * replaceAll(/[aeiou]/g)("*")("hello world")   // "h*ll* w*rld"
 *
 * // Replacement function
 * replaceAll(/\d+/g)((match) => `[${match}]`)("test 1 and 2") // "test [1] and [2]"
 * replaceAll(/\w+/g)((match) => match.toUpperCase())("hello world") // "HELLO WORLD"
 *
 * // Special replacement patterns
 * replaceAll("name")("$& Jr.")("name name")  // "name Jr. Jr. name Jr. Jr."
 *
 * // Edge cases
 * replaceAll("")("X")("hello")          // "XhXeXlXlXoX" (between each char)
 * replaceAll("miss")("hit")("testing")  // "testing" (no match)
 * replaceAll("test")("")("test test")   // "  " (replace with empty)
 *
 * // Partial application
 * const censorVowels = replaceAll(/[aeiou]/gi)("*")
 * censorVowels("Hello World")  // "H*ll* W*rld"
 * censorVowels("AEIOU")        // "*****"
 *
 * const removeSpaces = replaceAll(" ")("")
 * removeSpaces("h e l l o")    // "hello"
 * removeSpaces("no spaces")    // "nospaces"
 * ```
 */
const replaceAll =
	(searchValue: string | RegExp) =>
	(replaceValue: string | ReplacerFunction) =>
	(str: string): string => {
		if (typeof searchValue === "string") {
			// Type guard to properly handle string vs function replacer
			if (typeof replaceValue === "function") {
				// For string search with function replacer, we split and rebuild
				const parts = str.split(searchValue)
				if (parts.length === 1) return str // No matches found

				return parts.reduce((result, part, index) => {
					if (index === 0) return part
					const matchIndex = result.length + (searchValue.length * (index - 1))
					const replacement = replaceValue(searchValue, matchIndex, str)
					return result + replacement + part
				})
			}
			return str.replaceAll(searchValue, replaceValue)
		}
		// For RegExp, ensure it has global flag
		const regex = searchValue.global
			? searchValue
			: new RegExp(searchValue.source, searchValue.flags + "g")
		return str.replaceAll(regex, replaceValue)
	}

export default replaceAll
