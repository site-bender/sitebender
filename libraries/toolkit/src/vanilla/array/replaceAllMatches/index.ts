import isNullish from "../../validation/isNullish/index.ts"

/**
 * Replaces all strings that match a pattern with transformed values
 *
 * Tests each string element against the pattern. Non-string elements
 * are passed through unchanged. The replacer receives matching strings.
 *
 * @param pattern - Regular expression to match strings against
 * @param replacer - Function to transform matching strings
 * @param array - Array containing strings to check
 * @returns New array with matching strings replaced
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * replaceAllMatches(/^h/)(s => s.toUpperCase())(["hello", "hi", "world"])
 * // ["HELLO", "HI", "world"]
 *
 * replaceAllMatches(/test/)(s => "replaced")(["test1", "other", "test2"])
 * // ["replaced", "other", "replaced"]
 *
 * // Clean error messages
 * const cleanErrors = replaceAllMatches(/error:/i)(s => s.toLowerCase())
 * cleanErrors(["ERROR: failed", "info", "Error: bad"]) // ["error: failed", "info", "error: bad"]
 * ```
 */
const replaceAllMatches =
	(pattern: RegExp) =>
	(replacer: (item: string) => string) =>
	<T>(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array)) {
			return []
		}
		return array.map((item) =>
			typeof item === "string" && pattern.test(item)
				? (replacer(item) as T)
				: item
		)
	}

export default replaceAllMatches
