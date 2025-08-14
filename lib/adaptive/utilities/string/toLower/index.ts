/**
 * Converts a string to lowercase using locale-sensitive method
 * 
 * @param str - The string to convert to lowercase
 * @returns The string in lowercase
 * @example
 * ```typescript
 * toLower("HELLO WORLD") // "hello world"
 * toLower("Test Case") // "test case"
 * ```
 */
const toLower = (str: string): string => str.toLocaleLowerCase()

export default toLower
