import isNull from "../../validation/isNull/index.ts"
import isUndefined from "../../validation/isUndefined/index.ts"

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
 * // Basic usage (decimal)
 * const parseInt = safeParseInt(10)
 * parseInt("42")                     // 42
 * parseInt("-100")                   // -100
 * parseInt(42.7)                     // 42 (truncates)
 * parseInt("42.5")                   // null (strict: no decimals in strings)
 *
 * // Different radix parsing
 * safeParseInt(2)("1010")            // 10 (binary)
 * safeParseInt(8)("77")              // 63 (octal)
 * safeParseInt(16)("FF")             // 255 (hex)
 *
 * // Invalid inputs
 * parseInt("abc")                    // null
 * parseInt(null)                     // null
 * parseInt("")                       // null
 *
 * // Validation pattern
 * const age = safeParseInt(10)(input)
 * if (age === null || age < 0 || age > 150) {
 *   throw new Error("Invalid age")
 * }
 * ```
 * @pure
 * @safe
 */
const safeParseInt =
	(radix: number = 10) => (value: unknown): number | null => {
		// Validate radix
		if (radix < 2 || radix > 36 || !Number.isInteger(radix)) {
			return null
		}

		// Handle null and undefined
		if (isNull(value) || isUndefined(value)) {
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
