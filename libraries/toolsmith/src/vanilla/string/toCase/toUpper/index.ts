/**
 * Converts a string to uppercase
 *
 * Transforms all characters in a string to their uppercase equivalents
 * using locale-sensitive conversion. This is an idempotent operation -
 * applying it multiple times has the same effect as applying it once.
 *
 * @param str - The string to convert to uppercase
 * @returns The string with all characters in uppercase
 * @example
 * ```typescript
 * // Basic conversion
 * toUpper("hello world")      // "HELLO WORLD"
 * toUpper("Test Case")        // "TEST CASE"
 * toUpper("MiXeD cAsE")       // "MIXED CASE"
 *
 * // Already uppercase
 * toUpper("ALREADY UPPER")    // "ALREADY UPPER"
 *
 * // Special characters preserved
 * toUpper("hello-world_123")  // "HELLO-WORLD_123"
 * toUpper("email@example.com") // "EMAIL@EXAMPLE.COM"
 *
 * // Edge cases
 * toUpper("")                 // ""
 * toUpper("123")              // "123" (numbers unchanged)
 *
 * // Unicode support
 * toUpper("café")             // "CAFÉ"
 * ```
 * @pure - Function has no side effects
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 * @idempotent - f(f(x)) = f(x)
 */
const toUpper = (str: string): string => str.toLocaleUpperCase()

export default toUpper
