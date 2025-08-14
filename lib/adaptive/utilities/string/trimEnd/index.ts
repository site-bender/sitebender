/**
 * Removes whitespace from the end of a string
 * 
 * @param str - The string to trim from the end
 * @returns The string with trailing whitespace removed
 * @example
 * ```typescript
 * trimEnd("hello world  ") // "hello world"
 * trimEnd("test\n\t") // "test"
 * ```
 */
const trimEnd = (str: string): string => str.replace(/\s*$/, "")

export default trimEnd
