/**
 * Creates a Set from an array
 * 
 * Converts an array to a Set, automatically removing duplicate values.
 * Elements are compared using SameValueZero equality. The order of
 * elements in the Set follows their first occurrence in the array.
 * 
 * @param array - Array to convert to Set
 * @returns New Set containing unique elements from the array
 * @example
 * ```typescript
 * // Basic conversion
 * fromArray([1, 2, 3, 4, 5])
 * // Set { 1, 2, 3, 4, 5 }
 * 
 * // Remove duplicates
 * fromArray([1, 2, 2, 3, 3, 3, 4])
 * // Set { 1, 2, 3, 4 }
 * 
 * // String array
 * fromArray(["apple", "banana", "apple", "cherry"])
 * // Set { "apple", "banana", "cherry" }
 * 
 * // Mixed types
 * fromArray([1, "two", 3, "two", true, 1])
 * // Set { 1, "two", 3, true }
 * 
 * // Empty array
 * fromArray([])
 * // Set { }
 * 
 * // Objects (reference equality)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * fromArray([obj1, obj2, obj1])
 * // Set { { id: 1 }, { id: 2 } }
 * 
 * // Note: different objects with same properties are distinct
 * fromArray([{ id: 1 }, { id: 1 }])
 * // Set { { id: 1 }, { id: 1 } } (two different objects)
 * 
 * // NaN handling (SameValueZero equality)
 * fromArray([NaN, NaN, NaN])
 * // Set { NaN } (only one NaN)
 * 
 * // Null and undefined
 * fromArray([null, undefined, null, undefined])
 * // Set { null, undefined }
 * 
 * // Zero handling (-0 and +0 are same)
 * fromArray([0, -0, +0])
 * // Set { 0 }
 * 
 * // Symbols
 * const sym1 = Symbol("test")
 * const sym2 = Symbol("test")
 * fromArray([sym1, sym2, sym1])
 * // Set { Symbol(test), Symbol(test) } (sym1 and sym2 are different)
 * 
 * // Use case: Get unique values
 * const tags = ["js", "react", "js", "vue", "react", "angular"]
 * const uniqueTags = fromArray(tags)
 * // Set { "js", "react", "vue", "angular" }
 * 
 * // Use case: Convert for set operations
 * const array1 = [1, 2, 3, 4]
 * const array2 = [3, 4, 5, 6]
 * const set1 = fromArray(array1)
 * const set2 = fromArray(array2)
 * // Now can use Set operations
 * 
 * // Chain with other operations
 * const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
 * const uniqueNumbers = fromArray(numbers)
 * // Set { 1, 2, 3, 4 }
 * 
 * // Handle null/undefined gracefully
 * fromArray(null)       // Set { }
 * fromArray(undefined)  // Set { }
 * 
 * // Process data pipeline
 * const rawData = [1, 1, 2, 3, 3, 4, 5, 5]
 * const processedSet = fromArray(rawData)
 * // Set { 1, 2, 3, 4, 5 }
 * 
 * // Preserve first occurrence order
 * fromArray(["c", "a", "b", "a", "c"])
 * // Set { "c", "a", "b" } (order of first occurrence)
 * ```
 * @property Deduplicating - automatically removes duplicate values
 * @property Order-preserving - maintains first occurrence order
 * @property SameValueZero - uses SameValueZero equality for comparisons
 */
const fromArray = <T>(
	array: ReadonlyArray<T> | null | undefined
): Set<T> => {
	if (array == null || !Array.isArray(array)) {
		return new Set()
	}
	
	return new Set(array)
}

export default fromArray