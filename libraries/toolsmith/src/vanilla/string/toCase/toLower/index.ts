/**
 * Converts a string to lowercase
 *
 * Transforms all characters in a string to their lowercase equivalents
 * using locale-sensitive conversion. This is an idempotent operation -
 * applying it multiple times has the same effect as applying it once.
 *
 * @param str - The string to convert to lowercase
 * @returns The string with all characters in lowercase
 * @example
 * ```typescript
 * // Basic conversion
 * toLower("HELLO WORLD")      // "hello world"
 * toLower("Test Case")        // "test case"
 * toLower("MiXeD cAsE")       // "mixed case"
 *
 * // Already lowercase
 * toLower("already lower")    // "already lower"
 *
 * // Special characters preserved
 * toLower("HELLO-WORLD_123")  // "hello-world_123"
 * toLower("Email@EXAMPLE.COM") // "email@example.com"
 *
 * // Edge cases
 * toLower("")                 // ""
 * toLower("123")              // "123" (numbers unchanged)
 *
 * // Unicode support
 * toLower("CAFÉ")             // "café"
 * ```
 * @pure - Function has no side effects
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 * @idempotent - f(f(x)) = f(x)
 */
const toLower = (str: string): string => str.toLocaleLowerCase()

export default toLower
