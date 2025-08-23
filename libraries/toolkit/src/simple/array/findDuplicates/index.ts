/**
 * Returns array of elements that appear more than once
 * 
 * Identifies all elements in an array that occur two or more times.
 * Each duplicate element appears only once in the result, preserving
 * the order of first occurrence.
 * 
 * @param array - Array to search for duplicates
 * @returns Array containing each duplicate element once, in order of first occurrence
 * @example
 * ```typescript
 * // Find duplicate numbers
 * findDuplicates([1, 2, 3, 2, 4, 1, 5])
 * // [1, 2]
 * 
 * // Find duplicate strings
 * findDuplicates(["a", "b", "c", "b", "d", "a"])
 * // ["a", "b"]
 * 
 * // No duplicates
 * findDuplicates([1, 2, 3, 4, 5])
 * // []
 * 
 * // All duplicates
 * findDuplicates([1, 1, 2, 2, 3, 3])
 * // [1, 2, 3]
 * 
 * // Multiple occurrences (appears once in result)
 * findDuplicates([1, 1, 1, 2, 2, 2, 2])
 * // [1, 2]
 * 
 * // Mixed types
 * findDuplicates([1, "1", 2, "2", 1, "1"])
 * // [1, "1"]
 * 
 * // Objects (by reference)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * findDuplicates([obj1, obj2, obj1, obj2])
 * // [{ id: 1 }, { id: 2 }]
 * 
 * // Arrays (by reference)
 * const arr1 = [1, 2]
 * const arr2 = [3, 4]
 * findDuplicates([arr1, arr2, arr1, [1, 2]])
 * // [[1, 2]] (arr1 only, [1,2] is different reference)
 * 
 * // Detect duplicate user IDs
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 1, name: "Alice" },
 *   { id: 3, name: "Charlie" },
 *   { id: 2, name: "Bob" }
 * ]
 * const ids = users.map(u => u.id)
 * findDuplicates(ids)
 * // [1, 2]
 * 
 * // Find duplicate words in text
 * const words = "the quick brown fox jumps over the lazy dog".split(" ")
 * findDuplicates(words)
 * // ["the"]
 * 
 * // Boolean values
 * findDuplicates([true, false, true, false, true])
 * // [true, false]
 * 
 * // Null and undefined
 * findDuplicates([null, undefined, null, undefined, 1])
 * // [null, undefined]
 * 
 * // NaN handling (NaN !== NaN, so no duplicates)
 * findDuplicates([NaN, NaN, 1, 2])
 * // [] (NaN is never equal to itself)
 * 
 * // Single element
 * findDuplicates([1])
 * // []
 * 
 * // Empty array
 * findDuplicates([])
 * // []
 * 
 * // Handle null/undefined gracefully
 * findDuplicates(null)
 * // []
 * findDuplicates(undefined)
 * // []
 * 
 * // Find duplicate dates
 * const date1 = new Date("2024-01-01")
 * const date2 = new Date("2024-01-02")
 * const date3 = new Date("2024-01-01")
 * findDuplicates([date1, date2, date1, date3])
 * // [date1] (same reference, date3 is different object)
 * 
 * // Validate form for duplicate entries
 * const formValues = ["email1@test.com", "email2@test.com", "email1@test.com"]
 * const duplicateEmails = findDuplicates(formValues)
 * // ["email1@test.com"]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Order-preserving - maintains order of first occurrence
 * @property Reference-based - uses === for comparison (except for NaN)
 */
const findDuplicates = <T>(
	array: ReadonlyArray<T> | null | undefined
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}
	
	const seen = new Set<T>()
	const duplicates = new Set<T>()
	const result: Array<T> = []
	
	for (const item of array) {
		if (seen.has(item)) {
			// This is a duplicate, add to duplicates set if not already there
			if (!duplicates.has(item)) {
				duplicates.add(item)
				result.push(item)
			}
		} else {
			seen.add(item)
		}
	}
	
	return result
}

export default findDuplicates