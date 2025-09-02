/**
 * Type guard that checks if a value is a string primitive
 *
 * Determines whether a value is a string primitive using the typeof operator.
 * This includes string literals, template literals, and strings created with
 * String() function (without new). Does not include String objects created with
 * new String(). In TypeScript, this narrows the type to string, enabling safe
 * string operations without type assertions.
 *
 * String detection:
 * - String literals: "text", 'text', `text`
 * - Empty strings: ""
 * - String() conversions: String(value)
 * - Not included: String objects (new String())
 * - Not included: numbers, even if they look like strings
 * - Type narrowing: provides TypeScript type guard
 *
 * @param value - The value to check
 * @returns True if the value is a string primitive, false otherwise
 * @example
 * ```typescript
 * // Basic checks
 * isString("hello")            // true
 * isString("")                 // true
 * isString(`template`)         // true
 * isString(123)                // false
 * isString(new String("hi"))   // false (String object)
 *
 * // Type narrowing
 * const processText = (value: unknown): string =>
 *   isString(value) ? value.toUpperCase() : ""
 *
 * // Safe string operations
 * const safeTrim = (value: unknown): string =>
 *   isString(value) ? value.trim() : ""
 *
 * // Filtering strings
 * const mixed = ["text", 123, null, "another"]
 * const strings = mixed.filter(isString)  // ["text", "another"]
 * ```
 * @pure
 * @predicate
 */
const isString = (value: unknown): value is string => typeof value === "string"

export default isString
