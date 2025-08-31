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
	(array: ReadonlyArray<string> | null | undefined): Array<string> => {
		if (isNullish(array) || !Array.isArray(array)) {
			return []
		}
		return array.map((item) => (pattern.test(item) ? replacer(item) : item))
	}

export default replaceAllMatches
