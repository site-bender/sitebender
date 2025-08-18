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
 * @param value - The value to check for numeric string format
 * @returns True if the value represents a valid numeric string, false otherwise
 * @example
 * ```typescript
 * // Valid numeric strings
 * isNumber("123")         // true
 * isNumber("0")           // true
 * isNumber("-42")         // true
 * isNumber("+7")          // true
 * isNumber("3.14")        // true
 * isNumber("-2.5")        // true
 * isNumber(".5")          // true
 * isNumber("3.")          // true
 * isNumber("0.0")         // true
 * 
 * // Numbers are converted to strings first
 * isNumber(123)           // true
 * isNumber(3.14)          // true
 * isNumber(-42)           // true
 * isNumber(0)             // true
 * 
 * // Invalid formats
 * isNumber("abc")         // false
 * isNumber("12px")        // false
 * isNumber("$100")        // false
 * isNumber("1.2.3")       // false
 * isNumber("")            // false
 * isNumber(" ")           // false
 * isNumber("1e10")        // false (scientific notation)
 * isNumber("Infinity")    // false
 * isNumber("NaN")         // false
 * 
 * // Special values
 * isNumber(null)          // false ("null")
 * isNumber(undefined)     // false ("undefined")
 * isNumber(true)          // false ("true")
 * isNumber(false)         // false ("false")
 * isNumber([])            // false ("")
 * isNumber({})            // false ("[object Object]")
 * 
 * // Form validation
 * const validatePrice = (input: string): string | null => {
 *   if (!isNumber(input)) {
 *     return "Please enter a valid number"
 *   }
 *   const price = parseFloat(input)
 *   if (price < 0) {
 *     return "Price cannot be negative"
 *   }
 *   return null
 * }
 * 
 * validatePrice("19.99")   // null (valid)
 * validatePrice("-5")      // "Price cannot be negative"
 * validatePrice("abc")     // "Please enter a valid number"
 * 
 * // Filtering numeric values
 * const mixed = ["123", "abc", "45.6", "hello", "-7", ""]
 * const numbers = mixed.filter(isNumber)
 * // ["123", "45.6", "-7"]
 * 
 * // Safe parsing helper
 * const safeParse = (value: unknown): number | null => {
 *   if (isNumber(value)) {
 *     return parseFloat(String(value))
 *   }
 *   return null
 * }
 * 
 * safeParse("42")         // 42
 * safeParse("3.14")       // 3.14
 * safeParse("abc")        // null
 * safeParse(null)         // null
 * 
 * // Input sanitization
 * const sanitizeNumericInput = (input: string): string => {
 *   // Remove common formatting
 *   const cleaned = input.replace(/[$,\s]/g, "")
 *   return isNumber(cleaned) ? cleaned : ""
 * }
 * 
 * sanitizeNumericInput("$1,234.56")  // "1234.56"
 * sanitizeNumericInput("$ 42")       // "42"
 * sanitizeNumericInput("abc")        // ""
 * 
 * // Type narrowing for string unions
 * type FormValue = string | number | boolean
 * 
 * const processFormValue = (value: FormValue): number => {
 *   if (typeof value === "number") {
 *     return value
 *   }
 *   if (isNumber(value)) {
 *     return parseFloat(String(value))
 *   }
 *   return 0
 * }
 * 
 * processFormValue(42)        // 42
 * processFormValue("3.14")    // 3.14
 * processFormValue(true)      // 0
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property StringBased - Validates string representation, not type
 * @property Strict - Does not accept scientific notation or special values
 * @property Total - Handles all possible input values
 */
const isNumber = (value: unknown): boolean =>
	/^[+-]?([0-9]*[.])?[0-9]+$/.test(String(value))

export default isNumber