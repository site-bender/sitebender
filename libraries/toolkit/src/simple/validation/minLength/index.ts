/**
 * Validates that a value's length meets a minimum requirement
 *
 * Checks whether a value has a length property that is greater than or
 * equal to the specified minimum. Works with strings, arrays, and any
 * object with a numeric length property. Returns true if the length
 * meets the minimum, false otherwise.
 *
 * Length validation rules:
 * - Works with strings (character count)
 * - Works with arrays (element count)
 * - Works with any object having a numeric length property
 * - Returns false for null, undefined, or non-length values
 * - Minimum is inclusive (length >= min)
 *
 * @pure
 * @curried
 * @predicate
 * @param min - The minimum required length (inclusive)
 * @returns A curried predicate function that validates length
 * @example
 * ```typescript
 * // String validation
 * const minLength5 = minLength(5)
 * minLength5("hello")            // true (exactly 5)
 * minLength5("hi")               // false (2 chars)
 * minLength5("")                 // false (empty)
 *
 * // Array validation
 * const minItems3 = minLength(3)
 * minItems3([1, 2, 3, 4])       // true (4 items)
 * minItems3([1, 2])             // false (2 items)
 *
 * // Password validation
 * const minPasswordLength = minLength(8)
 * minPasswordLength("12345")     // false
 * minPasswordLength("12345678")  // true
 *
 * // Required field validation
 * const isRequired = minLength(1)
 * isRequired("")                // false (empty)
 * isRequired("a")               // true
 *
 * // Non-length values
 * minLength(5)(null)            // false
 * minLength(5)(123)             // false
 * ```
 */
const minLength = (
	min: number,
) =>
(
	value: unknown,
): boolean => {
	if (value === null || value === undefined) {
		return false
	}

	// Check if value has a numeric length property
		if (typeof (value as ArrayLike<unknown>).length === "number") {
			return (value as ArrayLike<unknown>).length >= min
		}

	return false
}

export default minLength
