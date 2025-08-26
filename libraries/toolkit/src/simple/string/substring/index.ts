/**
 * Extracts a substring between two indices
 *
 * Returns the part of the string between the start and end indices.
 * Unlike slice(), negative values are treated as 0, and if start is
 * greater than end, the arguments are swapped. This is a curried
 * wrapper around the native substring method.
 *
 * @param start - Starting index (treated as 0 if negative)
 * @param end - Ending index (default: string length)
 * @param str - String to extract from
 * @returns Extracted substring
 * @example
 * ```typescript
 * // Basic extraction
 * substring(0)(5)("hello world")
 * // "hello"
 *
 * // From index to end
 * substring(6)(Infinity)("hello world")
 * // "world"
 *
 * // Auto-swaps if start > end
 * substring(5)(0)("hello world")
 * // "hello" (same as substring(0)(5))
 *
 * // Negative treated as 0
 * substring(-5)(5)("hello world")
 * // "hello" (same as substring(0)(5))
 *
 * // Partial application
 * const fromStart = (end: number) => substring(0)(end)
 * const fromIndex = (start: number) => substring(start)(Infinity)
 * fromStart(3)("hello")   // "hel"
 * fromIndex(3)("hello")   // "lo"
 *
 * // Extract date parts
 * substring(0)(4)("2024-01-15")   // "2024"
 * substring(5)(7)("2024-01-15")   // "01"
 *
 * // Handle null/undefined
 * substring(0)(5)(null)       // ""
 * substring(0)(5)(undefined)  // ""
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 */
const substring = (
	start: number,
) =>
(
	end: number = Infinity,
) =>
(
	str: string | null | undefined,
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}

	// Convert negative values to 0, handle Infinity
	const actualStart = Math.max(0, start)
	const actualEnd = end === Infinity ? str.length : Math.max(0, end)

	// Use native substring (it handles swapping automatically)
	return str.substring(actualStart, actualEnd)
}

export default substring
