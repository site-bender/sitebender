import isNullish from "../../validation/isNullish/index.ts"

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
 * @pure
 * @curried
 * @immutable
 * @safe
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
 * // Partial application
 * const takeFirst = (n: number) => substr(0)(n)
 * const takeLast = (n: number) => substr(-n)(n)
 * takeFirst(3)("hello")  // "hel"
 * takeLast(3)("hello")   // "llo"
 *
 * // Extract area code
 * substr(0)(3)("5551234567")
 * // "555"
 *
 * // Handle null/undefined
 * substr(0)(5)(null)       // ""
 * substr(0)(5)(undefined)  // ""
 * ```
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
	if (isNullish(str) || typeof str !== "string") {
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
