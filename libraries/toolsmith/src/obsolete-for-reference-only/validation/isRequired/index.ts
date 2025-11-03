//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
//++ Required predicate — present and non-empty (configurable by type)
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
