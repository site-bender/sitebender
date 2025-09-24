import isNullish from "../../../validation/isNullish/index.ts"
import toLower from "../../../string/toCase/toLower/index.ts"
import trim from "../../../string/trim/index.ts"
import pipe from "../../../combinator/pipe/index.ts"
import includes from "../../../array/includes/index.ts"
import isBoolean from "../../../validation/isBoolean/index.ts"
import isString from "../../../validation/isString/index.ts"
import isNumber from "../../../validation/isNumber/index.ts"
import isFinite from "../../../validation/isFinite/index.ts"
import isNonZero from "../../../validation/isNonZero/index.ts"
import and from "../../../logic/and/index.ts"
import isNonEmptyString from "../../../validation/isNonEmptyString/index.ts"

/**
 * Converts various values to boolean
 *
 * Performs type coercion to boolean with support for common string
 * representations and standard JavaScript truthy/falsy values.
 * This is the simple version that returns a boolean directly.
 *
 * Conversion rules:
 * - Booleans: returned as-is
 * - Strings (case-insensitive): "true", "yes", "y", "1", "on" → true
 * - Strings (case-insensitive): "false", "no", "n", "0", "off" → false
 * - Numbers: 0, -0, NaN → false; all others → true
 * - null/undefined: false
 * - Objects/Arrays: true (even if empty)
 * - Empty string: false
 * - All other strings: true
 *
 * @pure
 * @safe
 * @param value - The value to convert to boolean
 * @returns The boolean representation of the value
 * @example
 * ```typescript
 * // Basic usage
 * toBoolean(true)                  // true
 * toBoolean("yes")                 // true
 * toBoolean(1)                     // true
 * toBoolean(false)                 // false
 * toBoolean("no")                  // false
 * toBoolean(0)                     // false
 *
 * // String representations (case-insensitive)
 * toBoolean("TRUE")                // true
 * toBoolean("false")               // false
 * toBoolean("")                    // false
 * toBoolean("hello")               // true
 *
 * // Edge cases
 * toBoolean(null)                  // false
 * toBoolean({})                    // true
 * toBoolean([])                    // true
 * toBoolean(NaN)                   // false
 *
 * // Configuration parsing
 * const config = { debug: "true", production: "0" }
 * const settings = {
 *   debug: toBoolean(config.debug),       // true
 *   production: toBoolean(config.production) // false
 * }
 * ```
 */
export default function toBoolean(value: unknown): boolean {
	// Handle nullish values
	if (isNullish(value)) {
		return false
	}

	// If already boolean, return as-is
	if (isBoolean(value)) {
		return value
	}

	// Handle string representations
	if (isString(value)) {
		const normalized = pipe([
			toLower,
			trim
		])(value)

		// Explicit true values
		if (includes(normalized)(["true", "yes", "y", "1", "on"])) {
			return true
		}

		// Explicit false values
		if (includes(normalized)(["false", "no", "n", "0", "off"])) {
			return false
		}

		// Empty string is false, all others are true
		return isNonEmptyString(value)
	}

	// Handle numbers: only finite non-zero numbers are true
	if (isNumber(value)) {
		return and(isFinite(value))(isNonZero(value))
	}

	// Objects, arrays, functions, etc. are truthy
	return true
}
