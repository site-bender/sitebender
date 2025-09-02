import isNullish from "../../validation/isNullish/index.ts"

/**
 * Finds the index of the last string that matches a pattern
 *
 * Tests each string against the pattern, returning the index of the
 * last matching element. Accepts RegExp or string (converted to RegExp).
 * Returns undefined for null/undefined arrays or if no match found.
 *
 * @param pattern - Regular expression or string pattern to match
 * @param array - Array of strings to search
 * @returns Index of last matching string or undefined if none match
 *
 * @pure
 * @curried
 * @safe
 *
 * @example
 * ```typescript
 * // Basic usage
 * lastIndexOfMatch(/^h/)(["hi", "hello", "world", "hey"]) // 3
 * lastIndexOfMatch("ell")(["hello", "bell", "well", "test"]) // 2
 * lastIndexOfMatch(/\d+/)(["one", "2", "three", "4"]) // 3
 *
 * // Find last error message
 * const findLastError = lastIndexOfMatch(/error/i)
 * findLastError(["info", "ERROR 1", "warning", "Error 2"]) // 3
 *
 * // Partial application
 * const findLastCapital = lastIndexOfMatch(/^[A-Z]/)
 * findLastCapital(["hello", "World", "Test"]) // 2
 *
 * // Edge cases
 * lastIndexOfMatch(/test/)([]) // undefined
 * lastIndexOfMatch(/test/)(null) // undefined
 * lastIndexOfMatch(/^z/)(["hi", "hello"]) // undefined
 * ```
 */
const lastIndexOfMatch = (pattern: RegExp | string) =>
(
	array: ReadonlyArray<string> | null | undefined,
): number | undefined => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return undefined
	}

	const regex = new RegExp(pattern)
	const index = array.reduce(
		(lastMatch, item, index) => (regex.test(item) ? index : lastMatch),
		-1,
	)
	return index === -1 ? undefined : index
}

export default lastIndexOfMatch
