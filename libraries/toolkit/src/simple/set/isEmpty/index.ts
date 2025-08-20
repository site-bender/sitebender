/**
 * Checks if a Set is empty
 * 
 * Returns true if the Set has no elements (size is 0), false otherwise.
 * This is a simple wrapper around checking the size property, but provides
 * a more semantic and functional interface.
 * 
 * @param set - Set to check
 * @returns True if Set is empty, false otherwise
 * @example
 * ```typescript
 * // Empty Set
 * isEmpty(new Set())
 * // true
 * 
 * // Non-empty Set
 * isEmpty(new Set([1, 2, 3]))
 * // false
 * 
 * // Single element
 * isEmpty(new Set([1]))
 * // false
 * 
 * // Set with undefined
 * isEmpty(new Set([undefined]))
 * // false (has one element: undefined)
 * 
 * // Set with null
 * isEmpty(new Set([null]))
 * // false (has one element: null)
 * 
 * // After clearing
 * const mySet = new Set([1, 2, 3])
 * mySet.clear()
 * isEmpty(mySet)
 * // true
 * 
 * // After deleting all elements
 * const numbers = new Set([1, 2])
 * numbers.delete(1)
 * numbers.delete(2)
 * isEmpty(numbers)
 * // true
 * 
 * // Use in conditional logic
 * const errors = new Set()
 * if (isEmpty(errors)) {
 *   console.log("No errors!")
 * }
 * 
 * // Filter empty Sets from array
 * const sets = [
 *   new Set([1, 2]),
 *   new Set(),
 *   new Set(["a"]),
 *   new Set()
 * ]
 * sets.filter(set => !isEmpty(set))
 * // [Set { 1, 2 }, Set { "a" }]
 * 
 * // Validation use case
 * const selectedItems = new Set()
 * const canProceed = !isEmpty(selectedItems)
 * // false (can't proceed with no selections)
 * 
 * // Cache checking
 * const cache = new Set()
 * if (isEmpty(cache)) {
 *   // Populate cache
 * }
 * 
 * // Permission checking
 * const userPermissions = new Set()
 * const hasNoPermissions = isEmpty(userPermissions)
 * // true
 * 
 * // Handle null/undefined gracefully
 * isEmpty(null)       // true
 * isEmpty(undefined)  // true
 * 
 * // Type checking with isEmpty
 * const processSet = <T>(set: Set<T>) => {
 *   if (isEmpty(set)) {
 *     return "Set is empty"
 *   }
 *   return `Set has ${set.size} items`
 * }
 * 
 * // Combine with other operations
 * const tags = new Set(["javascript", "typescript"])
 * const hasNoTags = isEmpty(tags)
 * // false
 * 
 * // After filter operation
 * const filtered = filter((x: number) => x > 10)(new Set([1, 2, 3]))
 * isEmpty(filtered)
 * // true (no elements > 10)
 * 
 * // Check before operations
 * const items = new Set([1, 2, 3])
 * if (!isEmpty(items)) {
 *   // Safe to get first item, etc.
 * }
 * ```
 * @property Pure - no side effects, just returns boolean
 * @property Null-safe - returns true for null/undefined
 * @property Semantic - clearer intent than checking size === 0
 */
const isEmpty = <T>(
	set: Set<T> | null | undefined
): boolean => {
	if (set == null || !(set instanceof Set)) {
		return true
	}
	
	return set.size === 0
}

export default isEmpty