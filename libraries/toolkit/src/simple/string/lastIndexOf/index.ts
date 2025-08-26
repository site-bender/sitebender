/**
 * Returns the index of the last occurrence of a substring
 *
 * Finds the position of the last occurrence of a substring within a string,
 * optionally searching backwards from a given index. Returns -1 if the
 * substring is not found. This is a curried, functional wrapper around
 * the native lastIndexOf method with support for specifying a start position.
 *
 * @param substring - The substring to search for
 * @param fromIndex - Optional position to search backwards from (default: str.length - 1)
 * @param str - The string to search within
 * @returns Index of last occurrence, or -1 if not found
 * @example
 * ```typescript
 * // Basic last occurrence
 * lastIndexOf("o")(Infinity)("hello world")
 * // 7 (last 'o' in "world")
 *
 * // Not found
 * lastIndexOf("xyz")(Infinity)("hello world")
 * // -1
 *
 * // Search backwards from specific index
 * lastIndexOf("o")(5)("hello world")
 * // 4 (finds 'o' in "hello", not "world")
 *
 * // Multiple occurrences (finds last)
 * lastIndexOf("l")(Infinity)("hello world")
 * // 9 (last 'l' in "world")
 *
 * // Handle null/undefined gracefully
 * lastIndexOf("test")(Infinity)(null)       // -1
 * lastIndexOf(null)(Infinity)("test")       // -1
 *
 * // Find file extension
 * const getExtension = (filename: string) => {
 *   const lastDot = lastIndexOf(".")(Infinity)(filename)
 *   return lastDot === -1 ? "" : filename.slice(lastDot)
 * }
 * getExtension("document.pdf")     // ".pdf"
 *
 * // Find last path separator
 * const getFilename = (path: string) => {
 *   const lastSlash = lastIndexOf("/")(Infinity)(path)
 *   return lastSlash === -1 ? path : path.slice(lastSlash + 1)
 * }
 * getFilename("/usr/local/bin/node")  // "node"
 * ```
 * @pure - Function has no side effects
 * @curried - Function is curried for partial application
 * @immutable - Does not modify inputs
 * @safe - Returns safe values for invalid inputs
 */
const lastIndexOf = (
	substring: string | null | undefined,
) =>
(
	fromIndex: number = Infinity,
) =>
(
	str: string | null | undefined,
): number => {
	if (str == null || typeof str !== "string") {
		return -1
	}

	if (substring == null || typeof substring !== "string") {
		return -1
	}

	// Use native lastIndexOf with the specified starting position
	// If fromIndex is Infinity or greater than string length, search from end
	const searchIndex = fromIndex === Infinity ? str.length - 1 : fromIndex
	return str.lastIndexOf(substring, searchIndex)
}

export default lastIndexOf
