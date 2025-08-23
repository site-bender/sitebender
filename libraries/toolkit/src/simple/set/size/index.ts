/**
 * Returns the number of elements in a Set
 * 
 * Gets the size property of the Set, which represents the number of
 * unique elements it contains. Returns 0 for null/undefined. This
 * provides a functional interface to the size property.
 * 
 * @param set - Set to get size of
 * @returns Number of elements in the Set
 * @example
 * ```typescript
 * // Basic size
 * size(new Set([1, 2, 3, 4, 5]))
 * // 5
 * 
 * // Empty Set
 * size(new Set())
 * // 0
 * 
 * // Single element
 * size(new Set([42]))
 * // 1
 * 
 * // Duplicates don't count (Set uniqueness)
 * size(new Set([1, 1, 1, 2, 2, 3]))
 * // 3
 * 
 * // String Set
 * size(new Set(["hello", "world"]))
 * // 2
 * 
 * // Mixed types
 * size(new Set([1, "two", true, null, undefined]))
 * // 5
 * 
 * // After operations
 * const mySet = new Set([1, 2, 3])
 * mySet.add(4)
 * size(mySet)
 * // 4
 * 
 * // After deletion
 * const numbers = new Set([1, 2, 3, 4, 5])
 * numbers.delete(3)
 * size(numbers)
 * // 4
 * 
 * // NaN is counted once
 * size(new Set([NaN, NaN, NaN]))
 * // 1
 * 
 * // Objects are counted by reference
 * size(new Set([{}, {}, {}]))
 * // 3 (three different objects)
 * 
 * const obj = { id: 1 }
 * size(new Set([obj, obj, obj]))
 * // 1 (same reference)
 * 
 * // Use for pagination
 * const items = new Set(["item1", "item2", "item3"])
 * const pageSize = 10
 * const totalPages = Math.ceil(size(items) / pageSize)
 * // 1
 * 
 * // Use for validation
 * const selectedOptions = new Set(["option1", "option2"])
 * const isValid = size(selectedOptions) >= 1 && size(selectedOptions) <= 5
 * // true
 * 
 * // Check if processing needed
 * const queue = new Set()
 * if (size(queue) > 0) {
 *   // Process queue
 * }
 * 
 * // Compare Set sizes
 * const set1 = new Set([1, 2, 3])
 * const set2 = new Set([4, 5, 6, 7])
 * size(set1) < size(set2)
 * // true
 * 
 * // Use in statistics
 * const uniqueVisitors = new Set(["user1", "user2", "user3"])
 * console.log(`Unique visitors: ${size(uniqueVisitors)}`)
 * // "Unique visitors: 3"
 * 
 * // Monitor growth
 * const cache = new Set()
 * const initialSize = size(cache)
 * cache.add("value1")
 * cache.add("value2")
 * const growth = size(cache) - initialSize
 * // 2
 * 
 * // Handle null/undefined gracefully
 * size(null)       // 0
 * size(undefined)  // 0
 * 
 * // Use with conditional logic
 * const errors = new Set(["error1", "error2"])
 * const hasMultipleErrors = size(errors) > 1
 * // true
 * 
 * // Calculate percentage
 * const completed = new Set(["task1", "task2"])
 * const total = new Set(["task1", "task2", "task3", "task4", "task5"])
 * const percentComplete = (size(completed) / size(total)) * 100
 * // 40
 * 
 * // Memory estimation (rough)
 * const dataSet = new Set([1, 2, 3, 4, 5])
 * const approxMemory = size(dataSet) * 8 // assuming 8 bytes per number
 * // 40 bytes (rough estimate)
 * 
 * // Check limits
 * const tags = new Set(["tag1", "tag2", "tag3"])
 * const MAX_TAGS = 10
 * const canAddMore = size(tags) < MAX_TAGS
 * // true
 * 
 * // Symbols
 * size(new Set([Symbol("a"), Symbol("b"), Symbol("c")]))
 * // 3
 * ```
 * @property Pure - no side effects, just returns number
 * @property Null-safe - returns 0 for null/undefined
 * @property Constant-time - O(1) operation
 */
const size = <T>(
	set: Set<T> | null | undefined
): number => {
	if (set == null || !(set instanceof Set)) {
		return 0
	}
	
	return set.size
}

export default size