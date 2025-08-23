/**
 * Count occurrences of each unique element in an array
 * 
 * Creates a frequency map that counts how many times each unique element
 * appears in the array. Returns a Map where keys are the unique elements
 * and values are their occurrence counts. Useful for statistical analysis,
 * duplicate detection, and data summarization.
 * 
 * @param array - The array to analyze
 * @returns Map with elements as keys and counts as values
 * @example
 * ```typescript
 * // Basic frequency counting
 * frequency([1, 2, 2, 3, 3, 3])
 * // Map { 1 => 1, 2 => 2, 3 => 3 }
 * 
 * // String frequency
 * frequency(["a", "b", "a", "c", "b", "a"])
 * // Map { "a" => 3, "b" => 2, "c" => 1 }
 * 
 * // Empty array
 * frequency([])
 * // Map {}
 * 
 * // All unique elements
 * frequency([1, 2, 3, 4, 5])
 * // Map { 1 => 1, 2 => 1, 3 => 1, 4 => 1, 5 => 1 }
 * 
 * // All same element
 * frequency([7, 7, 7, 7])
 * // Map { 7 => 4 }
 * 
 * // Mixed types (with proper typing)
 * frequency([1, "1", 1, "1", true])
 * // Map { 1 => 2, "1" => 2, true => 1 }
 * 
 * // Object references
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * frequency([obj1, obj2, obj1, obj1])
 * // Map { {id:1} => 3, {id:2} => 1 }
 * 
 * // Analyzing text
 * const words = "the quick brown fox jumps over the lazy dog".split(" ")
 * frequency(words)
 * // Map { "the" => 2, "quick" => 1, "brown" => 1, ... }
 * 
 * // Finding most common element
 * const counts = frequency([1, 2, 2, 3, 3, 3, 4])
 * const mostCommon = [...counts.entries()].reduce((a, b) => 
 *   b[1] > a[1] ? b : a
 * )
 * // [3, 3] - element 3 appears 3 times
 * 
 * // Detecting duplicates
 * const data = [1, 2, 3, 4, 5, 3, 2]
 * const freqs = frequency(data)
 * const duplicates = [...freqs.entries()]
 *   .filter(([_, count]) => count > 1)
 *   .map(([elem, _]) => elem)
 * // [2, 3]
 * 
 * // Character frequency in string
 * frequency([..."hello world"])
 * // Map { "h" => 1, "e" => 1, "l" => 3, "o" => 2, ... }
 * 
 * // Boolean frequency
 * frequency([true, false, true, true, false])
 * // Map { true => 3, false => 2 }
 * 
 * // Null and undefined handling
 * frequency([1, null, 2, undefined, null, 3])
 * // Map { 1 => 1, null => 2, 2 => 1, undefined => 1, 3 => 1 }
 * 
 * // Using with filter
 * const nums = [1, 2, 3, 4, 5, 1, 2, 3, 1]
 * const freq = frequency(nums)
 * const appearsOnce = [...freq.entries()]
 *   .filter(([_, count]) => count === 1)
 *   .map(([num, _]) => num)
 * // [4, 5]
 * 
 * // Vote counting
 * const votes = ["Alice", "Bob", "Alice", "Charlie", "Bob", "Alice"]
 * const tally = frequency(votes)
 * const winner = [...tally.entries()]
 *   .sort((a, b) => b[1] - a[1])[0]
 * // ["Alice", 3]
 * 
 * // Grade distribution
 * const grades = ["A", "B", "A", "C", "B", "A", "D", "B", "C"]
 * frequency(grades)
 * // Map { "A" => 3, "B" => 3, "C" => 2, "D" => 1 }
 * 
 * // Using for statistics
 * const dataset = [1, 1, 2, 2, 2, 3, 3, 3, 3]
 * const freq = frequency(dataset)
 * const mode = [...freq.entries()]
 *   .reduce((a, b) => b[1] > a[1] ? b : a)[0]
 * // 3 (most frequent value)
 * ```
 * @property Pure - No side effects
 * @property Immutable - Does not modify input array
 * @property Type-safe - Preserves element types in Map keys
 */
const frequency = <T>(array: Array<T>): Map<T, number> => {
	const freq = new Map<T, number>()
	for (const item of array) {
		freq.set(item, (freq.get(item) ?? 0) + 1)
	}
	return freq
}

export default frequency