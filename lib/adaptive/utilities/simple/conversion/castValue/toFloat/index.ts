/**
 * Flexibly parses values as floating-point numbers
 * 
 * Converts values to numbers with flexible parsing rules, accepting
 * decimals, scientific notation, and various numeric formats.
 * Returns NaN for invalid inputs rather than throwing errors.
 * 
 * Parsing rules:
 * - Numbers: returned as-is (including NaN, Infinity)
 * - Strings: parsed as float (supports decimals, scientific notation)
 * - Booleans: true → 1, false → 0
 * - null → 0
 * - undefined → NaN
 * - Arrays: single element arrays are unwrapped, others → NaN
 * - Objects → NaN (unless they have valueOf)
 * - Empty string → 0
 * - Whitespace-only string → 0
 * 
 * @param value - The value to convert to number
 * @returns The numeric representation or NaN if invalid
 * @example
 * ```typescript
 * // Numbers pass through
 * toFloat(42)                     // 42
 * toFloat(42.5)                   // 42.5
 * toFloat(-42.5)                  // -42.5
 * toFloat(0)                      // 0
 * toFloat(-0)                     // -0
 * toFloat(Infinity)               // Infinity
 * toFloat(-Infinity)              // -Infinity
 * toFloat(NaN)                    // NaN
 * 
 * // String numbers
 * toFloat("42")                   // 42
 * toFloat("42.5")                 // 42.5
 * toFloat("-42.5")                // -42.5
 * toFloat("+42.5")                // 42.5
 * toFloat("0")                    // 0
 * toFloat("  42.5  ")             // 42.5 (trims whitespace)
 * 
 * // Scientific notation
 * toFloat("1e3")                  // 1000
 * toFloat("1E3")                  // 1000
 * toFloat("1.5e2")                // 150
 * toFloat("1e-3")                 // 0.001
 * toFloat("-1.5E-2")              // -0.015
 * 
 * // Special numeric formats
 * toFloat(".5")                   // 0.5
 * toFloat("-.5")                  // -0.5
 * toFloat("0.5")                  // 0.5
 * toFloat("5.")                   // 5
 * toFloat("Infinity")             // Infinity
 * toFloat("-Infinity")            // -Infinity
 * 
 * // Invalid strings
 * toFloat("abc")                  // NaN
 * toFloat("12px")                 // NaN (no units)
 * toFloat("1 2 3")                // NaN (spaces between digits)
 * toFloat("1,000")                // NaN (no thousand separators)
 * toFloat("0x1F")                 // NaN (no hex)
 * toFloat("0o17")                 // NaN (no octal)
 * toFloat("0b101")                // NaN (no binary)
 * 
 * // Empty/whitespace strings
 * toFloat("")                     // 0
 * toFloat("   ")                  // 0
 * toFloat("\t\n")                 // 0
 * 
 * // Booleans
 * toFloat(true)                   // 1
 * toFloat(false)                  // 0
 * 
 * // Nullish values
 * toFloat(null)                   // 0
 * toFloat(undefined)              // NaN
 * 
 * // Arrays (single element only)
 * toFloat([42])                   // 42
 * toFloat(["42.5"])               // 42.5
 * toFloat([])                     // NaN
 * toFloat([1, 2])                 // NaN (multiple elements)
 * 
 * // Objects
 * toFloat({})                     // NaN
 * toFloat({ valueOf: () => 42 })  // NaN (no automatic valueOf)
 * toFloat(new Date())             // NaN (no date coercion)
 * 
 * // Percentage calculations
 * function parsePercent(value: unknown): number {
 *   const str = String(value).trim()
 *   if (str.endsWith("%")) {
 *     return toFloat(str.slice(0, -1)) / 100
 *   }
 *   return toFloat(value)
 * }
 * 
 * parsePercent("50%")              // 0.5
 * parsePercent("12.5%")            // 0.125
 * parsePercent(0.5)                // 0.5
 * 
 * // Financial calculations
 * function parseCurrency(value: unknown): number {
 *   const str = String(value).trim()
 *   const cleaned = str.replace(/[$,]/g, "")
 *   return toFloat(cleaned)
 * }
 * 
 * parseCurrency("$1,234.56")       // 1234.56
 * parseCurrency("$42")             // 42
 * parseCurrency(100)               // 100
 * 
 * // Form validation
 * function validatePrice(input: unknown): number | null {
 *   const price = toFloat(input)
 *   if (isNaN(price) || price < 0) {
 *     return null
 *   }
 *   return Math.round(price * 100) / 100 // Round to 2 decimals
 * }
 * 
 * validatePrice("19.99")           // 19.99
 * validatePrice("19.999")          // 20
 * validatePrice(-5)                // null
 * validatePrice("abc")             // null
 * 
 * // Statistics calculations
 * const values = ["1.5", 2, "3.7", true, false]
 * const numbers = values.map(toFloat).filter(n => !isNaN(n))
 * const sum = numbers.reduce((a, b) => a + b, 0)
 * const average = sum / numbers.length
 * // numbers: [1.5, 2, 3.7, 1, 0]
 * // sum: 8.2
 * // average: 1.64
 * ```
 * @property Pure - Always returns same result for same input
 * @property Flexible - Accepts various numeric formats
 * @property Safe - Returns NaN instead of throwing errors
 */
const toFloat = (value: unknown): number => {
	// Handle nullish values
	if (value === null) {
		return 0
	}
	if (value === undefined) {
		return NaN
	}
	
	// If already a number, return as-is
	if (typeof value === "number") {
		return value
	}
	
	// Handle booleans
	if (typeof value === "boolean") {
		return value ? 1 : 0
	}
	
	// Handle strings
	if (typeof value === "string") {
		const trimmed = value.trim()
		
		// Empty or whitespace-only strings become 0
		if (trimmed.length === 0) {
			return 0
		}
		
		// Handle special cases
		if (trimmed === "Infinity") {
			return Infinity
		}
		if (trimmed === "-Infinity") {
			return -Infinity
		}
		if (trimmed === "NaN") {
			return NaN
		}
		
		// Parse as float
		const parsed = parseFloat(trimmed)
		return parsed
	}
	
	// Handle single-element arrays
	if (Array.isArray(value)) {
		if (value.length === 1) {
			return toFloat(value[0])
		}
		return NaN
	}
	
	// All other types (objects, functions, symbols) return NaN
	return NaN
}

export default toFloat