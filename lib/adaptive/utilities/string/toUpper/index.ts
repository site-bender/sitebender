/**
 * Converts a string to uppercase using locale-sensitive method
 * 
 * @param str - The string to convert to uppercase
 * @returns The string in uppercase
 * @example
 * ```typescript
 * toUpper("hello world") // "HELLO WORLD"
 * toUpper("Test Case") // "TEST CASE"
 * ```
 */
const toUpper = (str: string): string => str.toLocaleUpperCase()

export default toUpper
