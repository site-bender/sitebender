/**
 * Splits a string into chunks of specified length
 * 
 * @param n - Length of each chunk (must be positive)
 * @returns Function that takes a string and returns array of chunks
 * @example
 * ```typescript
 * splitEvery(3)("hello world") // ["hel", "lo ", "wor", "ld"]
 * splitEvery(2)("abcd") // ["ab", "cd"]
 * splitEvery(0)("test") // []
 * ```
 */
const splitEvery = (n: number) => (str: string): Array<string> =>
	str.length && n > 0 ? [str.slice(0, n), ...splitEvery(n)(str.slice(n))] : []

export default splitEvery
