/**
 * Extracts a section of a string between two indices
 *
 * Returns a substring starting from the start index up to but not including
 * the end index. Supports negative indices which count from the end of the
 * string. This is a curried wrapper around the native slice method, useful
 * for extracting portions of strings in a functional programming style.
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 * @param start - Starting index (inclusive)
 * @param end - Ending index (exclusive, default: string length)
 * @param str - String to slice
 * @returns Extracted substring
 * @example
 * ```typescript
 * // Basic slicing
 * slice(0)(5)("hello world")
 * // "hello"
 *
 * // From index to end
 * slice(6)(Infinity)("hello world")
 * // "world"
 *
 * // Negative start index (from end)
 * slice(-5)(Infinity)("hello world")
 * // "world"
 *
 * // Negative end index
 * slice(0)(-1)("hello world")
 * // "hello worl"
 *
 * // Partial application
 * const firstN = (n: number) => slice(0)(n)
 * const lastN = (n: number) => slice(-n)(Infinity)
 * firstN(3)("hello")     // "hel"
 * lastN(3)("hello")      // "llo"
 *
 * // Extract file extension
 * const getExtension = (filename: string) => {
 *   const dotIndex = filename.lastIndexOf(".")
 *   return dotIndex === -1 ? "" : slice(dotIndex)(Infinity)(filename)
 * }
 * getExtension("file.txt")     // ".txt"
 *
 * // Handle null/undefined gracefully
 * slice(0)(5)(null)       // ""
 * slice(0)(5)(undefined)  // ""
 * ```
 */
const slice = (
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

	// Use native slice with proper handling of Infinity
	const actualEnd = end === Infinity ? str.length : end
	return str.slice(start, actualEnd)
}

export default slice
