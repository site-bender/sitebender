/**
 * Converts a Set to an Array
 * 
 * Creates a new Array containing all elements from the Set in their
 * insertion order. This provides a functional way to convert Sets
 * to Arrays for use with array methods or when array indexing is needed.
 * 
 * @param set - Set to convert to Array
 * @returns Array containing all Set elements
 * @example
 * ```typescript
 * // Basic conversion
 * toArray(new Set([1, 2, 3, 4, 5]))
 * // [1, 2, 3, 4, 5]
 * 
 * // String Set
 * toArray(new Set(["hello", "world"]))
 * // ["hello", "world"]
 * 
 * // Empty Set
 * toArray(new Set())
 * // []
 * 
 * // Mixed types
 * toArray(new Set([1, "two", true, null]))
 * // [1, "two", true, null]
 * 
 * // Preserves insertion order
 * const mySet = new Set()
 * mySet.add("third")
 * mySet.add("first")
 * mySet.add("second")
 * toArray(mySet)
 * // ["third", "first", "second"]
 * 
 * // Object Set
 * toArray(new Set([{ id: 1 }, { id: 2 }, { id: 3 }]))
 * // [{ id: 1 }, { id: 2 }, { id: 3 }]
 * 
 * // Use with array methods
 * const numbers = new Set([3, 1, 4, 1, 5, 9])
 * toArray(numbers).sort((a, b) => a - b)
 * // [1, 3, 4, 5, 9] (sorted array)
 * 
 * // Enable indexing
 * const items = new Set(["a", "b", "c"])
 * const arr = toArray(items)
 * arr[0]  // "a"
 * arr[1]  // "b"
 * arr[2]  // "c"
 * 
 * // Chain with array operations
 * const uniqueNumbers = new Set([1, 2, 3, 4, 5])
 * toArray(uniqueNumbers)
 *   .map(n => n * 2)
 *   .filter(n => n > 5)
 * // [6, 8, 10]
 * 
 * // Convert back to Set after array operations
 * const processedSet = new Set(
 *   toArray(new Set([1, 2, 3]))
 *     .map(n => n * 2)
 * )
 * // Set { 2, 4, 6 }
 * 
 * // Use with reduce
 * toArray(new Set([1, 2, 3, 4, 5]))
 *   .reduce((sum, n) => sum + n, 0)
 * // 15
 * 
 * // Join elements
 * toArray(new Set(["apple", "banana", "cherry"]))
 *   .join(", ")
 * // "apple, banana, cherry"
 * 
 * // Reverse order
 * toArray(new Set([1, 2, 3, 4, 5]))
 *   .reverse()
 * // [5, 4, 3, 2, 1]
 * 
 * // Slice subset
 * toArray(new Set(["a", "b", "c", "d", "e"]))
 *   .slice(1, 4)
 * // ["b", "c", "d"]
 * 
 * // Find specific index
 * const colors = new Set(["red", "green", "blue"])
 * toArray(colors).indexOf("green")
 * // 1
 * 
 * // NaN handling
 * toArray(new Set([NaN, 1, NaN, 2]))
 * // [NaN, 1, 2] (Set deduplicates NaN)
 * 
 * // Symbol conversion
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * toArray(new Set([sym1, sym2]))
 * // [Symbol(a), Symbol(b)]
 * 
 * // Handle null/undefined gracefully
 * toArray(null)       // []
 * toArray(undefined)  // []
 * 
 * // Use for serialization
 * const dataSet = new Set([1, 2, 3])
 * JSON.stringify(toArray(dataSet))
 * // "[1,2,3]"
 * 
 * // Pagination
 * const allItems = new Set(["item1", "item2", "item3", "item4", "item5"])
 * const page = 2
 * const pageSize = 2
 * toArray(allItems).slice((page - 1) * pageSize, page * pageSize)
 * // ["item3", "item4"]
 * 
 * // Random selection
 * const options = new Set(["option1", "option2", "option3"])
 * const arr = toArray(options)
 * const random = arr[Math.floor(Math.random() * arr.length)]
 * // Random option
 * 
 * // Destructuring
 * const [first, second, ...rest] = toArray(new Set([1, 2, 3, 4, 5]))
 * // first: 1, second: 2, rest: [3, 4, 5]
 * 
 * // Length check
 * const items = new Set(["a", "b", "c"])
 * toArray(items).length
 * // 3
 * 
 * // Type narrowing
 * const mixedSet: Set<string | number> = new Set([1, "two", 3])
 * const strings = toArray(mixedSet).filter(
 *   (item): item is string => typeof item === "string"
 * )
 * // ["two"]
 * ```
 * @property Order-preserving - maintains insertion order
 * @property Type-safe - preserves element types
 * @property Immutable - creates new Array, doesn't modify Set
 */
const toArray = <T>(
	set: Set<T> | null | undefined
): Array<T> => {
	if (set == null || !(set instanceof Set)) {
		return []
	}
	
	// Using Array.from for optimal performance
	return Array.from(set)
}

export default toArray