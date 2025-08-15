/**
 * Returns a slice of an array starting from an index with specified length
 * 
 * Extracts a specific number of elements starting from the given index.
 * Returns fewer elements if length extends beyond array bounds.
 * Negative indices count from the end.
 * 
 * @curried (startIndex) => (length) => (array) => result
 * @param startIndex - Starting index for extraction
 * @param length - Number of elements to extract
 * @param array - The array to extract from
 * @returns New array containing the extracted elements
 * @example
 * ```typescript
 * sliceFrom(1)(2)([1, 2, 3, 4, 5]) // [2, 3]
 * sliceFrom(0)(3)(["a", "b", "c", "d"]) // ["a", "b", "c"]
 * sliceFrom(2)(10)([1, 2, 3, 4]) // [3, 4] (length exceeds bounds)
 * sliceFrom(-3)(2)([1, 2, 3, 4, 5]) // [3, 4]
 * 
 * // Extract fixed-size chunks
 * const getChunk = sliceFrom(2)(3)
 * getChunk([10, 20, 30, 40, 50, 60]) // [30, 40, 50]
 * ```
 */
const sliceFrom =
	(startIndex: number) => (length: number) => <T>(array: Array<T>): Array<T> => {
		if (length <= 0) return []
		
		// Normalize negative index
		const normalizedStart = startIndex < 0 
			? Math.max(0, array.length + startIndex)
			: startIndex
		
		return array.slice(normalizedStart, normalizedStart + length)
	}

export default sliceFrom
