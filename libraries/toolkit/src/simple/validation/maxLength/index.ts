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
 * @param max - The maximum allowed length (inclusive)
 * @returns A curried predicate function that validates length
 * @example
 * ```typescript
 * // String validation
 * const maxLength10 = maxLength(10)
 * maxLength10("hello")           // true (5 chars)
 * maxLength10("hello world")     // false (11 chars)
 * maxLength10("1234567890")      // true (exactly 10)
 * maxLength10("")                // true (0 chars)
 *
 * // Array validation
 * const maxItems5 = maxLength(5)
 * maxItems5([1, 2, 3])          // true (3 items)
 * maxItems5([1, 2, 3, 4, 5])    // true (exactly 5)
 * maxItems5([1, 2, 3, 4, 5, 6]) // false (6 items)
 * maxItems5([])                 // true (0 items)
 *
 * // Form validation
 * const validateUsername = maxLength(20)
 * const validateBio = maxLength(500)
 *
 * validateUsername("john_doe")   // true
 * validateUsername("this_username_is_way_too_long") // false
 *
 * // Password length limit
 * const maxPasswordLength = maxLength(128)
 * function validatePassword(password: string): string | null {
 *   if (!maxPasswordLength(password)) {
 *     return "Password must be 128 characters or less"
 *   }
 *   return null
 * }
 *
 * // Array size limits
 * const maxTags = maxLength(10)
 * const tags = ["javascript", "typescript", "react"]
 * maxTags(tags)                  // true (3 tags)
 *
 * // TypedArray validation
 * const maxBytes = maxLength(1024)
 * const buffer = new Uint8Array(512)
 * maxBytes(buffer)               // true (512 bytes)
 *
 * // Non-length values
 * const validator = maxLength(10)
 * validator(null)                // false
 * validator(undefined)           // false
 * validator(123)                 // false
 * validator({})                  // false
 * validator({ length: "10" })    // false (non-numeric length)
 *
 * // Filtering by length
 * const names = ["Alice", "Bob", "Christopher", "Dan", "Elizabeth"]
 * const shortNames = names.filter(maxLength(5))
 * // ["Alice", "Bob", "Dan"]
 *
 * // Comment length validation
 * interface Comment {
 *   text: string
 *   author: string
 * }
 *
 * function validateComment(comment: Comment): boolean {
 *   const maxCommentLength = maxLength(1000)
 *   const maxAuthorLength = maxLength(50)
 *
 *   return maxCommentLength(comment.text) &&
 *          maxAuthorLength(comment.author)
 * }
 *
 * // SMS message validation (160 char limit)
 * const isSMSLength = maxLength(160)
 * isSMSLength("Short message")   // true
 * isSMSLength("A".repeat(161))   // false
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Polymorphic - Works with any value having a length property
 * @property Inclusive - Maximum value is included (<=)
 * @property Type-safe - Returns false for invalid types
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
	const obj = value as any
	if (typeof obj.length === "number") {
		return obj.length <= max
	}

	return false
}

export default maxLength
