/**
 * Finds the index of the last string that matches a pattern
 *
 * Tests each string against the pattern, returning the index of the
 * last matching element. Accepts RegExp or string (converted to RegExp).
 *
 * @curried (pattern) => (array) => result
 * @param pattern - Regular expression or string pattern to match
 * @param array - Array of strings to search
 * @returns Index of last matching string or undefined if none match
 * @example
 * ```typescript
 * lastIndexOfMatch(/^h/)(["hi", "hello", "world", "hey"]) // 3
 * lastIndexOfMatch("ell")(["hello", "bell", "well"]) // 2
 * lastIndexOfMatch(/^z/)(["hi", "hello"]) // undefined
 *
 * // Find last error message
 * const findLastError = lastIndexOfMatch(/error/i)
 * findLastError(["info", "error 1", "warning", "error 2"]) // 3
 * ```
 */
const lastIndexOfMatch =
	(pattern: RegExp | string) => (array: Array<string>): number | undefined => {
		const regex = new RegExp(pattern)
		const index = array.reduce(
			(lastMatch, item, index) => (regex.test(item) ? index : lastMatch),
			-1,
		)
		return index === -1 ? undefined : index
	}

export default lastIndexOfMatch
