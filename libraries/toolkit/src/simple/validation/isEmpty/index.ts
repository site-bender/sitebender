/**
 * Checks if a value is empty based on its type
 *
 * Determines emptiness for various data types using type-appropriate checks.
 * Different types have different definitions of "empty": arrays/strings by length,
 * objects by key count, Maps/Sets by size, and nullish values are considered empty.
 * This is useful for validation, conditional rendering, and filtering operations.
 *
 * Emptiness rules:
 * - null/undefined: always empty
 * - Strings: empty if length === 0
 * - Arrays: empty if length === 0
 * - Objects: empty if no own enumerable properties
 * - Maps/Sets: empty if size === 0
 * - Numbers: never empty (including 0)
 * - Booleans: never empty (including false)
 * - Functions: never empty
 *
 * @param value - The value to check for emptiness
 * @returns True if the value is empty, false otherwise
 * @example
 * ```typescript
 * // Nullish values are empty
 * isEmpty(null)                      // true
 * isEmpty(undefined)                 // true
 * 
 * // Strings and arrays check length
 * isEmpty("")                        // true
 * isEmpty("   ")                     // false (whitespace is not empty)
 * isEmpty([])                        // true
 * isEmpty([1, 2, 3])                 // false
 * 
 * // Objects check for own enumerable properties
 * isEmpty({})                        // true
 * isEmpty({ a: 1 })                  // false
 * isEmpty(Object.create({ a: 1 }))   // true (inherited props don't count)
 * 
 * // Maps/Sets check size, numbers/booleans never empty
 * isEmpty(new Map())                 // true
 * isEmpty(new Set([1, 2]))           // false
 * isEmpty(0)                         // false
 * isEmpty(false)                     // false
 * 
 * // Form validation example
 * function validateForm(data: { name: string; email: string }) {
 *   const errors: string[] = []
 *   if (isEmpty(data.name)) errors.push("Name is required")
 *   if (isEmpty(data.email)) errors.push("Email is required")
 *   return errors
 * }
 * 
 * // Filter out empty values
 * const data = ["hello", "", null, [], "world", {}]
 * const nonEmpty = data.filter(item => !isEmpty(item))
 * // ["hello", "world"]
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isEmpty = (value: unknown): boolean => {
	// Nullish values are empty
	if (value == null) {
		return true
	}

	// Strings and arrays check length
	if (typeof value === "string" || Array.isArray(value)) {
		return value.length === 0
	}

	// Array-like objects check length
	if (
		typeof value === "object" && "length" in value &&
		typeof value.length === "number"
	) {
		return value.length === 0
	}

	// Maps and Sets check size
	if (value instanceof Map || value instanceof Set) {
		return value.size === 0
	}

	// WeakMaps and WeakSets can't be determined as empty
	if (value instanceof WeakMap || value instanceof WeakSet) {
		return false
	}

	// Plain objects check for own enumerable properties
	if (typeof value === "object" && value.constructor === Object) {
		return Object.keys(value).length === 0
	}

	// All other values (numbers, booleans, functions, etc.) are not empty
	return false
}

export default isEmpty
