/**
 * Splits an array into chunks of specified size
 * 
 * Divides an array into smaller arrays of a maximum size. The last chunk
 * may be smaller than the specified size if the array length is not evenly
 * divisible. Similar to splitEvery but specifically for arrays.
 * 
 * @curried (size) => (array) => result
 * @param size - Maximum size of each chunk (must be positive)
 * @param array - Array to split into chunks
 * @returns Array of arrays, each of maximum size
 * @example
 * ```typescript
 * // Split into pairs
 * chunk(2)([1, 2, 3, 4, 5])
 * // [[1, 2], [3, 4], [5]]
 * 
 * // Split into groups of 3
 * chunk(3)([1, 2, 3, 4, 5, 6, 7, 8])
 * // [[1, 2, 3], [4, 5, 6], [7, 8]]
 * 
 * // Chunk size larger than array
 * chunk(10)([1, 2, 3])
 * // [[1, 2, 3]]
 * 
 * // Single element chunks
 * chunk(1)([1, 2, 3])
 * // [[1], [2], [3]]
 * 
 * // Process strings as character arrays
 * chunk(3)(["a", "b", "c", "d", "e", "f", "g"])
 * // [["a", "b", "c"], ["d", "e", "f"], ["g"]]
 * 
 * // Batch processing example
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 3, name: "Charlie" },
 *   { id: 4, name: "Dave" },
 *   { id: 5, name: "Eve" }
 * ]
 * chunk(2)(users)
 * // [
 * //   [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
 * //   [{ id: 3, name: "Charlie" }, { id: 4, name: "Dave" }],
 * //   [{ id: 5, name: "Eve" }]
 * // ]
 * 
 * // Pagination example
 * const items = Array.from({ length: 25 }, (_, i) => i + 1)
 * const pageSize = 10
 * const pages = chunk(pageSize)(items)
 * // [[1...10], [11...20], [21...25]]
 * 
 * // Matrix creation
 * chunk(4)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
 * // [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
 * 
 * // Partial application for reusable chunkers
 * const pairwise = chunk(2)
 * pairwise([1, 2, 3, 4])     // [[1, 2], [3, 4]]
 * pairwise(["a", "b", "c"])   // [["a", "b"], ["c"]]
 * 
 * const batchBy3 = chunk(3)
 * batchBy3([1, 2, 3, 4, 5, 6, 7]) // [[1, 2, 3], [4, 5, 6], [7]]
 * 
 * // Edge cases
 * chunk(3)([])         // []
 * chunk(0)([1, 2, 3])  // []  (invalid size)
 * chunk(-1)([1, 2, 3]) // []  (invalid size)
 * 
 * // Handle null/undefined gracefully
 * chunk(2)(null)       // []
 * chunk(2)(undefined)  // []
 * 
 * // Process data in batches for API calls
 * const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const batches = chunk(3)(ids)
 * // Can now process each batch: [[1,2,3], [4,5,6], [7,8,9], [10]]
 * 
 * // Create table rows
 * const cells = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]
 * chunk(3)(cells)
 * // [["A1", "A2", "A3"], ["B1", "B2", "B3"], ["C1", "C2", "C3"]]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Exhaustive - processes entire array
 * @property Regular - all chunks same size except possibly the last
 */
const chunk = <T>(
	size: number
) => (
	array: ReadonlyArray<T> | null | undefined
): Array<Array<T>> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}
	
	if (size <= 0 || !Number.isInteger(size)) {
		return []
	}
	
	// Build chunks using recursion
	const chunkRecursive = (remaining: ReadonlyArray<T>): Array<Array<T>> => {
		if (remaining.length === 0) {
			return []
		}
		
		const currentChunk = remaining.slice(0, size)
		const rest = remaining.slice(size)
		
		return [currentChunk, ...chunkRecursive(rest)]
	}
	
	return chunkRecursive(array)
}

export default chunk