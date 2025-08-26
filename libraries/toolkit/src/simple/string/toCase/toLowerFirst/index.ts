/**
 * Lowercases only the first character of a string
 *
 * Converts the first character to lowercase while leaving the rest
 * of the string unchanged. Useful for converting PascalCase to camelCase,
 * adjusting sentence formatting, or creating identifiers.
 *
 * @param str - String to process
 * @returns String with first character lowercased
 * @example
 * ```typescript
 * // PascalCase to camelCase
 * toLowerFirst("PascalCase")  // "pascalCase"
 *
 * // Already lowercase
 * toLowerFirst("hello")  // "hello"
 *
 * // All caps
 * toLowerFirst("HELLO")  // "hELLO"
 *
 * // Single character
 * toLowerFirst("A")  // "a"
 *
 * // Empty string
 * toLowerFirst("")  // ""
 *
 * // Number/symbol start (unchanged)
 * toLowerFirst("123abc")  // "123abc"
 *
 * // Class to variable name
 * toLowerFirst("UserController")  // "userController"
 *
 * // Unicode support
 * toLowerFirst("Über")  // "über"
 *
 * // Handle null/undefined
 * toLowerFirst(null)  // ""
 * ```
 * @pure - Function has no side effects
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 */
const toLowerFirst = (
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string" || str.length === 0) {
		return ""
	}

	return str[0].toLowerCase() + str.slice(1)
}

export default toLowerFirst
