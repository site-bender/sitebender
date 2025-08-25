/**
 * Safely parses a value as a floating-point number, returns null on failure
 *
 * Attempts to parse any value as a floating-point number with comprehensive
 * handling of edge cases. Returns null instead of NaN for invalid inputs,
 * making it safe for use in pipelines and compositions. Handles strings,
 * numbers, booleans, and special numeric formats like scientific notation.
 *
 * @param value - The value to parse as a float
 * @returns The parsed number or null if parsing fails
 * @example
 * ```typescript
 * // Basic usage
 * safeParseFloat("42.5")                 // 42.5
 * safeParseFloat("3.14159")              // 3.14159
 * safeParseFloat("1.23e4")               // 12300 (scientific)
 * safeParseFloat("Infinity")             // Infinity
 *
 * // Direct numbers and booleans
 * safeParseFloat(42)                     // 42
 * safeParseFloat(true)                   // 1
 *
 * // Invalid inputs
 * safeParseFloat("abc")                  // null
 * safeParseFloat("")                     // null
 * safeParseFloat(null)                   // null
 *
 * // Validation pattern
 * const price = safeParseFloat(input)
 * if (price === null || price < 0) {
 *   throw new Error("Invalid price")
 * }
 * ```
 * @pure
 * @safe
 */
const safeParseFloat = (value: unknown): number | null => {
	// Handle null and undefined
	if (value === null || value === undefined) {
		return null
	}

	// Handle booleans
	if (typeof value === "boolean") {
		return value ? 1 : 0
	}

	// Handle numbers directly
	if (typeof value === "number") {
		// Return null for NaN
		return isNaN(value) ? null : value
	}

	// Handle strings
	if (typeof value === "string") {
		// Trim whitespace
		const trimmed = value.trim()

		// Check for empty string
		if (trimmed === "") {
			return null
		}

		// Parse the number
		const parsed = parseFloat(trimmed)

		// Return null if parsing resulted in NaN
		return isNaN(parsed) ? null : parsed
	}

	// All other types return null
	return null
}

export default safeParseFloat
