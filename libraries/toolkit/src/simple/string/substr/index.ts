/**
 * Extracts a substring starting at position for specified length
 *
 * Returns a portion of the string starting from the given index and
 * extending for the specified number of characters. Negative start
 * indices count from the end. This is a curried wrapper around the
 * deprecated substr method, provided for compatibility.
 *
 * Note: Consider using slice() instead as substr() is deprecated.
 *
 * @curried (start) => (length?) => (str) => string
 * @param start - Starting position (negative counts from end)
 * @param length - Number of characters to extract (default: to end)
 * @param str - String to extract from
 * @returns Extracted substring
 * @example
 * ```typescript
 * // Extract from position with length
 * substr(0)(5)("hello world")
 * // "hello"
 *
 * // From position to end
 * substr(6)(Infinity)("hello world")
 * // "world"
 *
 * // Negative start (from end)
 * substr(-5)(5)("hello world")
 * // "world"
 *
 * // Limited length
 * substr(6)(3)("hello world")
 * // "wor"
 *
 * // Start beyond string
 * substr(20)(5)("hello")
 * // ""
 *
 * // Zero length
 * substr(0)(0)("hello")
 * // ""
 *
 * // Single character
 * substr(0)(1)("hello")
 * // "h"
 *
 * // Partial application
 * const takeFirst = (n: number) => substr(0)(n)
 * const takeLast = (n: number) => substr(-n)(n)
 *
 * takeFirst(3)("hello")  // "hel"
 * takeLast(3)("hello")   // "llo"
 *
 * // Extract area code
 * substr(0)(3)("5551234567")
 * // "555"
 *
 * // Get middle portion
 * substr(2)(3)("abcdefg")
 * // "cde"
 *
 * // Year from date
 * substr(0)(4)("2024-01-15")
 * // "2024"
 *
 * // Handle null/undefined
 * substr(0)(5)(null)       // ""
 * substr(0)(5)(undefined)  // ""
 *
 * // Negative with length
 * substr(-10)(3)("hello world")
 * // "llo"
 *
 * // Extract file extension
 * const getExt = (filename: string) => {
 *   const dotIdx = filename.lastIndexOf(".")
 *   return dotIdx === -1 ? "" : substr(dotIdx + 1)(Infinity)(filename)
 * }
 * getExt("file.txt")  // "txt"
 * ```
 * @property Deprecated - prefer slice() for new code
 * @property Length-based - uses character count, not end index
 * @property Negative-aware - supports negative start index
 */
const substr = (
	start: number,
) =>
(
	length: number = Infinity,
) =>
(
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}

	// Handle negative start
	const actualStart = start < 0 ? Math.max(0, str.length + start) : start

	// Handle length
	const actualLength = length === Infinity
		? str.length - actualStart
		: Math.max(0, length)

	// Extract substring
	return str.substr(actualStart, actualLength)
}

export default substr
