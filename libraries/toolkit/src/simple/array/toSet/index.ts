/**
 * Converts an array to a Set
 *
 * Creates a new Set from an array, automatically removing duplicate values.
 * The Set will contain only unique elements from the original array,
 * maintaining insertion order.
 *
 * @param array - The array to convert to a Set
 * @returns A new Set containing the unique elements from the array
 * @example
 * ```typescript
 * // Basic conversion
 * toSet([1, 2, 3, 2, 1])    // Set(3) { 1, 2, 3 }
 * toSet(["a", "b", "a"])     // Set(2) { "a", "b" }
 * toSet([])                  // Set(0) {}
 *
 * // With mixed types
 * toSet([1, "1", true, 1])   // Set(3) { 1, "1", true }
 *
 * // With objects (reference equality)
 * const obj = { a: 1 }
 * toSet([obj, obj, { a: 1 }]) // Set(2) { {a: 1}, {a: 1} }
 * // Note: Two different object instances, even with same content
 *
 * // Use for deduplication
 * const numbers = [1, 2, 2, 3, 3, 3, 4]
 * const unique = toSet(numbers)
 * console.log(unique.size)   // 4
 *
 * // Convert back to array if needed
 * const uniqueArray = Array.from(toSet([1, 2, 2, 3]))
 * // [1, 2, 3]
 *
 * // Use with Set methods
 * const set = toSet([1, 2, 3])
 * set.has(2)                 // true
 * set.add(4)                 // Set(4) { 1, 2, 3, 4 }
 * set.delete(1)              // true
 *
 * // Intersection of arrays using Sets
 * const arr1 = [1, 2, 3, 4]
 * const arr2 = [3, 4, 5, 6]
 * const set1 = toSet(arr1)
 * const set2 = toSet(arr2)
 * const intersection = new Set(
 *   [...set1].filter(x => set2.has(x))
 * )
 * // Set(2) { 3, 4 }
 * ```
 * @property Pure - Creates a new Set, doesn't modify the input array
 * @property Deduplication - Automatically removes duplicate values
 * @property Order - Maintains insertion order of first occurrence
 */
const toSet = <T>(array: Array<T>): Set<T> => {
	return new Set(array)
}

export default toSet
