import isNullish from "../../validation/isNullish/index.ts"
import lt from "../../validation/lt/index.ts"
import gt from "../../validation/gt/index.ts"
import anyPass from "../../validation/anyPass/index.ts"
import allPass from "../../validation/allPass/index.ts"
import trim from "../../string/trim/index.ts"
import contains from "../../string/contains/index.ts"
import slice from "../../string/slice/index.ts"
import isBoolean from "../../validation/isBoolean/index.ts"
import isNumber from "../../validation/isNumber/index.ts"
import isString from "../../validation/isString/index.ts"
import isInteger from "../../validation/isInteger/index.ts"
import truncate from "../../math/truncate/index.ts"
import isFinite from "../../validation/isFinite/index.ts"
import isNaN from "../../validation/isNaN/index.ts"
import toString from "../castValue/toString/index.ts"
import startsWith from "../../string/startsWith/index.ts"
import not from "../../logic/not/index.ts"
import isEmpty from "../../string/isEmpty/index.ts"
import isEqual from "../../validation/isEqual/index.ts"

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
export default function safeParseInt(
	radix: number = 10,
): (value: unknown) => number | null {
	return function safeParseIntInner(value: unknown): number | null {
		// Validate radix
		if (anyPass([lt(2), gt(36), not(isInteger)])(radix)) {
			return null
		}

		// Handle null and undefined
		if (isNullish(value)) {
			return null
		}

		// Handle booleans
		if (isBoolean(value)) {
			return value ? 1 : 0
		}

		// Handle numbers directly
		if (isNumber(value)) {
			// Return null for NaN or Infinity
			if (not(isFinite(value))) {
				return null
			}
			// Truncate to integer
			return truncate(value)
		}

		// Handle strings
		if (isString(value)) {
			// Trim whitespace
			const trimmed = trim(value) // Check for empty string
			if (isEmpty(trimmed)) {
				return null
			}

			// For radix 10, check if string contains decimal point
			// This ensures strict integer parsing (no decimals allowed in strings)
			function hasDecimalPoint() {
				return contains(".")(trimmed)
			}
			if (allPass([isEqual(10), hasDecimalPoint])(radix)) {
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
			if (isEqual(10)(radix)) {
				// Check if the string represents a valid integer
				const normalizedInput = startsWith("+")(trimmed)
					? slice(1)()(trimmed)
					: trimmed
				const stringifiedParsed = toString(parsed)

				if (isEqual(normalizedInput)(stringifiedParsed)) {
					return parsed
				}

				// Check for leading zeros which are valid
				if (!/^[+-]?0*\d+$/.test(trimmed)) {
					return null
				}
			}

			return parsed
		}

		// All other types return null
		return null
	}
}
