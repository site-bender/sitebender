import isNull from "../../../validation/isNull/index.ts"
import isUndefined from "../../../validation/isUndefined/index.ts"
import trim from "../../../string/trim/index.ts"
import isBoolean from "../../../validation/isBoolean/index.ts"
import isNumber from "../../../validation/isNumber/index.ts"
import isString from "../../../validation/isString/index.ts"
import isFinite from "../../../validation/isFinite/index.ts"
import not from "../../../logic/not/index.ts"
import truncate from "../../../math/truncate/index.ts"
import isEmpty from "../../../string/isEmpty/index.ts"

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
 * @pure
 * @safe
 * @param value - The value to convert to integer
 * @returns The integer representation or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * toInteger(42)                    // 42
 * toInteger(42.7)                  // 42 (truncates)
 * toInteger("42")                  // 42
 * toInteger("-42")                 // -42
 *
 * // Invalid strings
 * toInteger("42.5")                // NaN (no decimals in strings)
 * toInteger("1e3")                 // NaN (no scientific notation)
 * toInteger("")                    // NaN
 *
 * // Edge cases
 * toInteger(true)                  // 1
 * toInteger(null)                  // 0
 * toInteger(undefined)             // NaN
 * toInteger({})                    // NaN
 *
 * // Validation pattern
 * const age = toInteger(input)
 * if (isNaN(age) || age < 0 || age > 150) {
 *   throw new Error("Invalid age")
 * }
 * ```
 */
export default function toInteger(value: unknown): number {
	// Handle nullish values
	if (isNull(value)) {
		return 0
	}
	if (isUndefined(value)) {
		return NaN
	}

	// Handle booleans
	if (isBoolean(value)) {
		return value ? 1 : 0
	}

	// Handle numbers (truncate decimals)
	if (isNumber(value)) {
		if (not(isFinite(value))) {
			return NaN
		}
		return truncate(value)
	}

	// Handle strings with strict integer parsing
	if (isString(value)) {
		const trimmed = trim(value)

		// Empty or whitespace-only strings
		if (isEmpty(trimmed)) {
			return NaN
		}

		// Check for valid integer format (optional +/- followed by digits only)
		if (!/^[+-]?\d+$/.test(trimmed)) {
			return NaN
		}

		// Parse as integer
		const parsed = parseInt(trimmed, 10)

		// Additional safety check
		if (not(isFinite(parsed))) {
			return NaN
		}

		return parsed
	}

	// All other types (objects, arrays, functions, symbols) return NaN
	return NaN
}
