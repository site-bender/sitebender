/**
 * Tests whether a string starts with a specified substring
 * 
 * @param searchString - The substring to search for at the start
 * @returns Function that takes a string and returns true if it starts with searchString
 * @example
 * ```typescript
 * startsWith("hello")("hello world") // true
 * startsWith("test")("file.js") // false
 * ```
 */
const startsWith = (searchString: string) => (str: string): boolean =>
	str.startsWith(searchString)

export default startsWith
