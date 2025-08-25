/**
 * Removes whitespace from the start of a string
 *
 * Removes leading whitespace characters (spaces, tabs, newlines, etc.)
 * from the beginning of a string. This is an idempotent operation - applying
 * it multiple times has the same effect as applying it once.
 *
 * @curried Single parameter - already curried
 * @param str - The string to trim from the start
 * @returns The string with leading whitespace removed
 * @example
 * ```typescript
 * // Basic trimming
 * trimStart("  hello world")  // "hello world"
 * trimStart("\n\ttest")        // "test"
 * trimStart("  spaces  ")      // "spaces  "
 *
 * // Various whitespace types
 * trimStart("\r\ntext")        // "text"
 * trimStart("\t\t\tdata")      // "data"
 * trimStart("   \n   value")   // "value"
 *
 * // Edge cases
 * trimStart("")                // ""
 * trimStart("   ")             // ""
 * trimStart("no-trim")         // "no-trim"
 * trimStart("\n\n\n")          // ""
 *
 * // Idempotent property
 * const once = trimStart("  test")
 * const twice = trimStart(trimStart("  test"))
 * once === twice               // true (both are "test")
 * ```
 * @property Idempotent - f(f(x)) = f(x)
 */
const trimStart = (str: string): string => str.trimStart()

export default trimStart
