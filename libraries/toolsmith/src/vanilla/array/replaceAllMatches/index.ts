import isNullish from "../../validation/isNullish/index.ts"

//++ Replaces strings matching a pattern
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

//?? [EXAMPLE] `replaceAllMatches(/^h/)(s => s.toUpperCase())(["hello", "hi", "world"]) // ["HELLO", "HI", "world"]`
//?? [EXAMPLE] `replaceAllMatches(/test/)(s => "replaced")(["test1", "other", "test2"]) // ["replaced", "other", "replaced"]`
//?? [EXAMPLE] `replaceAllMatches(/error:/i)(s => s.toLowerCase())(["ERROR: failed", "info", "Error: bad"]) // ["error: failed", "info", "error: bad"]`
//?? [EXAMPLE] `replaceAllMatches(/\d+/)(s => "NUM")(["abc", "123", "def456"]) // ["abc", "NUM", "NUM"]`
//?? [EXAMPLE] `replaceAllMatches(/test/)(() => "new")(null) // []`
