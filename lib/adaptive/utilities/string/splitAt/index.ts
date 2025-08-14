/**
 * Splits a string at a specific index into two parts
 * 
 * @param index - Index where to split the string
 * @returns Function that takes a string and returns array with two parts
 * @example
 * ```typescript
 * splitAt(3)("hello") // ["hel", "lo"]
 * splitAt(0)("test") // ["", "test"]
 * splitAt(10)("short") // ["short"]
 * ```
 */
const splitAt = (index: number) => (str: string): Array<string> =>
	index < str.length && index > -str.length
		? [str.slice(0, index), str.slice(index)]
		: [str.slice(0)]

export default splitAt
