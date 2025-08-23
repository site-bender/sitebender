/**
 * Converts a string to uppercase
 * 
 * Transforms all characters in a string to their uppercase equivalents
 * using locale-sensitive conversion. This is an idempotent operation -
 * applying it multiple times has the same effect as applying it once.
 * 
 * @curried Single parameter - already curried
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
 * toUpper("UPPERCASE")        // "UPPERCASE"
 * 
 * // Special characters preserved
 * toUpper("hello-world_123")  // "HELLO-WORLD_123"
 * toUpper("email@example.com") // "EMAIL@EXAMPLE.COM"
 * toUpper("price: $99.99")    // "PRICE: $99.99"
 * 
 * // Edge cases
 * toUpper("")                 // ""
 * toUpper("123")              // "123" (numbers unchanged)
 * toUpper("!@#$%")            // "!@#$%" (symbols unchanged)
 * 
 * // Unicode support
 * toUpper("café")             // "CAFÉ"
 * toUpper("ñoño")             // "ÑOÑO"
 * 
 * // Idempotent property
 * const once = toUpper("test")
 * const twice = toUpper(toUpper("test"))
 * once === twice              // true (both are "TEST")
 * ```
 * @property Idempotent - f(f(x)) = f(x)
 */
const toUpper = (str: string): string => str.toLocaleUpperCase()

export default toUpper
