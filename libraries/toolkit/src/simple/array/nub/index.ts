/**
 * Removes duplicate elements from an array (alias for unique)
 *
 * Returns a new array with all duplicate elements removed, keeping only
 * the first occurrence of each unique element. Uses SameValueZero equality
 * for comparison. The term "nub" comes from Haskell and means to remove
 * duplicates. Order is preserved based on first occurrence. This is
 * functionally identical to unique but provided for those familiar with
 * Haskell terminology.
 *
 * @param array - Array to remove duplicates from
 * @returns New array with only unique elements
 * @example
 * ```typescript
 * // Basic duplicate removal
 * nub([1, 2, 3, 2, 1, 4])
 * // [1, 2, 3, 4]
 *
 * // String deduplication
 * nub(["apple", "banana", "apple", "cherry", "banana"])
 * // ["apple", "banana", "cherry"]
 *
 * // Mixed types
 * nub([1, "1", 2, "2", 1, "1"])
 * // [1, "1", 2, "2"]
 *
 * // Boolean values
 * nub([true, false, true, false, true])
 * // [true, false]
 *
 * // Objects (uses reference equality)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 1 }  // Different object, same content
 * nub([obj1, obj2, obj1, obj3])
 * // [obj1, obj2, obj3]  // obj3 kept because it's a different reference
 *
 * // Arrays (reference equality)
 * const arr1 = [1, 2]
 * const arr2 = [3, 4]
 * nub([arr1, arr2, arr1, [1, 2]])
 * // [arr1, arr2, [1, 2]]  // Last [1, 2] is different reference
 *
 * // NaN handling (NaN === NaN in SameValueZero)
 * nub([NaN, 1, NaN, 2, NaN])
 * // [NaN, 1, 2]
 *
 * // Null and undefined
 * nub([null, undefined, null, undefined, 0])
 * // [null, undefined, 0]
 *
 * // Zero and negative zero (considered equal)
 * nub([0, -0, 0, -0])
 * // [0]
 *
 * // Symbols
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const sym3 = Symbol("a")  // Different symbol, same description
 * nub([sym1, sym2, sym1, sym3])
 * // [sym1, sym2, sym3]
 *
 * // Empty array
 * nub([])
 * // []
 *
 * // Single element
 * nub([42])
 * // [42]
 *
 * // All unique elements
 * nub([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5]
 *
 * // All duplicate elements
 * nub([7, 7, 7, 7, 7])
 * // [7]
 *
 * // Remove duplicate words
 * const text = "the quick brown fox jumps over the lazy dog the"
 * nub(text.split(" "))
 * // ["the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog"]
 *
 * // Deduplicate IDs
 * const ids = [101, 102, 103, 101, 104, 102, 105]
 * nub(ids)
 * // [101, 102, 103, 104, 105]
 *
 * // Clean up tags
 * const tags = ["javascript", "typescript", "javascript", "react", "typescript"]
 * nub(tags)
 * // ["javascript", "typescript", "react"]
 *
 * // Remove duplicate coordinates
 * const coords = [[0, 0], [1, 1], [0, 0], [2, 2]]
 * // Note: Arrays are compared by reference, not content
 * nub(coords)
 * // [[0, 0], [1, 1], [0, 0], [2, 2]]  // All kept (different references)
 *
 * // Process log levels
 * const logs = ["INFO", "ERROR", "INFO", "WARN", "ERROR", "DEBUG"]
 * nub(logs)
 * // ["INFO", "ERROR", "WARN", "DEBUG"]
 *
 * // Unique characters in string
 * nub("mississippi".split(""))
 * // ["m", "i", "s", "p"]
 *
 * // Dates (compared by reference, not value)
 * const date1 = new Date("2024-01-01")
 * const date2 = new Date("2024-01-02")
 * const date3 = new Date("2024-01-01")  // Same date, different object
 * nub([date1, date2, date1, date3])
 * // [date1, date2, date3]
 *
 * // Combine with map for property-based deduplication
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 1, name: "Alice" },
 *   { id: 3, name: "Charlie" }
 * ]
 * const uniqueIds = nub(users.map(u => u.id))
 * // [1, 2, 3]
 *
 * // Chain with other operations
 * const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
 * nub(numbers).filter(n => n % 2 === 0)
 * // [2, 4]
 *
 * // Handle null/undefined gracefully
 * nub(null)       // []
 * nub(undefined)  // []
 *
 * // Large arrays
 * const large = Array(10000).fill(0).map((_, i) => i % 100)
 * nub(large).length
 * // 100
 *
 * // Preserve first occurrence order
 * nub([3, 1, 2, 1, 3, 2, 4])
 * // [3, 1, 2, 4]  // Order: 3 appeared first, then 1, then 2, then 4
 *
 * // Use for Set-like operations
 * const setA = nub([1, 2, 3, 2, 1])
 * const setB = nub([2, 3, 4, 3, 2])
 * // setA: [1, 2, 3]
 * // setB: [2, 3, 4]
 *
 * // Infinity values
 * nub([Infinity, -Infinity, Infinity, 0, -Infinity])
 * // [Infinity, -Infinity, 0]
 *
 * // Function deduplication (by reference)
 * const fn1 = () => 1
 * const fn2 = () => 2
 * nub([fn1, fn2, fn1, () => 1])
 * // [fn1, fn2, () => 1]  // Last arrow function is different reference
 *
 * // Practical: Remove duplicate error messages
 * const errors = [
 *   "Connection failed",
 *   "Timeout error",
 *   "Connection failed",
 *   "Invalid input",
 *   "Timeout error"
 * ]
 * nub(errors)
 * // ["Connection failed", "Timeout error", "Invalid input"]
 *
 * // Practical: Unique values from form inputs
 * const formValues = ["option1", "option2", "option1", "option3", "option2"]
 * nub(formValues)
 * // ["option1", "option2", "option3"]
 *
 * // Performance note: Uses Set internally for O(n) complexity
 * const efficient = nub([...Array(1000).keys(), ...Array(1000).keys()])
 * efficient.length
 * // 1000
 * ```
 * @property Immutable - doesn't modify input array
 * @property Order-preserving - maintains first occurrence order
 * @property SameValueZero - uses SameValueZero equality (NaN === NaN)
 */
const nub = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}

	// Use Set for efficient deduplication (O(n) complexity)
	// Set uses SameValueZero equality, which is what we want
	return [...new Set(array)]
}

export default nub
