import isNullish from "../../validation/isNullish/index.ts"
import findLastIndex from "../findLastIndex/index.ts"
import replaceAt from "../replaceAt/index.ts"

/**
 * Replaces the last element that matches a pattern with a transformed value
 *
 * Tests each element against the pattern. Returns original array
 * if no match found. Only replaces the last matching occurrence.
 * Accepts RegExp or string (string converted to RegExp).
 * Non-string elements are converted to strings for testing.
 *
 * @param pattern - Regular expression or string pattern to match against
 * @param replacer - Function to transform the last matching element
 * @param array - Array containing elements to check
 * @returns New array with last match replaced
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * replaceLastMatch(/^h/)(s => s.toUpperCase())(["hello", "hi", "world"]) // ["hello", "HI", "world"]
 * replaceLastMatch(/test/)(s => "replaced")(["test1", "other", "test2"]) // ["test1", "other", "replaced"]
 * replaceLastMatch("abc")(_ => "found")(["abc", "def", "abc"]) // ["abc", "def", "found"]
 *
 * // Fix last error message
 * const fixLastError = replaceLastMatch(/^ERROR:/)(s => "WARNING:" + s.slice(6))
 * fixLastError(["ERROR: fail", "info", "ERROR: bad"]) // ["ERROR: fail", "info", "WARNING: bad"]
 * ```
 */
const replaceLastMatch =
	<T>(pattern: RegExp | string) =>
	(replacer: (item: T) => T) =>
	(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array)) {
			return []
		}
		const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern)
		const index = findLastIndex((item: T) => regex.test(String(item)))(array)

		return index === undefined
			? [...array]
			: replaceAt<T>(index)(replacer)(array)
	}

export default replaceLastMatch
