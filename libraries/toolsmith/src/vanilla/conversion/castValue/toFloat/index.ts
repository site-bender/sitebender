import length from "../../../array/length/index.ts"
import isEmpty from "../../../string/isEmpty/index.ts"
import trim from "../../../string/trim/index.ts"
import isArray from "../../../validation/isArray/index.ts"
import isBoolean from "../../../validation/isBoolean/index.ts"
import isEqual from "../../../validation/isEqual/index.ts"
import isNull from "../../../validation/isNull/index.ts"
import isNumber from "../../../validation/isNumber/index.ts"
import isString from "../../../validation/isString/index.ts"
import isUndefined from "../../../validation/isUndefined/index.ts"

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
 * @pure
 * @safe
 * @param value - The value to convert to number
 * @returns The numeric representation or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * toFloat(42.5)                   // 42.5
 * toFloat("42.5")                 // 42.5
 * toFloat("1e3")                  // 1000
 * toFloat(true)                   // 1
 *
 * // Edge cases
 * toFloat("")                     // 0
 * toFloat(null)                   // 0
 * toFloat(undefined)              // NaN
 * toFloat("abc")                  // NaN
 * toFloat({})                     // NaN
 *
 * // Arrays (single element only)
 * toFloat([42])                   // 42
 * toFloat([1, 2])                 // NaN
 *
 * // Practical usage with filtering
 * const values = ["1.5", 2, "3.7", "invalid"]
 * const numbers = values.map(toFloat).filter(n => !isNaN(n))
 * // numbers: [1.5, 2, 3.7]
 * ```
 */
export default function toFloat(value: unknown): number {
	// Handle nullish values
	if (isNull(value)) {
		return 0
	}
	if (isUndefined(value)) {
		return NaN
	}

	// If already a number, return as-is
	if (isNumber(value)) {
		return value
	}

	// Handle booleans
	if (isBoolean(value)) {
		return value ? 1 : 0
	}

	// Handle strings
	if (isString(value)) {
		const trimmed = trim(value)

		// Empty or whitespace-only strings become 0
		if (isEmpty(trimmed)) {
			return 0
		}

		// Handle special cases
		if (isEqual("Infinity")(trimmed)) {
			return Infinity
		}
		if (isEqual("-Infinity")(trimmed)) {
			return -Infinity
		}
		if (isEqual("NaN")(trimmed)) {
			return NaN
		}

		// Parse as float
		const parsed = parseFloat(trimmed)
		return parsed
	}

	// Handle single-element arrays
	if (isArray(value)) {
		if (isEqual(1)(length(value))) {
			return toFloat(value[0])
		}
		return NaN
	}

	// All other types (objects, functions, symbols) return NaN
	return NaN
}
