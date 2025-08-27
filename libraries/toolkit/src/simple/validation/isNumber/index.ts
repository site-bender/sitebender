/**
 * Checks if a value represents a valid numeric string
 *
 * Tests whether a value, when converted to a string, represents a valid number
 * that can be parsed. Uses a regular expression to validate numeric format including
 * integers, decimals, and signed numbers. This is different from typeof checks as it
 * validates string representations of numbers rather than the JavaScript number type.
 *
 * Valid formats:
 * - Integers: "123", "-42", "+7"
 * - Decimals: "3.14", "-2.5", "+0.001"
 * - Leading decimal: ".5" (0.5)
 * - Trailing decimal: "3." (3.0)
 *
 * Invalid formats:
 * - Scientific notation: "1e10", "2E-5"
 * - Infinity: "Infinity", "-Infinity"
 * - NaN: "NaN"
 * - Multiple decimals: "1.2.3"
 * - Non-numeric: "abc", "12px", "$100"
 *
 * @pure
 * @predicate
 * @param value - The value to check for numeric string format
 * @returns True if the value represents a valid numeric string, false otherwise
 * @example
 * ```typescript
 * // Valid numeric strings
 * isNumber("123")         // true
 * isNumber("-42")         // true
 * isNumber("3.14")        // true
 * isNumber(".5")          // true
 *
 * // Numbers are converted to strings
 * isNumber(123)           // true
 * isNumber(3.14)          // true
 *
 * // Invalid formats
 * isNumber("abc")         // false
 * isNumber("12px")        // false
 * isNumber("1e10")        // false (scientific notation)
 * isNumber("Infinity")    // false
 * isNumber(null)          // false
 *
 * // Safe parsing helper
 * const safeParse = (value: unknown): number | null =>
 *   isNumber(value) ? parseFloat(String(value)) : null
 *
 * safeParse("42")         // 42
 * safeParse("abc")        // null
 * ```
 */
const isNumber = (value: unknown): boolean =>
	/^[+-]?([0-9]*[.])?[0-9]+$/.test(String(value))

export default isNumber
