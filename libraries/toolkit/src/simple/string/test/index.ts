/**
 * Tests whether a string matches a regular expression
 *
 * Executes a search for a match between a regular expression and a string.
 * Returns true if a match is found, false otherwise. This is a simple
 * boolean test without returning the actual matches.
 *
 * @pure
 * @predicate
 * @curried
 * @immutable
 * @param pattern - Regular expression to test against
 * @param str - The string to test
 * @returns True if the pattern matches, false otherwise
 * @example
 * ```typescript
 * // Basic pattern testing
 * test(/^\d+$/)("123")       // true (only digits)
 * test(/^\d+$/)("abc")       // false (not digits)
 *
 * // Case insensitive matching
 * test(/hello/i)("Hello World")  // true
 * test(/hello/)("Hello World")   // false (case sensitive)
 *
 * // Pattern validation
 * test(/^[A-Z][a-z]+$/)("Hello")    // true (capital then lowercase)
 * test(/^[A-Z][a-z]+$/)("hello")    // false (no capital)
 *
 * // Edge cases
 * test(/^$/)("")              // true (empty pattern matches empty string)
 * test(/^$/)("anything")      // false
 *
 * // Partial application
 * const isNumber = test(/^\d+$/)
 * isNumber("12345")           // true
 * isNumber("abc")             // false
 * ```
 */
const test = (pattern: RegExp) => (str: string): boolean => pattern.test(str)

export default test
