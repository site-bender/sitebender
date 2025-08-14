/**
 * Concatenates two strings together
 * 
 * @param a - First string (defaults to empty string)
 * @returns Function that takes second string and returns concatenated result
 * @example
 * ```typescript
 * concat("hello")(" world") // "hello world"
 * concat("test")("") // "test"
 * ```
 */
const concat = (a: string = "") => (b: string = ""): string => a.concat(b)

export default concat
