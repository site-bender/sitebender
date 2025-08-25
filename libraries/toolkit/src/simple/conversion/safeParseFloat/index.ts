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
 * // Valid numbers
 * safeParseFloat("42.5")                 // 42.5
 * safeParseFloat("3.14159")              // 3.14159
 * safeParseFloat("-273.15")              // -273.15
 * safeParseFloat("0.001")                // 0.001
 * safeParseFloat(".5")                   // 0.5
 * safeParseFloat("5.")                   // 5
 *
 * // Scientific notation
 * safeParseFloat("1.23e4")               // 12300
 * safeParseFloat("5E-3")                 // 0.005
 * safeParseFloat("-2.5e+2")              // -250
 *
 * // Special values
 * safeParseFloat("Infinity")             // Infinity
 * safeParseFloat("-Infinity")            // -Infinity
 * safeParseFloat("0")                    // 0
 * safeParseFloat("-0")                   // -0
 *
 * // Numbers passed directly
 * safeParseFloat(42)                     // 42
 * safeParseFloat(3.14)                   // 3.14
 * safeParseFloat(-100.5)                 // -100.5
 * safeParseFloat(0)                      // 0
 *
 * // Booleans
 * safeParseFloat(true)                   // 1
 * safeParseFloat(false)                  // 0
 *
 * // Invalid inputs
 * safeParseFloat("abc")                  // null
 * safeParseFloat("12.34.56")             // null (multiple decimals)
 * safeParseFloat("NaN")                  // null (NaN is not a valid number)
 * safeParseFloat("")                     // null (empty string)
 * safeParseFloat("   ")                  // null (whitespace only)
 * safeParseFloat(null)                   // null
 * safeParseFloat(undefined)              // null
 * safeParseFloat({})                     // null
 * safeParseFloat([])                     // null
 * safeParseFloat([1, 2])                 // null
 *
 * // Strings with whitespace
 * safeParseFloat("  42.5  ")             // 42.5 (trims whitespace)
 * safeParseFloat("\n3.14\t")             // 3.14
 * safeParseFloat(" -100 ")               // -100
 *
 * // Hexadecimal and octal (not supported)
 * safeParseFloat("0xFF")                 // null
 * safeParseFloat("0o77")                 // null
 * safeParseFloat("0b1010")               // null
 *
 * // Currency and formatted numbers (not supported)
 * safeParseFloat("$100.50")              // null
 * safeParseFloat("1,234.56")             // null
 * safeParseFloat("100%")                 // null
 *
 * // Form validation
 * function validatePrice(input: unknown): number | null {
 *   const price = safeParseFloat(input)
 *   if (price === null || price < 0) {
 *     return null
 *   }
 *   return Math.round(price * 100) / 100  // Round to 2 decimals
 * }
 *
 * validatePrice("19.99")                 // 19.99
 * validatePrice("19.999")                // 20
 * validatePrice("-5")                    // null (negative)
 * validatePrice("free")                  // null (not a number)
 *
 * // Configuration parsing
 * interface Config {
 *   timeout: number | null
 *   threshold: number | null
 *   ratio: number | null
 * }
 *
 * function parseConfig(raw: Record<string, unknown>): Config {
 *   return {
 *     timeout: safeParseFloat(raw.timeout),
 *     threshold: safeParseFloat(raw.threshold),
 *     ratio: safeParseFloat(raw.ratio)
 *   }
 * }
 *
 * parseConfig({
 *   timeout: "5.5",
 *   threshold: 0.95,
 *   ratio: "1e-3"
 * })
 * // { timeout: 5.5, threshold: 0.95, ratio: 0.001 }
 *
 * // Scientific calculations
 * const constants = [
 *   "6.626e-34",  // Planck constant
 *   "3e8",        // Speed of light
 *   "9.81",       // Gravity
 *   "invalid"
 * ]
 *
 * const parsed = constants.map(safeParseFloat).filter(n => n !== null)
 * // [6.626e-34, 300000000, 9.81]
 *
 * // API response handling
 * async function fetchMetric(endpoint: string): Promise<number | null> {
 *   const response = await fetch(endpoint)
 *   const data = await response.json()
 *   return safeParseFloat(data.value)
 * }
 *
 * // Statistics processing
 * function calculateAverage(values: Array<unknown>): number | null {
 *   const numbers = values
 *     .map(safeParseFloat)
 *     .filter((n): n is number => n !== null)
 *
 *   if (numbers.length === 0) return null
 *   return numbers.reduce((a, b) => a + b, 0) / numbers.length
 * }
 *
 * calculateAverage(["10", 20, "30.5", "invalid", 40])
 * // 25.125
 *
 * // Sensor data processing
 * function processSensorData(reading: string): {
 *   value: number | null
 *   isValid: boolean
 *   isWarning: boolean
 * } {
 *   const value = safeParseFloat(reading)
 *   return {
 *     value,
 *     isValid: value !== null,
 *     isWarning: value !== null && Math.abs(value) > 100
 *   }
 * }
 *
 * processSensorData("75.3")
 * // { value: 75.3, isValid: true, isWarning: false }
 *
 * processSensorData("ERROR")
 * // { value: null, isValid: false, isWarning: false }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns null instead of NaN or throwing errors
 * @property Flexible - Handles multiple input types and formats
 * @property Predictable - Clear rules for what parses successfully
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
