/**
 * Replaces all string items in an array that match a regular expression
 * 
 * @param re - Regular expression to match against
 * @returns Function that takes a replacer function and returns function that replaces all matching items
 * @example
 * ```typescript
 * replaceAllMatches(/^h/)(s => s.toUpperCase())(["hello", "hi", "world"]) // ["HELLO", "HI", "world"]
 * replaceAllMatches(/test/)(s => "replaced")(["test1", "other", "test2"]) // ["replaced", "other", "replaced"]
 * ```
 */
const replaceAllMatches =
	(re: RegExp) => <T>(f: (item: T) => T) => (arr: Array<T>): Array<T> =>
		arr.map((
			item,
		) => (typeof item === "string" && re.test(item) ? f(item) : item))

export default replaceAllMatches
