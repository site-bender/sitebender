/**
 * Converts a string to lowercase
 * 
 * Transforms all characters in a string to their lowercase equivalents
 * using locale-sensitive conversion. This is an idempotent operation -
 * applying it multiple times has the same effect as applying it once.
 * 
 * @curried Single parameter - already curried
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
 * toLower("lowercase")        // "lowercase"
 * 
 * // Special characters preserved
 * toLower("HELLO-WORLD_123")  // "hello-world_123"
 * toLower("Email@EXAMPLE.COM") // "email@example.com"
 * toLower("PRICE: $99.99")    // "price: $99.99"
 * 
 * // Edge cases
 * toLower("")                 // ""
 * toLower("123")              // "123" (numbers unchanged)
 * toLower("!@#$%")            // "!@#$%" (symbols unchanged)
 * 
 * // Unicode support
 * toLower("CAFÉ")             // "café"
 * toLower("ÑOÑO")             // "ñoño"
 * 
 * // Idempotent property
 * const once = toLower("TEST")
 * const twice = toLower(toLower("TEST"))
 * once === twice              // true (both are "test")
 * ```
 * @property Idempotent - f(f(x)) = f(x)
 */
const toLower = (str: string): string => str.toLocaleLowerCase()

export default toLower
