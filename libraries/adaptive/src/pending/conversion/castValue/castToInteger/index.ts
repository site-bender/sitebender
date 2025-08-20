import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"
import { MATCHERS } from "../../../guards/constants/index.ts"

/**
 * Converts a value to an integer using strict parsing rules
 * 
 * Attempts to convert a value to an integer by first converting it to a string
 * and then parsing it. Only accepts valid integer strings (no decimals, no
 * scientific notation). This ensures predictable behavior when handling user
 * input or data from external sources.
 * 
 * Valid integer formats:
 * - Positive integers: "123", "42", "0"
 * - Negative integers: "-123", "-42"
 * - Leading zeros are allowed: "0123" → 123
 * 
 * Invalid formats that will return an error:
 * - Decimal numbers: "3.14", "10.0"
 * - Scientific notation: "1e10", "2E5"
 * - Non-numeric strings: "abc", "12abc", "abc12"
 * - Empty strings, null, undefined, objects, arrays
 * 
 * @curried (value) => Either<Array<AdaptiveError>, number>
 * @param value - The value to convert to an integer
 * @returns Either an array of errors (Left) or the integer value (Right)
 * @example
 * ```typescript
 * // Valid integer strings
 * castToInteger("42")      // { right: 42 }
 * castToInteger("0")       // { right: 0 }
 * castToInteger("-123")    // { right: -123 }
 * castToInteger("007")     // { right: 7 }
 * 
 * // Numbers are converted to strings first
 * castToInteger(42)        // { right: 42 }
 * castToInteger(-123)      // { right: -123 }
 * castToInteger(0)         // { right: 0 }
 * 
 * // Invalid: decimal numbers
 * castToInteger("3.14")
 * // { left: [{ type: "castToInteger", value: "Integer", message: "Cannot cast \"3.14\" to an integer." }] }
 * 
 * castToInteger(3.14)
 * // { left: [{ type: "castToInteger", value: "Integer", message: "Cannot cast 3.14 to an integer." }] }
 * 
 * // Invalid: non-numeric strings
 * castToInteger("abc")
 * // { left: [{ type: "castToInteger", value: "Integer", message: "Cannot cast \"abc\" to an integer." }] }
 * 
 * castToInteger("12.5abc")
 * // { left: [{ type: "castToInteger", value: "Integer", message: "Cannot cast \"12.5abc\" to an integer." }] }
 * 
 * // Invalid: other types
 * castToInteger(null)
 * // { left: [{ type: "castToInteger", value: "Integer", message: "Cannot cast null to an integer." }] }
 * 
 * castToInteger({})
 * // { left: [{ type: "castToInteger", value: "Integer", message: "Cannot cast {} to an integer." }] }
 * 
 * // Use with Either utilities
 * import { isRight, isLeft } from "../../../types"
 * 
 * const parseCount = (value: Value) => {
 *   const result = castToInteger(value)
 *   if (isRight(result)) {
 *     return result.right >= 0 ? result.right : 0
 *   }
 *   return 0
 * }
 * 
 * parseCount("42")    // 42
 * parseCount("-5")    // 0
 * parseCount("abc")   // 0
 * 
 * // Compose with other functions
 * const validateAge = (value: Value) => {
 *   const result = castToInteger(value)
 *   if (isLeft(result)) return result
 *   
 *   const age = result.right
 *   if (age < 0 || age > 150) {
 *     return { 
 *       left: [Error("validateAge")("Age")("Age must be between 0 and 150")] 
 *     }
 *   }
 *   return result
 * }
 * 
 * validateAge("25")   // { right: 25 }
 * validateAge("200")  // { left: [Error...] }
 * validateAge("abc")  // { left: [Error...] }
 * ```
 * @property Pure - always returns the same result for the same input
 * @property Total - handles all possible input values, returning Either type
 * @property Strict - only accepts valid integer formats, no implicit conversions
 */
const castToInteger = (value: Value): Either<Array<AdaptiveError>, number> => {
	// Convert value to string for parsing
	const stringValue = String(value)
	
	// Use the integer matcher to validate format
	if (MATCHERS.integer.test(stringValue)) {
		const parsed = parseInt(stringValue, 10)
		
		// Ensure the parsed value is a valid integer (not NaN or Infinity)
		if (Number.isInteger(parsed)) {
			return { right: parsed }
		}
	}

	// Return error for invalid input
	return {
		left: [
			Error("castToInteger")("Integer")(
				`Cannot cast ${JSON.stringify(value)} to an integer.`,
			),
		],
	}
}

export default castToInteger