/**
 * Validates that a value's length does not exceed a maximum
 *
 * Checks whether a value has a length property that is less than or
 * equal to the specified maximum. Works with strings, arrays, and any
 * object with a numeric length property. Returns true if the length
 * is within the limit, false otherwise.
 *
 * Length validation rules:
 * - Works with strings (character count)
 * - Works with arrays (element count)
 * - Works with any object having a numeric length property
 * - Returns false for null, undefined, or non-length values
 * - Maximum is inclusive (length <= max)
 *
 * @pure
 * @curried
 * @predicate
 * @param max - The maximum allowed length (inclusive)
 * @returns A curried predicate function that validates length
 * @example
 * ```typescript
 * // String validation
 * const maxLength10 = maxLength(10)
 * maxLength10("hello")           // true (5 chars)
 * maxLength10("hello world")     // false (11 chars)
 * maxLength10("")                // true (0 chars)
 *
 * // Array validation
 * const maxItems5 = maxLength(5)
 * maxItems5([1, 2, 3])          // true (3 items)
 * maxItems5([1, 2, 3, 4, 5, 6]) // false (6 items)
 *
 * // Form validation
 * const validateUsername = maxLength(20)
 * validateUsername("john_doe")   // true
 * validateUsername("this_username_is_way_too_long") // false
 *
 * // Filtering by length
 * const names = ["Alice", "Bob", "Christopher", "Dan"]
 * names.filter(maxLength(5))     // ["Alice", "Bob", "Dan"]
 *
 * // Non-length values
 * maxLength(10)(null)            // false
 * maxLength(10)(123)             // false
 * ```
 */
const maxLength = (
	max: number,
) =>
(
	value: unknown,
): boolean => {
	if (value === null || value === undefined) {
		return false
	}

	// Check if value has a numeric length property
		if (typeof (value as ArrayLike<unknown>).length === "number") {
			return (value as ArrayLike<unknown>).length <= max
		}

	return false
}

export default maxLength
