import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Finds the index of the last string that matches a pattern
 |
 | Tests each string against the pattern, returning the index of the
 | last matching element. Accepts RegExp or string (converted to RegExp).
 | Returns undefined for null/undefined arrays or if no match found.
 */
export default function lastIndexOfMatch(pattern: RegExp | string) {
	return function findLastIndexOfMatch(
		array: ReadonlyArray<string> | null | undefined,
	): number | undefined {
		if (isNullish(array) || array.length === 0) {
			return undefined
		}

		const regex = new RegExp(pattern)
		const index = array.reduce(
			function updateLastMatch(lastMatch, item, index) {
				return regex.test(item) ? index : lastMatch
			},
			-1,
		)
		return index === -1 ? undefined : index
	}
}

//?? [EXAMPLE] `lastIndexOfMatch(/^h/)(["hi", "hello", "world", "hey"]) // 3`
//?? [EXAMPLE] `lastIndexOfMatch("ell")(["hello", "bell", "well", "test"]) // 2`
//?? [EXAMPLE] `lastIndexOfMatch(/\d+/)(["one", "2", "three", "4"]) // 3`
//?? [EXAMPLE] `lastIndexOfMatch(/error/i)(["info", "ERROR 1", "warning", "Error 2"]) // 3`
//?? [EXAMPLE] `lastIndexOfMatch(/test/)([]) // undefined`
//?? [EXAMPLE] `lastIndexOfMatch(/test/)(null) // undefined`
//?? [EXAMPLE] `lastIndexOfMatch(/^z/)(["hi", "hello"]) // undefined`
