/**
 * Returns the union of two arrays (all unique elements from both)
 * 
 * Combines two arrays and returns all unique elements that appear in either
 * array. Duplicates within each array and across arrays are removed. Uses
 * SameValueZero equality for comparisons. Elements from the first array
 * appear before elements from the second array in the result. Useful for
 * merging lists, combining sets, or removing duplicates.
 * 
 * @curried (array1) => (array2) => result
 * @param array1 - First array
 * @param array2 - Second array
 * @returns Array containing all unique elements from both arrays
 * @example
 * ```typescript
 * // Basic union
 * union([1, 2, 3])([3, 4, 5])
 * // [1, 2, 3, 4, 5]
 * 
 * // No overlap
 * union([1, 2])([3, 4])
 * // [1, 2, 3, 4]
 * 
 * // Complete overlap
 * union([1, 2, 3])([1, 2, 3])
 * // [1, 2, 3]
 * 
 * // With duplicates in inputs
 * union([1, 1, 2, 2])([2, 2, 3, 3])
 * // [1, 2, 3]
 * 
 * // String arrays
 * union(["a", "b", "c"])(["c", "d", "e"])
 * // ["a", "b", "c", "d", "e"]
 * 
 * // Merge user lists
 * const groupA = ["Alice", "Bob", "Charlie"]
 * const groupB = ["Bob", "David", "Eve"]
 * union(groupA)(groupB)
 * // ["Alice", "Bob", "Charlie", "David", "Eve"]
 * 
 * // Combine tags
 * const tags1 = ["javascript", "react", "frontend"]
 * const tags2 = ["javascript", "node", "backend"]
 * union(tags1)(tags2)
 * // ["javascript", "react", "frontend", "node", "backend"]
 * 
 * // Merge permissions
 * const userPerms = ["read", "write"]
 * const adminPerms = ["read", "write", "delete", "admin"]
 * union(userPerms)(adminPerms)
 * // ["read", "write", "delete", "admin"]
 * 
 * // Combine feature flags
 * const featuresA = ["feature1", "feature2", "feature3"]
 * const featuresB = ["feature2", "feature4", "feature5"]
 * union(featuresA)(featuresB)
 * // ["feature1", "feature2", "feature3", "feature4", "feature5"]
 * 
 * // Empty arrays
 * union([])([1, 2, 3])
 * // [1, 2, 3]
 * 
 * union([1, 2, 3])([])
 * // [1, 2, 3]
 * 
 * union([])([])
 * // []
 * 
 * // Object comparison (by reference)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const obj3 = { id: 3 }
 * union([obj1, obj2])([obj2, obj3])
 * // [obj1, obj2, obj3]
 * 
 * // NaN handling (SameValueZero equality)
 * union([1, NaN, 2])([NaN, 3, 4])
 * // [1, NaN, 2, 3, 4]
 * 
 * // null and undefined
 * union([null, 1, undefined])([undefined, 2, null, 3])
 * // [null, 1, undefined, 2, 3]
 * 
 * // Mixed types
 * union([1, "a", true])([true, 2, "b", false])
 * // [1, "a", true, 2, "b", false]
 * 
 * // Combine shopping carts
 * const cart1 = ["apple", "banana", "orange"]
 * const cart2 = ["banana", "grape", "apple", "kiwi"]
 * union(cart1)(cart2)
 * // ["apple", "banana", "orange", "grape", "kiwi"]
 * 
 * // Merge playlists
 * const playlist1 = ["song1", "song2", "song3"]
 * const playlist2 = ["song3", "song4", "song5", "song1"]
 * union(playlist1)(playlist2)
 * // ["song1", "song2", "song3", "song4", "song5"]
 * 
 * // Combine search results
 * const results1 = ["result1", "result2", "result3"]
 * const results2 = ["result2", "result4", "result5"]
 * union(results1)(results2)
 * // ["result1", "result2", "result3", "result4", "result5"]
 * 
 * // Merge inventory
 * const warehouse1 = ["SKU001", "SKU002", "SKU003"]
 * const warehouse2 = ["SKU002", "SKU004", "SKU005"]
 * union(warehouse1)(warehouse2)
 * // ["SKU001", "SKU002", "SKU003", "SKU004", "SKU005"]
 * 
 * // Combine error codes
 * const errors1 = [404, 500, 503]
 * const errors2 = [400, 404, 502]
 * union(errors1)(errors2)
 * // [404, 500, 503, 400, 502]
 * 
 * // Handle null/undefined
 * union(null)([1, 2])       // [1, 2]
 * union(undefined)([1, 2])  // [1, 2]
 * union([1, 2])(null)       // [1, 2]
 * union([1, 2])(undefined)  // [1, 2]
 * 
 * // Combine skill sets
 * const developer1 = ["JavaScript", "React", "Node"]
 * const developer2 = ["JavaScript", "Vue", "Python", "React"]
 * union(developer1)(developer2)
 * // ["JavaScript", "React", "Node", "Vue", "Python"]
 * 
 * // Merge configuration options
 * const defaultConfig = ["option1", "option2", "option3"]
 * const userConfig = ["option2", "option4", "option5"]
 * union(defaultConfig)(userConfig)
 * // ["option1", "option2", "option3", "option4", "option5"]
 * 
 * // Combine menu items
 * const menu1 = ["burger", "pizza", "salad"]
 * const menu2 = ["pizza", "pasta", "soup", "salad"]
 * union(menu1)(menu2)
 * // ["burger", "pizza", "salad", "pasta", "soup"]
 * 
 * // Partial application for set building
 * const baseSet = union([1, 2, 3])
 * baseSet([4, 5])     // [1, 2, 3, 4, 5]
 * baseSet([2, 3, 6])  // [1, 2, 3, 6]
 * baseSet([])         // [1, 2, 3]
 * 
 * // Combine version features
 * const v1Features = ["feature1", "feature2", "feature3"]
 * const v2Features = ["feature2", "feature3", "feature4", "feature5"]
 * union(v1Features)(v2Features)
 * // ["feature1", "feature2", "feature3", "feature4", "feature5"]
 * 
 * // Network nodes
 * const network1 = ["nodeA", "nodeB", "nodeC"]
 * const network2 = ["nodeB", "nodeD", "nodeE", "nodeC"]
 * union(network1)(network2)
 * // ["nodeA", "nodeB", "nodeC", "nodeD", "nodeE"]
 * 
 * // Database records
 * const table1 = [101, 102, 103, 104]
 * const table2 = [103, 105, 106, 101]
 * union(table1)(table2)
 * // [101, 102, 103, 104, 105, 106]
 * 
 * // Color palettes
 * const palette1 = ["red", "blue", "green"]
 * const palette2 = ["yellow", "blue", "purple", "green"]
 * union(palette1)(palette2)
 * // ["red", "blue", "green", "yellow", "purple"]
 * 
 * // Language support
 * const app1Languages = ["en", "es", "fr"]
 * const app2Languages = ["en", "de", "it", "fr", "pt"]
 * union(app1Languages)(app2Languages)
 * // ["en", "es", "fr", "de", "it", "pt"]
 * 
 * // Set operations identity
 * const setA = [1, 2, 3]
 * union(setA)([])  // [1, 2, 3] (A ∪ ∅ = A)
 * union([])(setA)  // [1, 2, 3] (∅ ∪ A = A)
 * 
 * // Associative property: (A ∪ B) ∪ C = A ∪ (B ∪ C)
 * const a = [1, 2]
 * const b = [2, 3]
 * const c = [3, 4]
 * union(union(a)(b))(c)  // [1, 2, 3, 4]
 * union(a)(union(b)(c))  // [1, 2, 3, 4]
 * 
 * // Commutative property: A ∪ B = B ∪ A (same elements, maybe different order)
 * union([1, 2])([3, 4])  // [1, 2, 3, 4]
 * union([3, 4])([1, 2])  // [3, 4, 1, 2]
 * 
 * // File extensions
 * const images = [".jpg", ".png", ".gif"]
 * const documents = [".pdf", ".doc", ".txt", ".png"]
 * union(images)(documents)
 * // [".jpg", ".png", ".gif", ".pdf", ".doc", ".txt"]
 * 
 * // Team members across projects
 * const projectA = ["Alice", "Bob", "Charlie"]
 * const projectB = ["Bob", "David", "Eve", "Alice"]
 * union(projectA)(projectB)
 * // ["Alice", "Bob", "Charlie", "David", "Eve"]
 * 
 * // Combine test cases
 * const unitTests = ["test1", "test2", "test3"]
 * const integrationTests = ["test2", "test4", "test5"]
 * union(unitTests)(integrationTests)
 * // ["test1", "test2", "test3", "test4", "test5"]
 * 
 * // Order preservation
 * union([3, 1, 2])([2, 4, 5, 1])
 * // [3, 1, 2, 4, 5] (first array order, then new elements from second)
 * 
 * // Large arrays
 * const bigArray1 = Array.from({ length: 1000 }, (_, i) => i)
 * const bigArray2 = Array.from({ length: 1000 }, (_, i) => i + 500)
 * union(bigArray1)(bigArray2).length
 * // 1500 (0-999 union with 500-1499)
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Set-operation - Mathematical set union
 * @property Order-preserving - First array elements, then unique from second
 */
const union = <T>(
	array1: ReadonlyArray<T> | null | undefined
) => (
	array2: ReadonlyArray<T> | null | undefined
): Array<T> => {
	// Handle null/undefined cases
	if (array1 == null || !Array.isArray(array1)) {
		if (array2 == null || !Array.isArray(array2)) {
			return []
		}
		return [...new Set(array2)]
	}
	
	if (array2 == null || !Array.isArray(array2)) {
		return [...new Set(array1)]
	}
	
	// Create a Set from first array to remove duplicates
	const set = new Set(array1)
	
	// Add elements from second array
	for (const item of array2) {
		set.add(item)
	}
	
	return Array.from(set)
}

export default union