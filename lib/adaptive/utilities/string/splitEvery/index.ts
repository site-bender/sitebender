/**
 * Splits a string into chunks of specified length
 * 
 * Divides a string into an array of substrings, each of the specified length
 * (except possibly the last chunk, which may be shorter). Returns an empty
 * array if the chunk size is not positive.
 * 
 * @curried (n) => (str) => result
 * @param n - Length of each chunk (must be positive)
 * @param str - The string to split into chunks
 * @returns Array of string chunks
 * @example
 * ```typescript
 * // Basic chunking
 * splitEvery(3)("hello world") // ["hel", "lo ", "wor", "ld"]
 * splitEvery(2)("abcdef")      // ["abc", "def"]
 * splitEvery(4)("12345678")    // ["1234", "5678"]
 * 
 * // Last chunk may be shorter
 * splitEvery(3)("abcdefgh")    // ["abc", "def", "gh"]
 * splitEvery(4)("hello")       // ["hell", "o"]
 * 
 * // Edge cases
 * splitEvery(0)("test")        // [] (invalid chunk size)
 * splitEvery(-1)("test")       // [] (negative chunk size)
 * splitEvery(10)("short")      // ["short"] (chunk larger than string)
 * splitEvery(1)("abc")         // ["a", "b", "c"] (single chars)
 * splitEvery(2)("")            // [] (empty string)
 * 
 * // Partial application
 * const splitInPairs = splitEvery(2)
 * splitInPairs("abcdef")       // ["ab", "cd", "ef"]
 * splitInPairs("123")          // ["12", "3"]
 * 
 * const splitByThrees = splitEvery(3)
 * splitByThrees("123456789")   // ["123", "456", "789"]
 * splitByThrees("phone")       // ["pho", "ne"]
 * ```
 * @property Produces array of equal-length chunks (except possibly last)
 */
const splitEvery = (n: number) => (str: string): Array<string> => {
	if (n <= 0 || str.length === 0) return []
	
	const chunks: Array<string> = []
	for (let i = 0; i < str.length; i += n) {
		chunks.push(str.slice(i, i + n))
	}
	return chunks
}

export default splitEvery
