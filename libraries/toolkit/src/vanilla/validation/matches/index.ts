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
 * @pure
 * @curried
 * @predicate
 * @param pattern - The RegExp or string pattern to match against
 * @returns A curried predicate function that tests values against the pattern
 * @example
 * ```typescript
 * // Basic pattern matching
 * const isEmail = matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
 * isEmail("user@example.com")    // true
 * isEmail("invalid.email")       // false
 *
 * // String patterns
 * const isHexColor = matches("^#[0-9A-Fa-f]{6}$")
 * isHexColor("#FF5733")          // true
 * isHexColor("#fff")             // false
 *
 * // Case-insensitive matching
 * const containsHello = matches(/hello/i)
 * containsHello("Hello World")    // true
 * containsHello("goodbye")        // false
 *
 * // Form validation
 * const validators = {
 *   username: matches(/^[a-zA-Z0-9_]{3,20}$/),
 *   zipCode: matches(/^\d{5}(-\d{4})?$/),
 * }
 * validators.username("john_doe")     // true
 * validators.zipCode("12345-6789")    // true
 *
 * // Non-string values
 * matches(/test/)(null)          // false
 * matches(/test/)(123)           // false
 * ```
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
