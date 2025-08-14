/**
 * Tests whether a string ends with a specified substring
 * 
 * @param substring - The substring to search for at the end
 * @returns Function that takes a string and returns true if it ends with substring
 * @example
 * ```typescript
 * endsWith("world")("hello world") // true
 * endsWith(".ts")("file.js") // false
 * ```
 */
const endsWith = (substring: string) => (str: string): boolean =>
	str.endsWith(substring)

export default endsWith
