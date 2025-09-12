/**
 * Removes whitespace from both ends of a string
 *
 * Removes all leading and trailing whitespace characters including spaces,
 * tabs, newlines, and other Unicode whitespace characters. The operation
 * is idempotent - applying it multiple times has the same effect as
 * applying it once.
 *
 * @param str - The string to trim
 * @returns String with leading and trailing whitespace removed
 * @example
 * ```typescript
 * // Basic usage
 * trim("  hello world  ") // "hello world"
 * trim("\n\ttest\n")      // "test"
 * trim("   ")             // ""
 *
 * // Idempotent property
 * trim(trim("  hello  ")) // "hello"
 * trim("hello")           // "hello" (already trimmed)
 *
 * // Various whitespace types
 * trim(" \t\n\r text \t\n\r ") // "text"
 * trim("\u00A0text\u00A0")     // "text" (non-breaking spaces)
 *
 * // Internal spaces preserved
 * trim("  hello   world  ") // "hello   world"
 * ```
 * @pure
 * @immutable
 * @safe
 */
const trim = (str: string): string => str.trim()

export default trim
