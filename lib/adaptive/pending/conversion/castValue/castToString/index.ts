import type {
	AdaptiveError,
	Either,
	Value,
} from "../../../types/index.ts"

import Error from "../../../constructors/Error/index.ts"

/**
 * Safely converts any value to its string representation
 * 
 * Converts various JavaScript types to their string representation using
 * appropriate conversion strategies for each type. This function never fails
 * for defined values, making it useful for displaying values, logging, or
 * preparing data for string-based operations.
 * 
 * Conversion rules:
 * - Strings: returned as-is
 * - Numbers: converted using String() (preserves precision)
 * - Booleans: "true" or "false"
 * - null: "null"
 * - undefined: returns error (only failure case)
 * - Objects/Arrays: JSON stringified
 * - Functions: converted to string representation
 * - Symbols: converted using String()
 * - BigInt: converted using String()
 * 
 * @curried (value) => Either<Array<AdaptiveError>, string>
 * @param value - The value to convert to string
 * @returns Either an array of errors (Left) or the string value (Right)
 * @example
 * ```typescript
 * // Primitive types
 * castToString("hello")     // { right: "hello" }
 * castToString(42)          // { right: "42" }
 * castToString(3.14159)     // { right: "3.14159" }
 * castToString(true)        // { right: "true" }
 * castToString(false)       // { right: "false" }
 * castToString(null)        // { right: "null" }
 * 
 * // Numbers with special values
 * castToString(0)           // { right: "0" }
 * castToString(-0)          // { right: "0" }
 * castToString(Infinity)    // { right: "Infinity" }
 * castToString(-Infinity)   // { right: "-Infinity" }
 * castToString(NaN)         // { right: "NaN" }
 * 
 * // Scientific notation preserved
 * castToString(1e10)        // { right: "10000000000" }
 * castToString(1e-10)       // { right: "1e-10" }
 * 
 * // Objects and arrays (JSON stringified)
 * castToString({ a: 1, b: 2 })      // { right: '{"a":1,"b":2}' }
 * castToString([1, 2, 3])            // { right: '[1,2,3]' }
 * castToString({ nested: { x: 1 }}) // { right: '{"nested":{"x":1}}' }
 * 
 * // Complex objects
 * castToString({ 
 *   name: "Alice", 
 *   age: 30,
 *   active: true 
 * })
 * // { right: '{"name":"Alice","age":30,"active":true}' }
 * 
 * // Arrays with mixed types
 * castToString([1, "two", true, null])
 * // { right: '[1,"two",true,null]' }
 * 
 * // Empty structures
 * castToString({})          // { right: '{}' }
 * castToString([])          // { right: '[]' }
 * 
 * // BigInt support
 * castToString(BigInt(123)) // { right: "123" }
 * castToString(9007199254740991n) // { right: "9007199254740991" }
 * 
 * // Symbol support
 * castToString(Symbol("test")) // { right: "Symbol(test)" }
 * castToString(Symbol.for("global")) // { right: "Symbol(global)" }
 * 
 * // Function support
 * castToString(() => {})    // { right: "() => {}" }
 * castToString(Math.max)    // { right: "function max() { [native code] }" }
 * 
 * // Undefined returns error (only failure case)
 * castToString(undefined)
 * // { left: [{ type: "castToString", value: "String", message: "Cannot cast undefined to a string." }] }
 * 
 * // Practical usage
 * import { isRight } from "../../../types"
 * 
 * const logValue = (label: string, value: Value) => {
 *   const result = castToString(value)
 *   if (isRight(result)) {
 *     console.log(`${label}: ${result.right}`)
 *   } else {
 *     console.log(`${label}: <undefined>`)
 *   }
 * }
 * 
 * logValue("Count", 42)              // "Count: 42"
 * logValue("User", { name: "Bob" })  // "User: {"name":"Bob"}"
 * logValue("Flags", [true, false])   // "Flags: [true,false]"
 * 
 * // Safe display function
 * const display = (value: Value): string => {
 *   const result = castToString(value)
 *   return isRight(result) ? result.right : "<no value>"
 * }
 * 
 * display(123)        // "123"
 * display(null)       // "null"
 * display(undefined)  // "<no value>"
 * ```
 * @property Pure - always returns the same result for the same input
 * @property Total - handles all possible input values except undefined
 * @property Safe - never throws, returns Either for error handling
 */
const castToString = (value: Value): Either<Array<AdaptiveError>, string> => {
	// Handle undefined (only failure case)
	if (value === undefined) {
		return {
			left: [
				Error("castToString")("String")(
					`Cannot cast undefined to a string.`,
				),
			],
		}
	}

	// Strings pass through unchanged
	if (typeof value === "string") {
		return { right: value }
	}

	// Numbers use String() for proper formatting
	if (typeof value === "number") {
		return { right: String(value) }
	}

	// Booleans convert to "true" or "false"
	if (typeof value === "boolean") {
		return { right: value ? "true" : "false" }
	}

	// null converts to "null"
	if (value === null) {
		return { right: "null" }
	}

	// BigInt support
	if (typeof value === "bigint") {
		return { right: String(value) }
	}

	// Symbol support
	if (typeof value === "symbol") {
		return { right: String(value) }
	}

	// Function support
	if (typeof value === "function") {
		return { right: String(value) }
	}

	// Objects and arrays use JSON.stringify
	if (typeof value === "object" && value !== null) {
		try {
			return { right: JSON.stringify(value) }
		} catch (error) {
			// Handle circular references or other JSON errors
			return { right: String(value) }
		}
	}

	// Fallback for any other type (should not reach here in practice)
	return { right: String(value) }
}

export default castToString