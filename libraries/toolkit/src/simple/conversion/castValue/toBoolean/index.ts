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
const toBoolean = (value: unknown): boolean => {
	// Handle nullish values
	if (value == null) {
		return false
	}

	// If already boolean, return as-is
	if (typeof value === "boolean") {
		return value
	}

	// Handle string representations
	if (typeof value === "string") {
		const normalized = value.toLowerCase().trim()

		// Explicit true values
		if (["true", "yes", "y", "1", "on"].includes(normalized)) {
			return true
		}

		// Explicit false values
		if (["false", "no", "n", "0", "off"].includes(normalized)) {
			return false
		}

		// Empty string is false, all others are true
		return value.length > 0
	}

	// Handle numbers (0, -0, NaN are false)
	if (typeof value === "number") {
		return !isNaN(value) && value !== 0
	}

	// Objects, arrays, functions, etc. are truthy
	return true
}

export default toBoolean
