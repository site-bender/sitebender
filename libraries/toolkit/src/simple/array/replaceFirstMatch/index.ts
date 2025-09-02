import isNullish from "../../validation/isNullish/index.ts"
import findIndex from "../findIndex/index.ts"
import replaceAt from "../replaceAt/index.ts"

/**
 * Replaces the first string that matches a pattern with a transformed value
 *
 * Tests each string element against the pattern. Returns original array
 * if no match found. Only replaces the first matching occurrence.
 * Non-string elements are skipped.
 *
 * @param pattern - Regular expression to match strings against
 * @param replacer - Function to transform the first matching string
 * @param array - Array containing strings to check
 * @returns New array with first match replaced
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * replaceFirstMatch(/^h/)(s => s.toUpperCase())(["hello", "hi", "world"]) // ["HELLO", "hi", "world"]
 * replaceFirstMatch(/test/)(s => "replaced")(["other", "test1", "test2"]) // ["other", "replaced", "test2"]
 * replaceFirstMatch(/xyz/)(_ => "found")(["abc", "def"]) // ["abc", "def"] (no match)
 *
 * // Fix first error message
 * const fixFirstError = replaceFirstMatch(/^ERROR:/)(s => "WARNING:" + s.slice(6))
 * fixFirstError(["ERROR: fail", "info", "ERROR: bad"]) // ["WARNING: fail", "info", "ERROR: bad"]
 * ```
 */
const replaceFirstMatch =
	(pattern: RegExp) =>
	(replacer: (item: string) => string) =>
	(array: ReadonlyArray<string> | null | undefined): Array<string> => {
		if (isNullish(array) || !Array.isArray(array)) {
			return []
		}
		const index = findIndex((item: string) => pattern.test(item))(array)

		return index === -1 ? [...array] : replaceAt<string>(index)(replacer)(array)
	}

export default replaceFirstMatch
