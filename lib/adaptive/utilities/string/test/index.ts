/**
 * Tests whether a string matches a regular expression
 * 
 * @param regex - Regular expression to test against
 * @returns Function that takes a string and returns true if it matches
 * @example
 * ```typescript
 * test(/^\d+$/)("123") // true
 * test(/^\d+$/)("abc") // false
 * test(/hello/i)("Hello World") // true
 * ```
 */
const test = (regex: RegExp) => (str: string): boolean => regex.test(str)

export default test
