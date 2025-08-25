import isUndefined from "../../isUndefined/index.ts"
import findLastIndex from "../findLastIndex/index.ts"
import replaceAt from "../replaceAt/index.ts"

/**
 * Replaces the last string that matches a pattern with a transformed value
 *
 * Tests each string element against the pattern. Returns original array
 * if no match found. Only replaces the last matching occurrence.
 * Accepts RegExp or string (string converted to RegExp).
 *
 * @curried (pattern) => (replacer) => (array) => result
 * @param pattern - Regular expression or string pattern to match against
 * @param replacer - Function to transform the last matching string
 * @param array - Array containing strings to check
 * @returns New array with last match replaced
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
	(pattern: RegExp | string) =>
	(replacer: (item: string) => string) =>
	(array: Array<string>): Array<string> => {
		const index = findLastIndex((item: string) =>
			new RegExp(pattern).test(item)
		)(
			array,
		)

		return isUndefined(index)
			? array
			: replaceAt<string>(index)(replacer)(array)
	}

export default replaceLastMatch
