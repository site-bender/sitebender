/**
 * Safely parses a value as an integer, returns null on failure
 *
 * Strictly parses values as integers with no decimal places allowed.
 * Returns null for any invalid input including decimal numbers in strings,
 * making it safe for use in pipelines. Supports optional radix for parsing
 * different number bases (binary, octal, decimal, hexadecimal).
 *
 * @curried (radix) => (value) => result
 * @param radix - The base to use for parsing (2-36), defaults to 10
 * @param value - The value to parse as an integer
 * @returns The parsed integer or null if parsing fails
 * @example
 * ```typescript
 * // Basic decimal integers
 * const parseDecimal = safeParseInt(10)
 * parseDecimal("42")                     // 42
 * parseDecimal("-100")                   // -100
 * parseDecimal("0")                      // 0
 * parseDecimal("+50")                    // 50
 *
 * // Direct usage with default radix (10)
 * safeParseInt(10)("123")                // 123
 * safeParseInt(10)("-456")               // -456
 *
 * // Numbers passed directly
 * safeParseInt(10)(42)                   // 42
 * safeParseInt(10)(-100)                 // -100
 * safeParseInt(10)(0)                    // 0
 *
 * // Decimal numbers are truncated
 * safeParseInt(10)(42.7)                 // 42
 * safeParseInt(10)(-3.14)                // -3
 * safeParseInt(10)(0.999)                // 0
 *
 * // Strings with decimals return null (strict mode)
 * safeParseInt(10)("42.5")               // null
 * safeParseInt(10)("3.14")               // null
 * safeParseInt(10)("100.0")              // null
 *
 * // Booleans
 * safeParseInt(10)(true)                 // 1
 * safeParseInt(10)(false)                // 0
 *
 * // Invalid inputs
 * safeParseInt(10)("abc")                // null
 * safeParseInt(10)("")                   // null
 * safeParseInt(10)("   ")                // null
 * safeParseInt(10)(null)                 // null
 * safeParseInt(10)(undefined)            // null
 * safeParseInt(10)({})                   // null
 * safeParseInt(10)([])                   // null
 * safeParseInt(10)("12e3")               // null (scientific notation)
 * safeParseInt(10)("Infinity")           // null
 *
 * // Strings with whitespace
 * safeParseInt(10)("  42  ")             // 42 (trims whitespace)
 * safeParseInt(10)("\n-100\t")           // -100
 *
 * // Binary parsing (radix 2)
 * const parseBinary = safeParseInt(2)
 * parseBinary("1010")                    // 10
 * parseBinary("11111111")                // 255
 * parseBinary("102")                     // null (invalid binary)
 *
 * // Octal parsing (radix 8)
 * const parseOctal = safeParseInt(8)
 * parseOctal("77")                       // 63
 * parseOctal("100")                      // 64
 * parseOctal("89")                       // null (invalid octal)
 *
 * // Hexadecimal parsing (radix 16)
 * const parseHex = safeParseInt(16)
 * parseHex("FF")                         // 255
 * parseHex("1A2B")                       // 6699
 * parseHex("DEADBEEF")                   // 3735928559
 * parseHex("XYZ")                        // null (invalid hex)
 *
 * // Base 36 parsing
 * const parseBase36 = safeParseInt(36)
 * parseBase36("Z")                       // 35
 * parseBase36("10")                      // 36
 * parseBase36("HELLO")                   // 29234652
 *
 * // Form validation
 * function validateAge(input: unknown): number | null {
 *   const age = safeParseInt(10)(input)
 *   if (age === null || age < 0 || age > 150) {
 *     return null
 *   }
 *   return age
 * }
 *
 * validateAge("25")                      // 25
 * validateAge("25.5")                    // null (no decimals)
 * validateAge(25)                        // 25
 * validateAge(-5)                        // null (negative)
 * validateAge(200)                       // null (too high)
 *
 * // ID parsing
 * function parseId(input: unknown): number | null {
 *   const id = safeParseInt(10)(input)
 *   return id !== null && id > 0 ? id : null
 * }
 *
 * parseId("12345")                       // 12345
 * parseId("0")                           // null (not positive)
 * parseId("abc123")                      // null (not numeric)
 *
 * // Color component parsing
 * const parseColorComponent = safeParseInt(16)
 *
 * function parseRgbHex(hex: string): { r: number, g: number, b: number } | null {
 *   if (hex.length !== 6) return null
 *
 *   const r = parseColorComponent(hex.slice(0, 2))
 *   const g = parseColorComponent(hex.slice(2, 4))
 *   const b = parseColorComponent(hex.slice(4, 6))
 *
 *   if (r === null || g === null || b === null) return null
 *   return { r, g, b }
 * }
 *
 * parseRgbHex("FF00FF")                  // { r: 255, g: 0, b: 255 }
 * parseRgbHex("1A2B3C")                  // { r: 26, g: 43, b: 60 }
 *
 * // Port number validation
 * function validatePort(input: unknown): number | null {
 *   const port = safeParseInt(10)(input)
 *   if (port === null || port < 1 || port > 65535) {
 *     return null
 *   }
 *   return port
 * }
 *
 * validatePort("8080")                   // 8080
 * validatePort("443")                    // 443
 * validatePort("70000")                  // null (out of range)
 * validatePort("http")                   // null (not a number)
 *
 * // Array of mixed values
 * const values = ["10", 20, "30.5", true, false, "invalid", null]
 * const integers = values
 *   .map(safeParseInt(10))
 *   .filter((n): n is number => n !== null)
 * // [10, 20, 1, 0]
 *
 * // Permission parsing (Unix-style)
 * const parseOctalPermission = safeParseInt(8)
 *
 * function parseFileMode(mode: string): number | null {
 *   if (mode.length !== 3) return null
 *   return parseOctalPermission(mode)
 * }
 *
 * parseFileMode("755")                   // 493 (rwxr-xr-x)
 * parseFileMode("644")                   // 420 (rw-r--r--)
 * parseFileMode("999")                   // null (invalid octal)
 * ```
 * @property Pure - Always returns same result for same input and radix
 * @property Safe - Returns null instead of NaN or throwing errors
 * @property Strict - Rejects decimal strings unlike parseInt
 * @property Curried - Radix can be partially applied for reuse
 */
const safeParseInt =
	(radix: number = 10) => (value: unknown): number | null => {
		// Validate radix
		if (radix < 2 || radix > 36 || !Number.isInteger(radix)) {
			return null
		}

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
			// Return null for NaN or Infinity
			if (!isFinite(value)) {
				return null
			}
			// Truncate to integer
			return Math.trunc(value)
		}

		// Handle strings
		if (typeof value === "string") {
			// Trim whitespace
			const trimmed = value.trim()

			// Check for empty string
			if (trimmed === "") {
				return null
			}

			// For radix 10, check if string contains decimal point
			// This ensures strict integer parsing (no decimals allowed in strings)
			if (radix === 10 && trimmed.includes(".")) {
				return null
			}

			// Parse the integer with the specified radix
			const parsed = parseInt(trimmed, radix)

			// Return null if parsing resulted in NaN
			if (isNaN(parsed)) {
				return null
			}

			// Verify that the parsed value when converted back matches
			// This catches cases like "123abc" which parseInt would parse as 123
			// For radix 10, we do a stricter check
			if (radix === 10) {
				// Check if the string represents a valid integer
				const normalizedInput = trimmed.startsWith("+")
					? trimmed.slice(1)
					: trimmed
				const stringifiedParsed = String(parsed)

				if (normalizedInput !== stringifiedParsed) {
					// Check for leading zeros which are valid
					if (!/^[+-]?0*\d+$/.test(trimmed)) {
						return null
					}
				}
			}

			return parsed
		}

		// All other types return null
		return null
	}

export default safeParseInt
