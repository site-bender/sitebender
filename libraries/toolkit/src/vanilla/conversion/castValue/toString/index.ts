import jsonReplacer from "./jsonReplacer/index.ts"
import isNull from "../../../validation/isNull/index.ts"
import isUndefined from "../../../validation/isUndefined/index.ts"
import isString from "../../../validation/isString/index.ts"
import isNumber from "../../../validation/isNumber/index.ts"
import isBoolean from "../../../validation/isBoolean/index.ts"
import isSymbol from "../../../validation/isSymbol/index.ts"
import isBigInt from "../../../validation/isBigInt/index.ts"
import isFunction from "../../../validation/isFunction/index.ts"
import isObject from "../../../validation/isObject/index.ts"
import isDate from "../../../validation/isDate/index.ts"
import isRegExp from "../../../validation/isRegExp/index.ts"
import isError from "../../../validation/isError/index.ts"
import isMap from "../../../validation/isMap/index.ts"
import isSet from "../../../validation/isSet/index.ts"
import is from "../../../validation/is/index.ts"

/**
 * Safely converts any value to its string representation
 *
 * Converts values to strings with consistent, predictable rules.
 * Handles all JavaScript types safely without throwing errors.
 * Objects and arrays are converted to JSON for better debugging.
 *
 * Conversion rules:
 * - Strings: returned as-is
 * - Numbers: standard toString conversion
 * - Booleans: "true" or "false"
 * - null: "null"
 * - undefined: "undefined"
 * - Arrays: JSON stringified
 * - Objects: JSON stringified (with circular reference handling)
 * - Functions: returns function signature
 * - Symbols: returns symbol description
 * - Dates: ISO string format
 * - RegExp: returns pattern as string
 * - Errors: returns error message
 *
 * @pure
 * @safe
 * @param value - The value to convert to string
 * @returns The string representation of the value
 * @example
 * ```typescript
 * // Basic usage
 * toString("hello")                // "hello"
 * toString(42)                     // "42"
 * toString(true)                   // "true"
 * toString(null)                   // "null"
 * toString(undefined)              // "undefined"
 *
 * // Objects and arrays (JSON stringified)
 * toString([1, 2, 3])              // "[1,2,3]"
 * toString({ a: 1 })               // '{"a":1}'
 *
 * // Special types
 * toString(new Date("2024-03-15T12:00:00Z"))  // "2024-03-15T12:00:00.000Z"
 * toString(/test/gi)               // "/test/gi"
 * toString(new Error("Oops"))      // "Error: Oops"
 *
 * // Circular references handled safely
 * const obj: any = { a: 1 }
 * obj.self = obj
 * toString(obj)                    // '{"a":1,"self":"[Circular]"}'
 * ```
 */
export default function toString(value: unknown): string {
	// Handle nullish values
	if (isNull(value)) {
		return "null"
	}
	if (isUndefined(value)) {
		return "undefined"
	}

	// If already a string, return as-is
	if (isString(value)) {
		return value
	}

	// Handle primitives
	if (isNumber(value)) {
		// Special handling for -0 to return "0"
		if (is(-0)(value)) {
			return "0"
		}
		return String(value)
	}

	if (isBoolean(value)) {
		return value ? "true" : "false"
	}

	if (isSymbol(value)) {
		return value.toString()
	}

	if (isBigInt(value)) {
		return value.toString()
	}

	// Handle functions
	if (isFunction(value)) {
		return value.toString()
	}

	// Handle objects
	if (isObject(value)) {
		// Special handling for Dates
		if (isDate(value)) {
			return value.toISOString()
		}

		// Special handling for RegExp
		if (isRegExp(value)) {
			return value.toString()
		}

		// Special handling for Errors
		if (isError(value)) {
			return `${value.name}: ${value.message}`
		}

		// Special handling for Map
		if (isMap(value)) {
			try {
				return JSON.stringify({
					dataType: "Map",
					entries: Array.from(value.entries()),
				})
			} catch {
				return "[Map]"
			}
		}

		// Special handling for Set
		if (isSet(value)) {
			try {
				return JSON.stringify({
					dataType: "Set",
					values: Array.from(value.values()),
				})
			} catch {
				return "[Set]"
			}
		}

		// For arrays and plain objects, use JSON.stringify with circular reference handling
		try {
			const seen = new WeakSet()
			return JSON.stringify(value, jsonReplacer(seen))
		} catch {
			// Fallback for any JSON.stringify errors
			return Object.prototype.toString.call(value)
		}
	}

	// Fallback (should never reach here)
	return String(value)
}
