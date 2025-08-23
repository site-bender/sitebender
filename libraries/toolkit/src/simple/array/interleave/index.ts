/**
 * Alternate elements from multiple arrays
 * 
 * Takes multiple arrays and interleaves their elements, taking one element
 * from each array in turn until all arrays are exhausted. Shorter arrays
 * are exhausted first, and the remaining elements from longer arrays continue
 * to be interleaved. Useful for merging data streams, creating alternating
 * patterns, and combining parallel sequences.
 * 
 * @param arrays - Arrays to interleave
 * @returns New array with interleaved elements
 * @example
 * ```typescript
 * // Basic interleaving
 * interleave([1, 2, 3], ["a", "b", "c"])
 * // [1, "a", 2, "b", 3, "c"]
 * 
 * // Three arrays
 * interleave([1, 2], ["a", "b"], [true, false])
 * // [1, "a", true, 2, "b", false]
 * 
 * // Different lengths - shorter exhausted first
 * interleave([1, 2, 3, 4], ["a", "b"])
 * // [1, "a", 2, "b", 3, 4]
 * 
 * // Multiple arrays of different lengths
 * interleave([1, 2, 3], ["a"], [true, false, null, undefined])
 * // [1, "a", true, 2, false, 3, null, undefined]
 * 
 * // Single array
 * interleave([1, 2, 3])
 * // [1, 2, 3]
 * 
 * // Empty arrays
 * interleave([], [1, 2], [])
 * // [1, 2]
 * 
 * // All empty
 * interleave([], [], [])
 * // []
 * 
 * // No arrays
 * interleave()
 * // []
 * 
 * // Creating alternating pattern
 * const evens = [2, 4, 6, 8]
 * const odds = [1, 3, 5, 7]
 * interleave(odds, evens)
 * // [1, 2, 3, 4, 5, 6, 7, 8]
 * 
 * // Merging parallel data
 * const timestamps = ["10:00", "10:05", "10:10"]
 * const values = [100, 105, 95]
 * const statuses = ["ok", "ok", "warning"]
 * interleave(timestamps, values, statuses)
 * // ["10:00", 100, "ok", "10:05", 105, "ok", "10:10", 95, "warning"]
 * 
 * // Building HTML-like structure
 * const openTags = ["<div>", "<span>", "<p>"]
 * const content = ["Hello", "World", "!"]
 * const closeTags = ["</div>", "</span>", "</p>"]
 * interleave(openTags, content, closeTags)
 * // ["<div>", "Hello", "</div>", "<span>", "World", "</span>", "<p>", "!", "</p>"]
 * 
 * // Combining coordinates
 * const xs = [1, 2, 3, 4]
 * const ys = [10, 20, 30, 40]
 * interleave(xs, ys)
 * // [1, 10, 2, 20, 3, 30, 4, 40]
 * 
 * // Card shuffling simulation
 * const deck1 = ["A♠", "K♠", "Q♠"]
 * const deck2 = ["A♥", "K♥", "Q♥"]
 * interleave(deck1, deck2)
 * // ["A♠", "A♥", "K♠", "K♥", "Q♠", "Q♥"]
 * 
 * // Creating test data
 * const questions = ["Q1", "Q2", "Q3"]
 * const answers = ["A1", "A2", "A3"]
 * interleave(questions, answers)
 * // ["Q1", "A1", "Q2", "A2", "Q3", "A3"]
 * 
 * // Mixing types
 * interleave([1, 2], ["a", "b"], [true, false], [{ x: 1 }])
 * // [1, "a", true, { x: 1 }, 2, "b", false]
 * 
 * // Animation keyframes
 * const positions = [0, 50, 100]
 * const rotations = [0, 180, 360]
 * const scales = [1, 1.5, 1]
 * interleave(positions, rotations, scales)
 * // [0, 0, 1, 50, 180, 1.5, 100, 360, 1]
 * 
 * // Sparse array handling
 * const sparse1 = [1, , 3]  // Has hole at index 1
 * const sparse2 = ["a", "b", "c"]
 * interleave(sparse1, sparse2)
 * // [1, "a", undefined, "b", 3, "c"]
 * ```
 * @property Pure - No side effects
 * @property Immutable - Does not modify input arrays
 * @property Variadic - Accepts any number of arrays
 */
const interleave = <T>(...arrays: Array<Array<T>>): Array<T> => {
	if (arrays.length === 0) return []
	
	const result: Array<T> = []
	const maxLength = Math.max(...arrays.map(arr => arr.length))
	
	for (let i = 0; i < maxLength; i++) {
		for (const array of arrays) {
			if (i < array.length) {
				result.push(array[i])
			}
		}
	}
	
	return result
}

export default interleave