import isUndefined from "../../isUndefined/index.ts"
import findIndex from "../findIndex/index.ts"
import replaceAt from "../replaceAt/index.ts"

/**
 * Replaces the first string in an array that matches a regular expression
 * 
 * @param re - Regular expression to match against
 * @returns Function that takes a replacer function and returns function that replaces first match
 * @example
 * ```typescript
 * replaceFirstMatch(/^h/)(s => s.toUpperCase())(["hello", "hi", "world"]) // ["HELLO", "hi", "world"]
 * replaceFirstMatch(/test/)(s => "replaced")(["other", "test1", "test2"]) // ["other", "replaced", "test2"]
 * ```
 */
const replaceFirstMatch =
	(re: RegExp) =>
	(f: (item: string) => string) =>
	(arr: Array<string>): Array<string> => {
		const index = findIndex((item: string) => re.test(item))(arr)

		return isUndefined(index) ? arr : replaceAt<string>(index)(f)(arr)
	}

export default replaceFirstMatch
