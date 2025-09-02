import isNull from "../../../validation/isNull/index.ts"
import isUndefined from "../../../validation/isUndefined/index.ts"
import isNotNull from "../../../validation/isNotNull/index.ts"

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
const toString = (value: unknown): string => {
	// Handle nullish values
	if (isNull(value)) {
		return "null"
	}
	if (isUndefined(value)) {
		return "undefined"
	}

	// If already a string, return as-is
	if (typeof value === "string") {
		return value
	}

	// Handle primitives
	if (typeof value === "number") {
		// Special handling for -0 to return "0"
		if (Object.is(value, -0)) {
			return "0"
		}
		return String(value)
	}

	if (typeof value === "boolean") {
		return value ? "true" : "false"
	}

	if (typeof value === "symbol") {
		return value.toString()
	}

	if (typeof value === "bigint") {
		return value.toString()
	}

	// Handle functions
	if (typeof value === "function") {
		return value.toString()
	}

	// Handle objects
	if (typeof value === "object") {
		// Special handling for Dates
		if (value instanceof Date) {
			return value.toISOString()
		}

		// Special handling for RegExp
		if (value instanceof RegExp) {
			return value.toString()
		}

		// Special handling for Errors
		if (value instanceof Error) {
			return `${value.name}: ${value.message}`
		}

		// Special handling for Map
		if (value instanceof Map) {
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
		if (value instanceof Set) {
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
			return JSON.stringify(value, (key, val) => {
				if (typeof val === "object" && isNotNull(val)) {
					if (seen.has(val)) {
						return "[Circular]"
					}
					seen.add(val)
				}
				if (typeof val === "bigint") {
					return val.toString()
				}
				if (typeof val === "symbol") {
					return val.toString()
				}
				if (typeof val === "function") {
					return "[Function]"
				}
				return val
			})
		} catch {
			// Fallback for any JSON.stringify errors
			return Object.prototype.toString.call(value)
		}
	}

	// Fallback (should never reach here)
	return String(value)
}

export default toString
