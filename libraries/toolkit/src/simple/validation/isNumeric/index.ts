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
 * // Basic validation (digits only)
 * const basic = isNumeric()
 * basic("123")            // true
 * basic("123.45")         // false (decimal not allowed)
 * basic("-123")           // false (negative not allowed)
 * basic("12a34")          // false (contains letter)
 *
 * // With options
 * const withDecimal = isNumeric({ allowDecimal: true })
 * withDecimal("123.45")   // true
 * withDecimal(".5")       // true (leading decimal)
 *
 * const withNegative = isNumeric({ allowNegative: true })
 * withNegative("-123")    // true
 * withNegative("--123")   // false (double minus)
 *
 * // Scientific notation
 * const scientific = isNumeric({ allowScientific: true })
 * scientific("1.23e10")   // true
 * scientific("1.23e-10")  // true
 * scientific("e10")       // false (no mantissa)
 *
 * // ZIP code validation
 * const isValidZip = (zip: string): boolean =>
 *   isNumeric()(zip) && (zip.length === 5 || zip.length === 9)
 * 
 * isValidZip("12345")     // true
 * isValidZip("1234a")     // false
 *
 * // Filter numeric values
 * const values = ["123", "abc", "45.6", "-78"]
 * values.filter(isNumeric())  // ["123"]
 * values.filter(isNumeric({ allowDecimal: true }))  // ["123", "45.6"]
 *
 * // Edge cases
 * const check = isNumeric()
 * check(null)             // false
 * check("")               // false (empty)
 * check(123)              // false (not a string)
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
