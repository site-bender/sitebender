/**
 * Checks if a string contains a substring
 *
 * Determines whether a string includes a specified substring. This is
 * a curried, functional wrapper around the native includes method that
 * provides consistent behavior with null/undefined handling. The search
 * is case-sensitive and checks for exact substring matches.
 *
 * @param substring - The substring to search for
 * @param str - The string to search within
 * @returns True if the string contains the substring, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * contains("world")("hello world")
 * // true
 *
 * contains("foo")("hello world")
 * // false
 *
 * // Case sensitive
 * contains("World")("hello world")
 * // false
 *
 * // Empty substring
 * contains("")("hello")
 * // true
 *
 * // Special characters
 * contains("$100")("Price: $100")
 * // true
 *
 * // Unicode and emojis
 * contains("世界")("hello 世界")
 * // true
 *
 * // Partial application
 * const hasHttp = contains("http://")
 * hasHttp("http://example.com")   // true
 * hasHttp("https://example.com")  // false
 *
 * // Array filtering
 * const strings = ["apple", "banana", "grape", "pineapple"]
 * strings.filter(contains("apple"))
 * // ["apple", "pineapple"]
 * ```
 * @pure
 * @curried
 * @immutable
 * @predicate
 */
const contains = (
	substring: string | null | undefined,
) =>
(
	str: string | null | undefined,
): boolean => {
	if (str == null || typeof str !== "string") {
		return false
	}

	if (substring == null || typeof substring !== "string") {
		return false
	}

	return str.includes(substring)
}

export default contains
