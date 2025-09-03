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
	<T>(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array)) {
			return []
		}
		const index = findIndex((item: T) =>
			typeof item === "string" && pattern.test(item)
		)(array)

		if (index === undefined) {
			return [...array]
		}
		
		// At this point we know the item at index is a string because
		// findIndex only returns an index when the item passes our test
		return replaceAt(index)(() => replacer(array[index] as unknown as string) as T)(array)
	}

export default replaceFirstMatch
