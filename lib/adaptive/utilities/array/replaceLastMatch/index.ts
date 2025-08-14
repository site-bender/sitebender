import isUndefined from "../../isUndefined/index.ts"
import findLastIndex from "../findLastIndex/index.ts"
import replaceAt from "../replaceAt/index.ts"

/**
 * Replaces the last string in an array that matches a regular expression
 * 
 * @param re - Regular expression or string pattern to match against
 * @returns Function that takes a replacer function and returns function that replaces last match
 * @example
 * ```typescript
 * replaceLastMatch(/^h/)(s => s.toUpperCase())(["hello", "hi", "world"]) // ["hello", "HI", "world"]
 * replaceLastMatch(/test/)(s => "replaced")(["test1", "other", "test2"]) // ["test1", "other", "replaced"]
 * ```
 */
const replaceLastMatch =
	(re: RegExp | string) =>
	(f: (item: string) => string) =>
	(arr: Array<string>): Array<string> => {
		const index = findLastIndex((item: string) => new RegExp(re).test(item))(
			arr,
		)

		return isUndefined(index) ? arr : replaceAt<string>(index)(f)(arr)
	}

export default replaceLastMatch
