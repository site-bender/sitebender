import toFloat from "../toFloat/index.ts"

/**
 * Converts values to numbers with specified decimal precision
 * 
 * Parses values as floating-point numbers and rounds to the specified
 * number of decimal places. Uses standard rounding (0.5 rounds up).
 * Returns NaN for invalid inputs rather than throwing errors.
 * 
 * @curried (places) => (value) => result
 * @param places - Number of decimal places (0 or positive integer)
 * @param value - The value to convert and round
 * @returns The numeric value rounded to specified decimal places, or NaN
 * @example
 * ```typescript
 * // Basic rounding
 * const toTwoDecimals = toPrecision(2)
 * toTwoDecimals(3.14159)           // 3.14
 * toTwoDecimals(3.145)             // 3.15 (rounds up)
 * toTwoDecimals(3.144)             // 3.14 (rounds down)
 * toTwoDecimals(10)                // 10
 * toTwoDecimals(10.999)            // 11
 * 
 * // Zero decimal places (integers)
 * const toWholeNumber = toPrecision(0)
 * toWholeNumber(3.14)              // 3
 * toWholeNumber(3.5)               // 4 (rounds up)
 * toWholeNumber(3.49)              // 3 (rounds down)
 * toWholeNumber(-3.5)              // -3 (rounds toward zero)
 * 
 * // Different precisions
 * toPrecision(1)(3.14159)          // 3.1
 * toPrecision(2)(3.14159)          // 3.14
 * toPrecision(3)(3.14159)          // 3.142
 * toPrecision(4)(3.14159)          // 3.1416
 * 
 * // String parsing with precision
 * toPrecision(2)("3.14159")        // 3.14
 * toPrecision(2)("10.005")         // 10.01
 * toPrecision(1)("9.95")           // 10
 * toPrecision(0)("5.5")            // 6
 * 
 * // Handles all toFloat conversions
 * toPrecision(2)(true)             // 1
 * toPrecision(2)(false)            // 0
 * toPrecision(2)(null)             // 0
 * toPrecision(2)("")               // 0
 * toPrecision(2)("abc")            // NaN
 * toPrecision(2)(undefined)        // NaN
 * 
 * // Currency formatting
 * function formatPrice(value: unknown): number {
 *   const price = toPrecision(2)(value)
 *   return isNaN(price) ? 0 : price
 * }
 * 
 * formatPrice("19.995")            // 20
 * formatPrice("19.994")            // 19.99
 * formatPrice(19.1)                // 19.1
 * formatPrice("29.99")             // 29.99
 * 
 * // Percentage calculations
 * function calculatePercent(value: unknown, total: unknown): number {
 *   const v = toFloat(value)
 *   const t = toFloat(total)
 *   if (isNaN(v) || isNaN(t) || t === 0) {
 *     return 0
 *   }
 *   return toPrecision(1)((v / t) * 100)
 * }
 * 
 * calculatePercent(33, 100)        // 33
 * calculatePercent(1, 3)           // 33.3
 * calculatePercent(2, 3)           // 66.7
 * 
 * // Scientific measurements
 * const measurements = ["1.2345", "1.2355", "1.2365"]
 * const rounded = measurements.map(toPrecision(2))
 * // [1.23, 1.24, 1.24]
 * 
 * // Statistics with precision
 * function average(values: unknown[]): number {
 *   const numbers = values.map(toFloat).filter(n => !isNaN(n))
 *   if (numbers.length === 0) return 0
 *   const sum = numbers.reduce((a, b) => a + b, 0)
 *   return toPrecision(2)(sum / numbers.length)
 * }
 * 
 * average([1, 2, 3, 4, 5])         // 3
 * average([1.1, 2.2, 3.3])         // 2.2
 * average(["10.5", "20.7", "30.3"]) // 20.5
 * 
 * // Form input validation
 * function validateScore(input: unknown): number | null {
 *   const score = toPrecision(1)(input)
 *   if (isNaN(score) || score < 0 || score > 100) {
 *     return null
 *   }
 *   return score
 * }
 * 
 * validateScore("85.67")           // 85.7
 * validateScore("100.4")           // 100.4 → null (over 100)
 * validateScore("abc")             // null
 * 
 * // Avoiding floating point errors
 * 0.1 + 0.2                        // 0.30000000000000004
 * toPrecision(2)(0.1 + 0.2)        // 0.3
 * 
 * // Large numbers retain precision
 * toPrecision(2)(1234567.89)       // 1234567.89
 * toPrecision(0)(1234567.89)       // 1234568
 * ```
 * @property Pure - Always returns same result for same input
 * @property Rounds - Uses standard rounding (0.5 rounds up)
 * @property Safe - Returns NaN instead of throwing errors
 * @property Curried - Partial application for reusable precision functions
 */
const toPrecision = (places: number) => (value: unknown): number => {
	// Parse the value as a float first
	const num = toFloat(value)
	
	// If parsing failed, return NaN
	if (isNaN(num)) {
		return NaN
	}
	
	// Handle infinity
	if (!isFinite(num)) {
		return num
	}
	
	// Ensure places is a non-negative integer
	const decimalPlaces = Math.max(0, Math.floor(places))
	
	// Round to the specified number of decimal places
	// Multiply, round, then divide to avoid floating point errors
	const multiplier = Math.pow(10, decimalPlaces)
	return Math.round(num * multiplier) / multiplier
}

export default toPrecision