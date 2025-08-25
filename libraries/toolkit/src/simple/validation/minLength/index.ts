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
 * @param min - The minimum required length (inclusive)
 * @returns A curried predicate function that validates length
 * @example
 * ```typescript
 * // String validation
 * const minLength5 = minLength(5)
 * minLength5("hello")            // true (exactly 5)
 * minLength5("hello world")      // true (11 chars)
 * minLength5("hi")               // false (2 chars)
 * minLength5("")                 // false (0 chars)
 *
 * // Array validation
 * const minItems3 = minLength(3)
 * minItems3([1, 2, 3])          // true (exactly 3)
 * minItems3([1, 2, 3, 4])       // true (4 items)
 * minItems3([1, 2])             // false (2 items)
 * minItems3([])                 // false (0 items)
 *
 * // Password validation
 * const minPasswordLength = minLength(8)
 * function validatePassword(password: string): string | null {
 *   if (!minPasswordLength(password)) {
 *     return "Password must be at least 8 characters"
 *   }
 *   return null
 * }
 *
 * validatePassword("12345")     // "Password must be..."
 * validatePassword("12345678")  // null
 *
 * // Username validation
 * const minUsernameLength = minLength(3)
 * minUsernameLength("ab")       // false
 * minUsernameLength("abc")      // true
 * minUsernameLength("john_doe") // true
 *
 * // Required field validation
 * const isRequired = minLength(1)
 * isRequired("")                // false (empty)
 * isRequired("a")               // true
 * isRequired([])                // false (empty array)
 * isRequired([1])               // true
 *
 * // TypedArray validation
 * const minBytes = minLength(256)
 * const buffer = new Uint8Array(512)
 * minBytes(buffer)              // true (512 bytes)
 *
 * // Non-length values
 * const validator = minLength(5)
 * validator(null)               // false
 * validator(undefined)          // false
 * validator(123)                // false
 * validator({})                 // false
 * validator({ length: "5" })    // false (non-numeric length)
 *
 * // Filtering by minimum length
 * const words = ["a", "an", "the", "hello", "world"]
 * const significantWords = words.filter(minLength(3))
 * // ["the", "hello", "world"]
 *
 * // Form array validation
 * interface FormData {
 *   tags: Array<string>
 *   attachments: Array<File>
 * }
 *
 * function validateForm(data: FormData): string | null {
 *   const minTags = minLength(1)
 *   const minAttachments = minLength(1)
 *
 *   if (!minTags(data.tags)) {
 *     return "At least one tag is required"
 *   }
 *   if (!minAttachments(data.attachments)) {
 *     return "At least one attachment is required"
 *   }
 *   return null
 * }
 *
 * // Phone number validation
 * const isValidPhone = minLength(10)
 * isValidPhone("123456789")    // false (9 digits)
 * isValidPhone("1234567890")   // true (10 digits)
 *
 * // Description validation
 * const hasDescription = minLength(10)
 * hasDescription("Too short")   // false (9 chars)
 * hasDescription("Just right!") // true (11 chars)
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Polymorphic - Works with any value having a length property
 * @property Inclusive - Minimum value is included (>=)
 * @property Type-safe - Returns false for invalid types
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
	const obj = value as any
	if (typeof obj.length === "number") {
		return obj.length >= min
	}

	return false
}

export default minLength
