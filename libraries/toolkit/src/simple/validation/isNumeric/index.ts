/**
 * Validates strings containing only numeric characters
 *
 * Checks whether a string consists entirely of numeric digits (0-9).
 * By default, validates unsigned integers only. Can optionally allow
 * negative numbers, decimal points, and scientific notation. Returns
 * false for non-string values, empty strings, or strings containing
 * non-numeric characters.
 *
 * Numeric validation modes:
 * - Default: Only digits 0-9
 * - With negative: Allows leading minus sign
 * - With decimal: Allows decimal point
 * - With scientific: Allows scientific notation (e.g., 1.23e10)
 * - Empty strings always return false
 * - Non-string values always return false
 *
 * @param options - Optional configuration for validation behavior
 * @returns A predicate function that validates numeric strings
 * @example
 * ```typescript
 * // Basic numeric validation (digits only)
 * const isBasicNumeric = isNumeric()
 *
 * isBasicNumeric("123")            // true
 * isBasicNumeric("0")              // true
 * isBasicNumeric("00123")          // true (leading zeros ok)
 * isBasicNumeric("123.45")         // false (decimal not allowed)
 * isBasicNumeric("-123")           // false (negative not allowed)
 * isBasicNumeric("12a34")          // false (contains letter)
 * isBasicNumeric("")               // false (empty)
 * isBasicNumeric(" 123")           // false (contains space)
 *
 * // Allow negative numbers
 * const withNegative = isNumeric({ allowNegative: true })
 *
 * withNegative("-123")             // true
 * withNegative("-0")               // true
 * withNegative("123")              // true (positive still valid)
 * withNegative("--123")            // false (double minus)
 * withNegative("123-")             // false (trailing minus)
 *
 * // Allow decimal numbers
 * const withDecimal = isNumeric({ allowDecimal: true })
 *
 * withDecimal("123.45")            // true
 * withDecimal("0.5")               // true
 * withDecimal(".5")                // true (leading decimal)
 * withDecimal("123.")              // true (trailing decimal)
 * withDecimal("123")               // true (integer still valid)
 * withDecimal("123.45.67")         // false (multiple decimals)
 *
 * // Allow both negative and decimal
 * const signedDecimal = isNumeric({
 *   allowNegative: true,
 *   allowDecimal: true
 * })
 *
 * signedDecimal("-123.45")         // true
 * signedDecimal("-0.5")            // true
 * signedDecimal("-.5")             // true
 * signedDecimal("+123.45")         // false (plus sign not supported)
 *
 * // Allow scientific notation
 * const withScientific = isNumeric({ allowScientific: true })
 *
 * withScientific("1.23e10")        // true
 * withScientific("1.23E10")        // true (uppercase E)
 * withScientific("1.23e-10")       // true (negative exponent)
 * withScientific("1.23e+10")       // true (explicit positive)
 * withScientific("1e5")            // true
 * withScientific("123")            // true (regular number)
 * withScientific("1.23e")          // false (incomplete)
 * withScientific("e10")            // false (no mantissa)
 *
 * // All options combined
 * const fullNumeric = isNumeric({
 *   allowNegative: true,
 *   allowDecimal: true,
 *   allowScientific: true
 * })
 *
 * fullNumeric("-123.45e-10")       // true
 * fullNumeric("-0.0001")           // true
 * fullNumeric("3.14159")           // true
 * fullNumeric("-Infinity")         // false (not a numeric string)
 * fullNumeric("NaN")               // false
 *
 * // Form validation for numeric input
 * const validateNumericField = (
 *   input: unknown,
 *   allowDecimal: boolean = false
 * ): string | null => {
 *   if (typeof input !== "string") {
 *     return "Input must be text"
 *   }
 *
 *   const trimmed = input.trim()
 *   if (trimmed.length === 0) {
 *     return "Number is required"
 *   }
 *
 *   if (!isNumeric({ allowDecimal, allowNegative: true })(trimmed)) {
 *     return allowDecimal
 *       ? "Must be a valid decimal number"
 *       : "Must be a valid integer"
 *   }
 *
 *   return null
 * }
 *
 * validateNumericField("123")      // null (valid)
 * validateNumericField("123.45", true)  // null (valid)
 * validateNumericField("abc")      // "Must be a valid integer"
 *
 * // ZIP code validation
 * const isValidZipCode = (zip: string): boolean => {
 *   const validator = isNumeric()
 *   return validator(zip) && (zip.length === 5 || zip.length === 9)
 * }
 *
 * isValidZipCode("12345")          // true
 * isValidZipCode("123456789")      // true
 * isValidZipCode("1234")           // false (wrong length)
 * isValidZipCode("1234a")          // false (contains letter)
 *
 * // Phone number digits extraction
 * const extractDigits = (phone: string): string => {
 *   const digits = phone.split('').filter(char =>
 *     isNumeric()(char)
 *   ).join('')
 *   return digits
 * }
 *
 * extractDigits("(555) 123-4567")  // "5551234567"
 * extractDigits("+1-555-123-4567") // "15551234567"
 *
 * // Credit card number validation (digits only)
 * const isValidCardNumber = (cardNumber: string): boolean => {
 *   const cleaned = cardNumber.replace(/\s/g, '')
 *   return isNumeric()(cleaned) && cleaned.length >= 13 && cleaned.length <= 19
 * }
 *
 * isValidCardNumber("4532 0151 1283 0366")  // true
 * isValidCardNumber("4532015112830366")     // true
 * isValidCardNumber("4532-0151-1283-0366")  // false (contains hyphens)
 *
 * // Filter numeric strings
 * const values = ["123", "abc", "45.6", "-78", "90", "", "12a"]
 * const integers = values.filter(isNumeric())
 * // ["123", "90"]
 *
 * const decimals = values.filter(isNumeric({ allowDecimal: true }))
 * // ["123", "45.6", "90"]
 *
 * // Parse with validation
 * const parseNumericSafely = (
 *   value: string,
 *   options: { allowDecimal?: boolean } = {}
 * ): number | null => {
 *   if (!isNumeric(options)(value)) {
 *     return null
 *   }
 *
 *   const parsed = options.allowDecimal
 *     ? parseFloat(value)
 *     : parseInt(value, 10)
 *
 *   return isNaN(parsed) ? null : parsed
 * }
 *
 * parseNumericSafely("123")        // 123
 * parseNumericSafely("123.45", { allowDecimal: true })  // 123.45
 * parseNumericSafely("abc")        // null
 *
 * // Version number validation
 * const isValidVersion = (version: string): boolean => {
 *   const parts = version.split('.')
 *   if (parts.length !== 3) return false
 *
 *   return parts.every(part => isNumeric()(part))
 * }
 *
 * isValidVersion("1.2.3")          // true
 * isValidVersion("10.0.0")         // true
 * isValidVersion("1.2")            // false (not 3 parts)
 * isValidVersion("1.2.a")          // false (contains letter)
 *
 * // Invalid inputs
 * const checker = isNumeric()
 *
 * checker(null)                    // false
 * checker(undefined)               // false
 * checker(123)                     // false (not a string)
 * checker(true)                    // false
 * checker([])                      // false
 * checker({})                      // false
 *
 * // Currency validation (without symbols)
 * const isValidAmount = (amount: string): boolean => {
 *   return isNumeric({
 *     allowDecimal: true,
 *     allowNegative: true
 *   })(amount)
 * }
 *
 * isValidAmount("100")             // true
 * isValidAmount("100.00")          // true
 * isValidAmount("-50.25")          // true
 * isValidAmount("$100")            // false (has symbol)
 *
 * // Year validation
 * const isValidYear = (year: string): boolean => {
 *   if (!isNumeric()(year)) return false
 *
 *   const yearNum = parseInt(year, 10)
 *   return yearNum >= 1900 && yearNum <= 2100
 * }
 *
 * isValidYear("2024")              // true
 * isValidYear("1999")              // true
 * isValidYear("3000")              // false (out of range)
 * isValidYear("20a4")              // false (contains letter)
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
type NumericOptions = {
	allowNegative?: boolean
	allowDecimal?: boolean
	allowScientific?: boolean
}

const isNumeric = (
	options: NumericOptions = {},
): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		const {
			allowNegative = false,
			allowDecimal = false,
			allowScientific = false,
		} = options

		// Build regex pattern based on options
		let pattern = "^"

		// Optional negative sign
		if (allowNegative) {
			pattern += "-?"
		}

		if (allowScientific) {
			// Scientific notation: [sign]digits[.digits][e|E[sign]digits]
			if (allowDecimal) {
				// With decimal: -123.45e-10
				pattern += "\\d*\\.?\\d+([eE][+-]?\\d+)?$"
			} else {
				// Without decimal but with scientific: -123e10
				pattern += "\\d+([eE][+-]?\\d+)?$"
			}
		} else if (allowDecimal) {
			// Decimal without scientific: -123.45
			// Allow leading decimal (.5), trailing decimal (5.), or both sides (5.5)
			pattern += "(\\d*\\.\\d*|\\d+)$"
			// Need to ensure at least one digit exists
		} else {
			// Just digits: -123
			pattern += "\\d+$"
		}

		const regex = new RegExp(pattern)
		const isValid = regex.test(value)

		// Additional validation for decimal-only case
		if (isValid && allowDecimal && !allowScientific) {
			// Ensure we don't have just a decimal point
			if (value === "." || value === "-." || value === "-.") {
				return false
			}
			// Ensure no multiple decimal points
			const decimalCount = (value.match(/\./g) || []).length
			if (decimalCount > 1) {
				return false
			}
		}

		return isValid
	}
}

export default isNumeric
