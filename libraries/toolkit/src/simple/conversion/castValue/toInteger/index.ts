/**
 * Strictly parses values as integers
 *
 * Converts values to integers with strict parsing rules. Only accepts
 * valid integer representations without decimals or scientific notation.
 * Returns NaN for invalid inputs rather than throwing errors, making it
 * easy to wrap in monadic error handling later.
 *
 * Parsing rules:
 * - Numbers: Truncates decimals (Math.trunc)
 * - Strings: Must be valid integer format (no decimals, no scientific notation)
 * - Booleans: true → 1, false → 0
 * - null → 0
 * - undefined → NaN
 * - Objects/Arrays → NaN
 * - Empty string → NaN
 * - Whitespace-only string → NaN
 *
 * @param value - The value to convert to integer
 * @returns The integer representation or NaN if invalid
 * @example
 * ```typescript
 * // Numbers (truncates decimals)
 * toInteger(42)                    // 42
 * toInteger(42.7)                  // 42
 * toInteger(42.2)                  // 42
 * toInteger(-42.9)                 // -42
 * toInteger(0)                     // 0
 * toInteger(-0)                    // 0
 * toInteger(Infinity)              // NaN
 * toInteger(-Infinity)             // NaN
 * toInteger(NaN)                   // NaN
 *
 * // String integers
 * toInteger("42")                  // 42
 * toInteger("-42")                 // -42
 * toInteger("0")                   // 0
 * toInteger("+123")                // 123
 * toInteger("  42  ")              // 42 (trims whitespace)
 *
 * // Invalid strings
 * toInteger("42.5")                // NaN (no decimals allowed)
 * toInteger("1e3")                 // NaN (no scientific notation)
 * toInteger("1E3")                 // NaN
 * toInteger("0x1F")                // NaN (no hex)
 * toInteger("0o17")                // NaN (no octal)
 * toInteger("0b101")               // NaN (no binary)
 * toInteger("42px")                // NaN (no units)
 * toInteger("abc")                 // NaN
 * toInteger("")                    // NaN
 * toInteger("   ")                 // NaN
 *
 * // Booleans
 * toInteger(true)                  // 1
 * toInteger(false)                 // 0
 *
 * // Nullish values
 * toInteger(null)                  // 0
 * toInteger(undefined)             // NaN
 *
 * // Objects and arrays
 * toInteger({})                    // NaN
 * toInteger([])                    // NaN
 * toInteger([42])                  // NaN (no array coercion)
 * toInteger({ valueOf: () => 42 }) // NaN (no object coercion)
 *
 * // Validation pattern
 * function parseAge(input: unknown): number | null {
 *   const age = toInteger(input)
 *   if (isNaN(age) || age < 0 || age > 150) {
 *     return null
 *   }
 *   return age
 * }
 *
 * parseAge("25")                   // 25
 * parseAge("25.5")                 // null (decimals not allowed)
 * parseAge(-5)                     // null (negative age)
 * parseAge("abc")                  // null (invalid)
 *
 * // Form input parsing
 * const quantity = toInteger(formData.get("quantity"))
 * if (isNaN(quantity)) {
 *   throw new Error("Please enter a valid quantity")
 * }
 *
 * // Configuration parsing
 * const config = {
 *   port: "3000",
 *   timeout: "5000",
 *   maxRetries: "3",
 *   debugLevel: "2"
 * }
 *
 * const settings = {
 *   port: toInteger(config.port),           // 3000
 *   timeout: toInteger(config.timeout),     // 5000
 *   maxRetries: toInteger(config.maxRetries), // 3
 *   debugLevel: toInteger(config.debugLevel)  // 2
 * }
 *
 * // Array indexing
 * function getItem<T>(array: T[], index: unknown): T | undefined {
 *   const i = toInteger(index)
 *   if (isNaN(i) || i < 0 || i >= array.length) {
 *     return undefined
 *   }
 *   return array[i]
 * }
 *
 * const items = ["a", "b", "c"]
 * getItem(items, "1")              // "b"
 * getItem(items, 1.7)              // "b" (truncated to 1)
 * getItem(items, "1.5")            // undefined (decimals not allowed in string)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Strict - Only accepts valid integer formats
 * @property Safe - Returns NaN instead of throwing errors
 */
const toInteger = (value: unknown): number => {
	// Handle nullish values
	if (value === null) {
		return 0
	}
	if (value === undefined) {
		return NaN
	}

	// Handle booleans
	if (typeof value === "boolean") {
		return value ? 1 : 0
	}

	// Handle numbers (truncate decimals)
	if (typeof value === "number") {
		if (!isFinite(value)) {
			return NaN
		}
		return Math.trunc(value)
	}

	// Handle strings with strict integer parsing
	if (typeof value === "string") {
		const trimmed = value.trim()

		// Empty or whitespace-only strings
		if (trimmed.length === 0) {
			return NaN
		}

		// Check for valid integer format (optional +/- followed by digits only)
		if (!/^[+-]?\d+$/.test(trimmed)) {
			return NaN
		}

		// Parse as integer
		const parsed = parseInt(trimmed, 10)

		// Additional safety check
		if (!isFinite(parsed)) {
			return NaN
		}

		return parsed
	}

	// All other types (objects, arrays, functions, symbols) return NaN
	return NaN
}

export default toInteger
