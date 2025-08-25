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
 * @param value - The value to convert to boolean
 * @returns The boolean representation of the value
 * @example
 * ```typescript
 * // Boolean values pass through
 * toBoolean(true)                  // true
 * toBoolean(false)                 // false
 *
 * // String representations
 * toBoolean("true")                // true
 * toBoolean("TRUE")                // true
 * toBoolean("True")                // true
 * toBoolean("yes")                 // true
 * toBoolean("YES")                 // true
 * toBoolean("y")                   // true
 * toBoolean("Y")                   // true
 * toBoolean("1")                   // true
 * toBoolean("on")                  // true
 * toBoolean("ON")                  // true
 *
 * toBoolean("false")               // false
 * toBoolean("FALSE")               // false
 * toBoolean("no")                  // false
 * toBoolean("n")                   // false
 * toBoolean("0")                   // false
 * toBoolean("off")                 // false
 *
 * // Numbers
 * toBoolean(1)                     // true
 * toBoolean(-1)                    // true
 * toBoolean(42)                    // true
 * toBoolean(0)                     // false
 * toBoolean(-0)                    // false
 * toBoolean(NaN)                   // false
 * toBoolean(Infinity)              // true
 *
 * // Nullish values
 * toBoolean(null)                  // false
 * toBoolean(undefined)             // false
 *
 * // Objects and arrays (always true when not null)
 * toBoolean({})                    // true
 * toBoolean([])                    // true
 * toBoolean({ a: 1 })              // true
 * toBoolean([1, 2, 3])             // true
 *
 * // Other strings (non-empty = true)
 * toBoolean("")                    // false
 * toBoolean(" ")                   // true
 * toBoolean("hello")               // true
 * toBoolean("anything")            // true
 *
 * // Use with form inputs
 * const checkbox = document.querySelector('input[type="checkbox"]')
 * const isChecked = toBoolean(checkbox?.checked)
 *
 * const selectValue = document.querySelector('select')?.value
 * const isEnabled = toBoolean(selectValue)
 *
 * // Configuration parsing
 * const config = {
 *   debug: "true",
 *   verbose: "yes",
 *   production: "0",
 *   features: {
 *     auth: "on",
 *     logging: "off"
 *   }
 * }
 *
 * const settings = {
 *   debug: toBoolean(config.debug),           // true
 *   verbose: toBoolean(config.verbose),       // true
 *   production: toBoolean(config.production), // false
 *   auth: toBoolean(config.features.auth),    // true
 *   logging: toBoolean(config.features.logging) // false
 * }
 *
 * // Environment variables
 * const isDev = toBoolean(process.env.DEV_MODE)
 * const isDebug = toBoolean(process.env.DEBUG)
 *
 * // API response handling
 * interface ApiResponse {
 *   success: string | number | boolean
 *   data?: unknown
 * }
 *
 * function handleResponse(response: ApiResponse) {
 *   if (toBoolean(response.success)) {
 *     return response.data
 *   }
 *   throw new Error("Request failed")
 * }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Type-coercion - Converts various types to boolean
 * @property Case-insensitive - String checks ignore case
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
