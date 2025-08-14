/**
 * Removes whitespace from both ends of a string
 * 
 * @param str - The string to trim
 * @returns The string with leading and trailing whitespace removed
 * @example
 * ```typescript
 * trim("  hello world  ") // "hello world"
 * trim("\n\ttest\n") // "test"
 * ```
 */
const trim = (str: string): string => str.trim()

export default trim
