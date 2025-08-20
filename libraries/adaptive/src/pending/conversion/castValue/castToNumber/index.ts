import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import { MATCHERS } from "../../../guards/constants/index.ts"

/**
 * Converts a value to a floating-point number using flexible parsing rules
 * 
 * Attempts to convert a value to a number by first converting it to a string
 * and then parsing it as a floating-point number. Accepts integers, decimals,
 * and scientific notation. This function is more permissive than castToInteger,
 * allowing decimal values and various numeric formats.
 * 
 * Valid number formats:
 * - Integers: "123", "-42", "0"
 * - Decimals: "3.14", "-2.5", "0.001"
 * - Scientific notation: "1e10", "2.5E-3", "-1.23e+4"
 * - Leading/trailing zeros: "007" → 7, "3.000" → 3
 * - Special values: "Infinity", "-Infinity"
 * 
 * Invalid formats that will return an error:
 * - Non-numeric strings: "abc", "12abc", "abc12"
 * - Mixed formats: "1.2.3", "1e2e3"
 * - Empty strings, null, undefined (when not numeric)
 * - Objects, arrays (except when they stringify to valid numbers)
 * - NaN strings: "NaN" (returns error for safety)
 * 
 * @curried (value) => Either<Array<AdaptiveError>, number>
 * @param value - The value to convert to a number
 * @returns Either an array of errors (Left) or the numeric value (Right)
 * @example
 * ```typescript
 * // Integers
 * castToNumber("42")        // { right: 42 }
 * castToNumber("-123")      // { right: -123 }
 * castToNumber("0")         // { right: 0 }
 * 
 * // Decimals
 * castToNumber("3.14")      // { right: 3.14 }
 * castToNumber("-2.5")      // { right: -2.5 }
 * castToNumber("0.001")     // { right: 0.001 }
 * castToNumber(".5")        // { right: 0.5 }
 * 
 * // Scientific notation
 * castToNumber("1e10")      // { right: 10000000000 }
 * castToNumber("2.5E-3")    // { right: 0.0025 }
 * castToNumber("-1.23e+4")  // { right: -12300 }
 * 
 * // Numbers are converted to strings first
 * castToNumber(42)          // { right: 42 }
 * castToNumber(3.14)        // { right: 3.14 }
 * castToNumber(-0)          // { right: -0 }
 * 
 * // Special values
 * castToNumber("Infinity")  // { right: Infinity }
 * castToNumber("-Infinity") // { right: -Infinity }
 * 
 * // Invalid: non-numeric strings
 * castToNumber("abc")
 * // { left: [{ type: "castToNumber", value: "Number", message: "Cannot cast \"abc\" to a number." }] }
 * 
 * castToNumber("12.5abc")
 * // { left: [{ type: "castToNumber", value: "Number", message: "Cannot cast \"12.5abc\" to a number." }] }
 * 
 * castToNumber("NaN")
 * // { left: [{ type: "castToNumber", value: "Number", message: "Cannot cast \"NaN\" to a number." }] }
 * 
 * // Invalid: other types
 * castToNumber({})
 * // { left: [{ type: "castToNumber", value: "Number", message: "Cannot cast {} to a number." }] }
 * 
 * castToNumber([1, 2, 3])
 * // { left: [{ type: "castToNumber", value: "Number", message: "Cannot cast [1,2,3] to a number." }] }
 * 
 * // Use with Either utilities
 * import { isRight, isLeft } from "../../../types"
 * 
 * const calculateTax = (value: Value, rate: number) => {
 *   const result = castToNumber(value)
 *   if (isRight(result)) {
 *     return result.right * rate
 *   }
 *   return 0
 * }
 * 
 * calculateTax("100", 0.15)    // 15
 * calculateTax("50.50", 0.10)  // 5.05
 * calculateTax("invalid", 0.15) // 0
 * 
 * // Validate ranges
 * const validatePercentage = (value: Value) => {
 *   const result = castToNumber(value)
 *   if (isLeft(result)) return result
 *   
 *   const num = result.right
 *   if (num < 0 || num > 100) {
 *     return { 
 *       left: [Error("validatePercentage")("Percentage")("Must be between 0 and 100")] 
 *     }
 *   }
 *   return result
 * }
 * 
 * validatePercentage("50")    // { right: 50 }
 * validatePercentage("150")   // { left: [Error...] }
 * validatePercentage("abc")   // { left: [Error...] }
 * ```
 * @property Pure - always returns the same result for the same input
 * @property Total - handles all possible input values, returning Either type
 * @property Flexible - accepts various numeric formats including decimals and scientific notation
 */
const castToNumber = (value: Value): Either<Array<AdaptiveError>, number> => {
	// Convert value to string for parsing
	const stringValue = String(value)
	
	// Use the number matcher to validate format
	if (MATCHERS.number.test(stringValue)) {
		const parsed = parseFloat(stringValue)
		
		// Check for NaN (parseFloat can return NaN for some invalid inputs)
		if (!Number.isNaN(parsed)) {
			return { right: parsed }
		}
	}

	// Return error for invalid input
	return {
		left: [
			Error("castToNumber")("Number")(
				`Cannot cast ${JSON.stringify(value)} to a number.`,
			),
		],
	}
}

export default castToNumber