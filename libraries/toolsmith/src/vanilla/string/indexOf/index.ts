import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns the index of the first occurrence of a substring
 *
 * Finds the position of the first occurrence of a substring within a string,
 * optionally starting from a given index. Returns -1 if the substring is not
 * found. This is a curried, functional wrapper around the native indexOf
 * method with additional support for specifying a start position.
 *
 * @param substring - The substring to search for
 * @param fromIndex - Optional starting position (default: 0)
 * @param str - The string to search within
 * @returns Index of first occurrence, or -1 if not found
 * @example
 * ```typescript
 * // Basic substring search
 * indexOf("world")(0)("hello world")
 * // 6
 *
 * // Not found
 * indexOf("xyz")(0)("hello world")
 * // -1
 *
 * // Search from specific index
 * indexOf("o")(5)("hello world")
 * // 7 (finds second 'o')
 *
 * // Empty substring (always 0 for non-empty strings)
 * indexOf("")(0)("hello")
 * // 0
 *
 * // Case sensitive
 * indexOf("World")(0)("hello world")
 * // -1
 *
 * // Handle null/undefined gracefully
 * indexOf("test")(0)(null)       // -1
 * indexOf(null)(0)("test")       // -1
 *
 * // Partial application
 * const findHello = indexOf("hello")(0)
 * findHello("hello world")     // 0
 * findHello("say hello there")  // 4
 *
 * // URL parameter search
 * const url = "https://example.com?name=John&age=30"
 * indexOf("?")(0)(url)   // 19
 * indexOf("&")(0)(url)   // 29
 * ```
 * @pure - Function has no side effects
 * @curried - Function is curried for partial application
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 */
const indexOf = (
	substring: string | null | undefined,
) =>
(
	fromIndex: number = 0,
) =>
(
	str: string | null | undefined,
): number => {
	if (isNullish(str) || typeof str !== "string") {
		return -1
	}

	if (isNullish(substring) || typeof substring !== "string") {
		return -1
	}

	// Use native indexOf with the specified starting position
	return str.indexOf(substring, fromIndex)
}

export default indexOf
