/**
 * Finds the index of the last string in an array that matches a regular expression
 * 
 * @param re - Regular expression or string pattern to match
 * @returns Function that takes an array of strings and returns the index of last match or undefined
 * @example
 * ```typescript
 * lastIndexOfMatch(/^h/))(["hi", "hello", "world", "hey"]) // 3
 * lastIndexOfMatch("ell")(["hello", "bell", "well"]) // 2
 * lastIndexOfMatch(/^z/)(["hi", "hello"]) // undefined
 * ```
 */
const lastIndexOfMatch =
	(re: RegExp | string) => (arr: Array<string>): number | undefined => {
		const regex = new RegExp(re)
		const index = arr.reduce(
			(out, item, index) => (regex.test(item) ? index : out),
			-1,
		)

		return index < 0 ? undefined : index
	}

export default lastIndexOfMatch
