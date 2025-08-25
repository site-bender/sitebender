/**
 * Validates a value against a regular expression pattern
 *
 * Checks whether a value matches a given regular expression pattern.
 * Accepts either a RegExp object or a string pattern that will be
 * converted to a RegExp. Returns true if the value matches the pattern,
 * false otherwise. Non-string values return false.
 *
 * Pattern matching rules:
 * - Accepts RegExp objects or string patterns
 * - String patterns are converted to RegExp
 * - Supports all RegExp flags (g, i, m, s, u, y)
 * - Non-string values always return false
 * - Null, undefined, and empty strings are tested against the pattern
 *
 * @param pattern - The RegExp or string pattern to match against
 * @returns A curried predicate function that tests values against the pattern
 * @example
 * ```typescript
 * // Using RegExp objects
 * const isEmail = matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
 * isEmail("user@example.com")    // true
 * isEmail("invalid.email")       // false
 *
 * // Using string patterns
 * const isHexColor = matches("^#[0-9A-Fa-f]{6}$")
 * isHexColor("#FF5733")          // true
 * isHexColor("#fff")             // false
 * isHexColor("FF5733")           // false (missing #)
 *
 * // Case-insensitive matching
 * const containsHello = matches(/hello/i)
 * containsHello("Hello World")    // true
 * containsHello("HELLO there")    // true
 * containsHello("goodbye")        // false
 *
 * // Phone number validation
 * const isUSPhone = matches(/^\+?1?\d{10}$/)
 * isUSPhone("1234567890")        // true
 * isUSPhone("+11234567890")      // true
 * isUSPhone("123-456-7890")      // false (contains dashes)
 *
 * // Alphanumeric validation
 * const isAlphanumeric = matches(/^[a-zA-Z0-9]+$/)
 * isAlphanumeric("abc123")       // true
 * isAlphanumeric("ABC123")       // true
 * isAlphanumeric("abc-123")      // false (contains dash)
 *
 * // Credit card validation (simplified)
 * const isVisa = matches(/^4[0-9]{12}(?:[0-9]{3})?$/)
 * isVisa("4111111111111111")     // true
 * isVisa("5111111111111111")     // false (MasterCard prefix)
 *
 * // URL slug validation
 * const isSlug = matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
 * isSlug("hello-world")          // true
 * isSlug("hello-world-123")      // true
 * isSlug("Hello-World")          // false (uppercase)
 * isSlug("-hello-world")         // false (starts with dash)
 *
 * // Non-string values
 * const pattern = matches(/test/)
 * pattern(null)                  // false
 * pattern(undefined)             // false
 * pattern(123)                   // false
 * pattern({})                    // false
 * pattern([])                    // false
 *
 * // Empty string handling
 * const requiresContent = matches(/.+/)
 * requiresContent("")            // false
 * requiresContent(" ")           // true (contains space)
 *
 * // Form validation
 * const validators = {
 *   username: matches(/^[a-zA-Z0-9_]{3,20}$/),
 *   zipCode: matches(/^\d{5}(-\d{4})?$/),
 *   ipAddress: matches(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)
 * }
 *
 * validators.username("john_doe")     // true
 * validators.zipCode("12345")         // true
 * validators.zipCode("12345-6789")    // true
 * validators.ipAddress("192.168.1.1") // true
 *
 * // Password strength
 * const hasUppercase = matches(/[A-Z]/)
 * const hasLowercase = matches(/[a-z]/)
 * const hasNumber = matches(/\d/)
 * const hasSpecial = matches(/[!@#$%^&*]/)
 *
 * function isStrongPassword(password: string): boolean {
 *   return password.length >= 8 &&
 *          hasUppercase(password) &&
 *          hasLowercase(password) &&
 *          hasNumber(password) &&
 *          hasSpecial(password)
 * }
 *
 * // Data filtering
 * const codes = ["ABC123", "XYZ789", "123456", "DEF456"]
 * const validCodes = codes.filter(matches(/^[A-Z]{3}\d{3}$/))
 * // ["ABC123", "XYZ789", "DEF456"]
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Flexible - Accepts RegExp or string patterns
 * @property Type-safe - Returns false for non-string values
 * @property Flag-aware - Preserves RegExp flags
 */
const matches = (
	pattern: RegExp | string,
) =>
(
	value: unknown,
): boolean => {
	if (typeof value !== "string") {
		return false
	}

	const regex = typeof pattern === "string" ? new RegExp(pattern) : pattern

	return regex.test(value)
}

export default matches
