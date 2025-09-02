/**
 * Splits a string at a specific index into two parts
 *
 * Divides a string into exactly two parts at the specified index. The first
 * part contains characters from the beginning up to (but not including) the
 * index, and the second part contains characters from the index to the end.
 * Negative indices count from the end of the string.
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 * @param index - Index where to split the string (negative counts from end)
 * @param str - The string to split
 * @returns Array with exactly two string parts
 * @example
 * ```typescript
 * // Basic splitting
 * splitAt(3)("hello")      // ["hel", "lo"]
 * splitAt(5)("hello")      // ["hello", ""]
 * splitAt(0)("test")       // ["", "test"]
 *
 * // Negative indices (from end)
 * splitAt(-2)("hello")     // ["hel", "lo"]
 * splitAt(-1)("test")      // ["tes", "t"]
 *
 * // Out of bounds
 * splitAt(10)("short")     // ["short", ""]
 * splitAt(-10)("short")    // ["", "short"]
 *
 * // Partial application
 * const splitInHalf = (s: string) => splitAt(Math.floor(s.length / 2))(s)
 * splitInHalf("hello")     // ["he", "llo"]
 * splitInHalf("test")      // ["te", "st"]
 * ```
 */
const splitAt = (index: number) => (str: string): Array<string> => {
	// Handle negative indices
	const actualIndex = index < 0
		? Math.max(0, str.length + index)
		: Math.min(index, str.length)

	return [str.slice(0, actualIndex), str.slice(actualIndex)]
}

export default splitAt
