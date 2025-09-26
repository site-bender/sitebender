import isNullish from "../../validation/isNullish/index.ts"
import findIndex from "../findIndex/index.ts"

/*++
 | Replaces the first string that matches a pattern with a transformed value
 |
 | Tests each string element against the pattern. Returns original array
 | if no match found. Only replaces the first matching occurrence.
 | Non-string elements are skipped.
 */
export default function replaceFirstMatch(pattern: RegExp) {
	return function withReplacer(replacer: (item: string) => string) {
		return function replaceInArray<T>(
			array: ReadonlyArray<T> | null | undefined,
		): Array<T> {
			if (isNullish(array)) {
				return []
			}
			const index = findIndex(function matchesPattern(item: T) {
				return typeof item === "string" && pattern.test(item)
			})(array as Array<T>)

			if (index === undefined) {
				return [...array]
			}
			const out = [...array]
			out[index] = replacer(out[index] as unknown as string) as T
			return out
		}
	}
}

//?? [EXAMPLE] `replaceFirstMatch(/^h/)(s => s.toUpperCase())(["hello", "hi", "world"]) // ["HELLO", "hi", "world"]`
//?? [EXAMPLE] `replaceFirstMatch(/test/)(s => "replaced")(["other", "test1", "test2"]) // ["other", "replaced", "test2"]`
//?? [EXAMPLE] `replaceFirstMatch(/xyz/)(_ => "found")(["abc", "def"]) // ["abc", "def"] (no match)`
//?? [EXAMPLE] `replaceFirstMatch(/^ERROR:/)(s => "WARNING:" + s.slice(6))(["ERROR: fail", "info", "ERROR: bad"]) // ["WARNING: fail", "info", "ERROR: bad"]`
//?? [EXAMPLE] `replaceFirstMatch(/\d+/)(s => "NUM")(["abc", "123", "456"]) // ["abc", "NUM", "456"]`
//?? [EXAMPLE] `replaceFirstMatch(/test/)(s => s.toUpperCase())(null) // []`
