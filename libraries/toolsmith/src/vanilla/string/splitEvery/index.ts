/**
 * Splits a string into chunks of specified length
 *
 * Divides a string into an array of substrings, each of the specified length
 * (except possibly the last chunk, which may be shorter). Returns an empty
 * array if the chunk size is not positive.
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 * @param n - Length of each chunk (must be positive)
 * @param str - The string to split into chunks
 * @returns Array of string chunks
 * @example
 * ```typescript
 * // Basic chunking
 * splitEvery(3)("hello world") // ["hel", "lo ", "wor", "ld"]
 * splitEvery(4)("12345678")    // ["1234", "5678"]
 *
 * // Last chunk may be shorter
 * splitEvery(3)("abcdefgh")    // ["abc", "def", "gh"]
 * splitEvery(4)("hello")       // ["hell", "o"]
 *
 * // Edge cases
 * splitEvery(0)("test")        // [] (invalid chunk size)
 * splitEvery(10)("short")      // ["short"] (chunk larger than string)
 * splitEvery(1)("abc")         // ["a", "b", "c"] (single chars)
 *
 * // Partial application
 * const splitInPairs = splitEvery(2)
 * splitInPairs("abcdef")       // ["ab", "cd", "ef"]
 * splitInPairs("123")          // ["12", "3"]
 * ```
 */
const splitEvery = (n: number) => (str: string): Array<string> => {
	if (n <= 0 || str.length === 0) return []

	// Use recursion to build chunks array
	const buildChunks = (remaining: string): Array<string> => {
		if (remaining.length === 0) return []

		const chunk = remaining.slice(0, n)
		const rest = remaining.slice(n)

		return [chunk, ...buildChunks(rest)]
	}

	return buildChunks(str)
}

export default splitEvery
