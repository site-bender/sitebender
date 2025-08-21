/**
 * Creates array of sliding windows over set elements
 * 
 * Generates an array of consecutive windows of specified size sliding over
 * the Set's elements. Since Sets maintain insertion order in JavaScript,
 * the windows follow that order. Each window is an array of elements.
 * Similar to array sliding but operates on Set elements.
 * 
 * @curried (size) => (set) => windows
 * @param size - Size of each window
 * @param set - Set to create windows from
 * @returns Array of window arrays
 * @example
 * ```typescript
 * // Basic sliding windows
 * sliding(3)(new Set([1, 2, 3, 4, 5]))
 * // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 * 
 * // Window size 2
 * sliding(2)(new Set(["a", "b", "c", "d"]))
 * // [["a", "b"], ["b", "c"], ["c", "d"]]
 * 
 * // Window size 1 (each element)
 * sliding(1)(new Set([1, 2, 3]))
 * // [[1], [2], [3]]
 * 
 * // Window equals set size
 * sliding(3)(new Set([1, 2, 3]))
 * // [[1, 2, 3]]
 * 
 * // Window larger than set
 * sliding(5)(new Set([1, 2, 3]))
 * // []
 * 
 * // Empty set
 * sliding(2)(new Set())
 * // []
 * 
 * // Set from array with duplicates
 * const nums = [1, 1, 2, 2, 3, 3, 4, 4, 5]
 * sliding(3)(new Set(nums))  // Set is {1, 2, 3, 4, 5}
 * // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 * 
 * // String set
 * sliding(2)(new Set(["hello", "world", "test", "data"]))
 * // [["hello", "world"], ["world", "test"], ["test", "data"]]
 * 
 * // Mixed types
 * sliding(2)(new Set([1, "a", true, null]))
 * // [[1, "a"], ["a", true], [true, null]]
 * 
 * // N-gram generation from character set
 * const chars = new Set([..."hello"])  // {"h", "e", "l", "o"}
 * sliding(2)(chars)
 * // [["h", "e"], ["e", "l"], ["l", "o"]]
 * 
 * // Moving average preparation
 * const values = new Set([10, 20, 30, 40, 50])
 * const windows = sliding(3)(values)
 * const averages = windows.map(
 *   window => window.reduce((a, b) => a + b, 0) / window.length
 * )
 * // [20, 30, 40]  // (10+20+30)/3, (20+30+40)/3, (30+40+50)/3
 * 
 * // Boolean set
 * sliding(2)(new Set([true, false]))
 * // [[true, false]]
 * 
 * // Set with insertion order
 * const ordered = new Set()
 * ordered.add("third")
 * ordered.add("first")
 * ordered.add("second")
 * ordered.add("fourth")
 * sliding(2)(ordered)
 * // [["third", "first"], ["first", "second"], ["second", "fourth"]]
 * 
 * // Analyzing sequences
 * const sequence = new Set([1, 3, 6, 10, 15])  // Triangular numbers
 * const pairs = sliding(2)(sequence)
 * const differences = pairs.map(([a, b]) => b - a)
 * // [2, 3, 4, 5]  // Differences increase by 1
 * 
 * // Object references
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * sliding(2)(new Set([obj1, obj2, obj3]))
 * // [[{id:1}, {id:2}], [{id:2}, {id:3}]]
 * 
 * // Pattern detection
 * const pattern = new Set([1, 2, 1, 3, 1, 4])
 * // Note: Set deduplicates to {1, 2, 3, 4}
 * sliding(2)(pattern)
 * // [[1, 2], [2, 3], [3, 4]]
 * 
 * // Large set
 * const largeSet = new Set(Array.from({ length: 1000 }, (_, i) => i))
 * const windows1000 = sliding(5)(largeSet)
 * windows1000.length  // 996 (1000 - 5 + 1)
 * windows1000[0]      // [0, 1, 2, 3, 4]
 * windows1000[995]    // [995, 996, 997, 998, 999]
 * 
 * // Symbol handling
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const sym3 = Symbol("c")
 * sliding(2)(new Set([sym1, sym2, sym3]))
 * // [[Symbol(a), Symbol(b)], [Symbol(b), Symbol(c)]]
 * 
 * // Context windows for analysis
 * const words = new Set(["The", "quick", "brown", "fox", "jumps"])
 * const context = sliding(3)(words)
 * // [["The", "quick", "brown"], ["quick", "brown", "fox"], ["brown", "fox", "jumps"]]
 * 
 * // Edge detection preparation
 * const pixels = new Set([100, 105, 200, 205, 210])
 * const pixelWindows = sliding(2)(pixels)
 * const gradients = pixelWindows.map(([a, b]) => Math.abs(b - a))
 * // [5, 95, 5, 5]  // Large gradient at 105->200 indicates edge
 * ```
 * @property Pure - No side effects
 * @property Immutable - Does not modify input set
 * @property Order-preserving - Maintains Set iteration order
 */
const sliding = <T>(size: number) => (set: Set<T>): Array<Array<T>> => {
	if (size <= 0) return []
	
	const elements = Array.from(set)
	if (elements.length < size) return []
	
	const result: Array<Array<T>> = []
	
	for (let i = 0; i <= elements.length - size; i++) {
		result.push(elements.slice(i, i + size))
	}
	
	return result
}

export default sliding