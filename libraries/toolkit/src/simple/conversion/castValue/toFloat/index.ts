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
