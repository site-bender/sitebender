import isNullish from "../../../validation/isNullish/index.ts"

/**
 * Uppercases only the first character of a string
 *
 * Converts the first character to uppercase while leaving the rest
 * of the string unchanged. Useful for capitalizing words, creating
 * PascalCase identifiers, or starting sentences properly.
 *
 * @param str - String to process
 * @returns String with first character uppercased
 * @example
 * ```typescript
 * // Basic capitalization
 * toUpperFirst("hello")  // "Hello"
 *
 * // Already uppercase
 * toUpperFirst("Hello")  // "Hello"
 *
 * // All lowercase
 * toUpperFirst("hello world")  // "Hello world"
 *
 * // camelCase to PascalCase
 * toUpperFirst("camelCase")  // "CamelCase"
 *
 * // Single character
 * toUpperFirst("a")  // "A"
 *
 * // Empty string
 * toUpperFirst("")  // ""
 *
 * // Number/symbol start (unchanged)
 * toUpperFirst("123abc")  // "123abc"
 *
 * // Variable to class name
 * toUpperFirst("userController")  // "UserController"
 *
 * // Unicode support
 * toUpperFirst("über")  // "Über"
 *
 * // Handle null/undefined
 * toUpperFirst(null)  // ""
 * ```
 * @pure - Function has no side effects
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 */
const toUpperFirst = (
	str: string | null | undefined,
): string => {
	if (isNullish(str) || typeof str !== "string" || str.length === 0) {
		return ""
	}

	return str[0].toUpperCase() + str.slice(1)
}

export default toUpperFirst
