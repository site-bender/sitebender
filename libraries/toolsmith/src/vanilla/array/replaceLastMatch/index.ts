import isNullish from "../../validation/isNullish/index.ts"
import findLastIndex from "../findLastIndex/index.ts"
import replaceAt from "../replaceAt/index.ts"

//++ Replaces last element matching pattern
const replaceLastMatch =
	<T>(pattern: RegExp | string) =>
	(replacer: (item: T) => T) =>
	(array: ReadonlyArray<T> | null | undefined): Array<T> => {
		if (isNullish(array)) {
			return []
		}
		const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern)
		const index = findLastIndex((item: T) => regex.test(String(item)))(
			array,
		)

		return index === undefined
			? [...array]
			: replaceAt<T>(index)(replacer)(array)
	}

export default replaceLastMatch

//?? [EXAMPLE] `replaceLastMatch(/^h/)(s => s.toUpperCase())(["hello", "hi", "world"]) // ["hello", "HI", "world"]`
//?? [EXAMPLE] `replaceLastMatch(/test/)(s => "replaced")(["test1", "other", "test2"]) // ["test1", "other", "replaced"]`
//?? [EXAMPLE] `replaceLastMatch("abc")(_ => "found")(["abc", "def", "abc"]) // ["abc", "def", "found"]`
//?? [EXAMPLE] `replaceLastMatch(/^ERROR:/)(s => "WARNING:" + s.slice(6))(["ERROR: fail", "info", "ERROR: bad"]) // ["ERROR: fail", "info", "WARNING: bad"]`
//?? [EXAMPLE] `replaceLastMatch(/\d+/)(s => "NUM")(["123", "abc", "456"]) // ["123", "abc", "NUM"]`
//?? [EXAMPLE] `replaceLastMatch(/xyz/)(_ => "found")(["abc", "def"]) // ["abc", "def"] (no match)`
