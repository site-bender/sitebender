import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"

/**
 * Converts a value to a boolean using common truthy/falsy conventions
 * 
 * Attempts to convert various types of values to boolean following these rules:
 * - Booleans: returned as-is
 * - Strings: "true", "t", "yes" → true; "false", "f", "no" → false (case-insensitive)
 * - Numbers: 0 → false; all other numbers → true
 * - Other values: returns an error
 * 
 * This function is useful for parsing user input from forms, configuration files,
 * or APIs where boolean values might be represented in various formats.
 * 
 * @curried (value) => Either<Array<AdaptiveError>, boolean>
 * @param value - The value to convert to boolean
 * @returns Either an array of errors (Left) or the boolean value (Right)
 * @example
 * ```typescript
 * // Direct boolean values
 * castToBoolean(true)   // { right: true }
 * castToBoolean(false)  // { right: false }
 * 
 * // String values (case-insensitive)
 * castToBoolean("true")  // { right: true }
 * castToBoolean("TRUE")  // { right: true }
 * castToBoolean("t")     // { right: true }
 * castToBoolean("yes")   // { right: true }
 * castToBoolean("YES")   // { right: true }
 * 
 * castToBoolean("false") // { right: false }
 * castToBoolean("FALSE") // { right: false }
 * castToBoolean("f")     // { right: false }
 * castToBoolean("no")    // { right: false }
 * castToBoolean("NO")    // { right: false }
 * 
 * // Number values
 * castToBoolean(0)       // { right: false }
 * castToBoolean(1)       // { right: true }
 * castToBoolean(-1)      // { right: true }
 * castToBoolean(42)      // { right: true }
 * castToBoolean(0.0)     // { right: false }
 * castToBoolean(0.1)     // { right: true }
 * 
 * // Invalid values return errors
 * castToBoolean("maybe")
 * // { left: [{ type: "castToBoolean", value: "Boolean", message: "Cannot cast \"maybe\" to a boolean." }] }
 * 
 * castToBoolean(null)
 * // { left: [{ type: "castToBoolean", value: "Boolean", message: "Cannot cast null to a boolean." }] }
 * 
 * castToBoolean({})
 * // { left: [{ type: "castToBoolean", value: "Boolean", message: "Cannot cast {} to a boolean." }] }
 * 
 * // Use with Either utilities for error handling
 * import { isRight, isLeft } from "../../../types"
 * 
 * const result = castToBoolean("yes")
 * if (isRight(result)) {
 *   console.log("Value is:", result.right) // "Value is: true"
 * }
 * 
 * // Chain multiple conversions
 * const parseConfig = (value: Value) => {
 *   const boolResult = castToBoolean(value)
 *   if (isRight(boolResult)) {
 *     return boolResult.right ? "enabled" : "disabled"
 *   }
 *   return "invalid"
 * }
 * 
 * parseConfig("true")  // "enabled"
 * parseConfig("false") // "disabled"
 * parseConfig("xyz")   // "invalid"
 * ```
 * @property Pure - always returns the same result for the same input
 * @property Total - handles all possible input values, returning Either type
 * @property Type-safe - preserves type information through Either monad
 */
const castToBoolean = (value: Value): Either<Array<AdaptiveError>, boolean> => {
	// Direct boolean values pass through
	if (typeof value === "boolean") {
		return { right: value }
	}

	// String conversions (case-insensitive)
	if (typeof value === "string") {
		const normalizedValue = value.toLowerCase().trim()
		
		// Truthy string values
		if (normalizedValue === "t" || normalizedValue === "true" || normalizedValue === "yes") {
			return { right: true }
		}
		
		// Falsy string values
		if (normalizedValue === "f" || normalizedValue === "false" || normalizedValue === "no") {
			return { right: false }
		}
	}

	// Number conversions (0 is false, all others are true)
	if (typeof value === "number") {
		return { right: value !== 0 }
	}

	// All other values cannot be converted
	return {
		left: [
			Error("castToBoolean")("Boolean")(
				`Cannot cast ${JSON.stringify(value)} to a boolean.`,
			),
		],
	}
}

export default castToBoolean