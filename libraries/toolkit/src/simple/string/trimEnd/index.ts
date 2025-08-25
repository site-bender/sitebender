/**
 * Removes whitespace from the end of a string
 *
 * Removes trailing whitespace characters (spaces, tabs, newlines, etc.)
 * from the end of a string. This is an idempotent operation - applying
 * it multiple times has the same effect as applying it once.
 *
 * @curried Single parameter - already curried
 * @param str - The string to trim from the end
 * @returns The string with trailing whitespace removed
 * @example
 * ```typescript
 * // Basic trimming
 * trimEnd("hello world  ")    // "hello world"
 * trimEnd("test\n\t")         // "test"
 * trimEnd("  spaces  ")       // "  spaces"
 *
 * // Various whitespace types
 * trimEnd("text\r\n")         // "text"
 * trimEnd("data\t\t\t")       // "data"
 * trimEnd("value   \n   ")    // "value"
 *
 * // Edge cases
 * trimEnd("")                 // ""
 * trimEnd("   ")              // ""
 * trimEnd("no-trim")          // "no-trim"
 * trimEnd("\n\n\n")           // ""
 *
 * // Idempotent property
 * const once = trimEnd("test  ")
 * const twice = trimEnd(trimEnd("test  "))
 * once === twice              // true (both are "test")
 * ```
 * @property Idempotent - f(f(x)) = f(x)
 */
const trimEnd = (str: string): string => str.trimEnd()

export default trimEnd
