/**
 * Removes whitespace from the start of a string
 * 
 * @param str - The string to trim from the start
 * @returns The string with leading whitespace removed
 * @example
 * ```typescript
 * trimStart("  hello world") // "hello world"
 * trimStart("\n\ttest") // "test"
 * ```
 */
const trimStart = (str: string): string => str.replace(/^\s*/, "")

export default trimStart
