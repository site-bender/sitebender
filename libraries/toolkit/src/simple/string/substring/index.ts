/**
 * Extracts a substring between two indices
 *
 * Returns the part of the string between the start and end indices.
 * Unlike slice(), negative values are treated as 0, and if start is
 * greater than end, the arguments are swapped. This is a curried
 * wrapper around the native substring method.
 *
 * @curried (start) => (end?) => (str) => string
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
 * // Both negative
 * substring(-5)(-2)("hello world")
 * // "" (both become 0)
 *
 * // Extract middle
 * substring(3)(7)("hello world")
 * // "lo w"
 *
 * // Single character
 * substring(0)(1)("hello")
 * // "h"
 *
 * // Same start and end
 * substring(5)(5)("hello world")
 * // ""
 *
 * // Partial application
 * const fromStart = (end: number) => substring(0)(end)
 * const fromIndex = (start: number) => substring(start)(Infinity)
 *
 * fromStart(3)("hello")   // "hel"
 * fromIndex(3)("hello")   // "lo"
 *
 * // Extract parts
 * substring(0)(4)("2024-01-15")   // "2024"
 * substring(5)(7)("2024-01-15")   // "01"
 * substring(8)(10)("2024-01-15")  // "15"
 *
 * // Domain from URL
 * const url = "https://example.com/path"
 * const start = url.indexOf("://") + 3
 * const end = url.indexOf("/", start)
 * substring(start)(end)(url)  // "example.com"
 *
 * // Handle null/undefined
 * substring(0)(5)(null)       // ""
 * substring(0)(5)(undefined)  // ""
 *
 * // Out of bounds (safe)
 * substring(0)(100)("hello")  // "hello"
 * substring(50)(100)("hello") // ""
 *
 * // Comparison with slice
 * // substring swaps args, slice doesn't:
 * substring(5)(2)("hello")  // "llo" (swapped to 2,5)
 * // slice(5)(2)("hello")   // "" (empty)
 *
 * // substring treats negative as 0, slice counts from end:
 * substring(-3)(5)("hello")  // "hello" (-3 becomes 0)
 * // slice(-3)(5)("hello")  // "llo" (-3 means 3 from end)
 * ```
 * @property Auto-swap - swaps indices if start > end
 * @property Zero-floor - negative indices become 0
 * @property Index-based - uses positions, not length
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
