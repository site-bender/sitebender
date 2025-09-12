/**
 * Validates that a value is present and not empty
 *
 * Checks whether a value is considered "required" - meaning it must be
 * present, defined, and non-empty. Different types have different
 * definitions of "empty". This is useful for form validation and
 * ensuring data completeness. Returns false for null, undefined,
 * empty strings, empty arrays, empty objects, and other "empty" values.
 *
 * Required validation rules:
 * - Not null or undefined
 * - Strings must have non-whitespace characters
 * - Arrays must have at least one element
 * - Objects must have at least one own property
 * - Maps and Sets must have at least one entry
 * - Numbers (including 0) are always considered present
 * - Booleans (including false) are always considered present
 *
 * @param options - Optional configuration for validation behavior
 * @returns A predicate function that validates required values
 * @example
 * ```typescript
 * // Basic validation
 * const isRequiredValue = isRequired()
 * isRequiredValue("hello")         // true
 * isRequiredValue(0)               // true (zero is valid)
 * isRequiredValue(false)           // true (false is valid)
 * isRequiredValue("")              // false
 * isRequiredValue("   ")           // false (whitespace)
 * isRequiredValue([])              // false
 * isRequiredValue({})              // false
 * isRequiredValue(null)            // false
 *
 * // With options
 * const allowWhitespace = isRequired({ allowWhitespace: true })
 * allowWhitespace("   ")           // true
 *
 * const minLength3 = isRequired({ minLength: 3 })
 * minLength3("abc")                // true
 * minLength3("ab")                 // false
 *
 * // Form validation
 * const validateField = (value: unknown, name: string): string | null =>
 *   !isRequired()(value) ? `${name} is required` : null
 *
 * // Filter required values
 * const values = ["hello", "", null, 0, false, []]
 * const required = values.filter(isRequired())  // ["hello", 0, false]
 *
 * // Password validation
 * const validatePassword = (pass: string): string | null =>
 *   !isRequired({ minLength: 8 })(pass)
 *     ? "Password must be at least 8 characters"
 *     : null
 * ```
 *
 * @pure
 * @curried
 * @predicate
 */
type RequiredOptions = {
	allowWhitespace?: boolean
	minLength?: number // For strings
	minSize?: number // For arrays, objects, Maps, Sets
}

const isRequired = (
	options: RequiredOptions = {},
): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
		// Null and undefined are never valid
		if (value === null || value === undefined) {
			return false
		}

		const {
			allowWhitespace = false,
			minLength = 1,
			minSize = 1,
		} = options

		// Handle different types
		if (typeof value === "string") {
			const trimmed = allowWhitespace ? value : value.trim()
			return trimmed.length >= minLength
		}

		if (Array.isArray(value)) {
			return value.length >= minSize
		}

		if (value instanceof Map || value instanceof Set) {
			return value.size >= minSize
		}

		// WeakMap and WeakSet can't check size, consider them valid if they exist
		if (value instanceof WeakMap || value instanceof WeakSet) {
			return true
		}

		if (typeof value === "object") {
			// Check for plain objects
			const keys = Object.keys(value)
			return keys.length >= minSize
		}

		// All other types (numbers, booleans, functions, symbols, etc.) are considered valid
		// This includes:
		// - Numbers (including 0, NaN, Infinity)
		// - Booleans (including false)
		// - Functions
		// - Symbols
		// - Dates
		// - RegExp
		// - etc.
		return true
	}
}

export default isRequired
