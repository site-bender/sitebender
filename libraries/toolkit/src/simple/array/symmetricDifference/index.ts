/**
 * Returns elements that are in either array but not both
 * 
 * Computes the symmetric difference (XOR) of two arrays - elements that
 * exist in exactly one of the arrays. Uses SameValueZero equality for
 * comparisons. The result contains unique elements from both arrays that
 * don't appear in their intersection. Useful for finding changes, unique
 * items, or exclusive elements between sets.
 * 
 * @curried (array1) => (array2) => result
 * @param array1 - First array
 * @param array2 - Second array  
 * @returns Array of elements in either array but not both
 * @example
 * ```typescript
 * // Basic symmetric difference
 * symmetricDifference([1, 2, 3])([3, 4, 5])
 * // [1, 2, 4, 5]
 * 
 * // No overlap
 * symmetricDifference([1, 2])([3, 4])
 * // [1, 2, 3, 4]
 * 
 * // Complete overlap
 * symmetricDifference([1, 2, 3])([1, 2, 3])
 * // []
 * 
 * // String arrays
 * symmetricDifference(["a", "b", "c"])(["b", "c", "d"])
 * // ["a", "d"]
 * 
 * // Find changed items
 * const oldItems = ["item1", "item2", "item3"]
 * const newItems = ["item2", "item3", "item4"]
 * symmetricDifference(oldItems)(newItems)
 * // ["item1", "item4"] (removed: item1, added: item4)
 * 
 * // User permissions difference
 * const user1Perms = ["read", "write", "delete"]
 * const user2Perms = ["read", "write", "admin"]
 * symmetricDifference(user1Perms)(user2Perms)
 * // ["delete", "admin"] (unique to each user)
 * 
 * // Feature flags difference
 * const enabledA = ["feature1", "feature2", "feature3"]
 * const enabledB = ["feature2", "feature3", "feature4"]
 * symmetricDifference(enabledA)(enabledB)
 * // ["feature1", "feature4"]
 * 
 * // Shopping cart comparison
 * const cart1 = ["apple", "banana", "orange"]
 * const cart2 = ["banana", "orange", "grape"]
 * symmetricDifference(cart1)(cart2)
 * // ["apple", "grape"] (unique items)
 * 
 * // Set operations
 * const setA = [1, 2, 3, 4, 5]
 * const setB = [4, 5, 6, 7, 8]
 * symmetricDifference(setA)(setB)
 * // [1, 2, 3, 6, 7, 8]
 * 
 * // Duplicates are removed
 * symmetricDifference([1, 1, 2, 2])([2, 2, 3, 3])
 * // [1, 3] (unique values only)
 * 
 * // Order preservation (elements from first array, then second)
 * symmetricDifference([3, 1, 2])([2, 4, 5])
 * // [3, 1, 4, 5]
 * 
 * // Empty arrays
 * symmetricDifference([])([1, 2, 3])
 * // [1, 2, 3]
 * 
 * symmetricDifference([1, 2, 3])([])
 * // [1, 2, 3]
 * 
 * symmetricDifference([])([])
 * // []
 * 
 * // Object comparison (by reference)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * symmetricDifference([obj1, obj2])([obj2, { id: 3 }])
 * // [obj1, { id: 3 }]
 * 
 * // NaN handling
 * symmetricDifference([1, NaN, 2])([NaN, 3, 4])
 * // [1, 2, 3, 4] (NaN is considered equal to NaN)
 * 
 * // null and undefined
 * symmetricDifference([null, 1, undefined])([undefined, 2, null])
 * // [1, 2]
 * 
 * // File sync detection
 * const localFiles = ["file1.txt", "file2.txt", "file3.txt"]
 * const remoteFiles = ["file2.txt", "file3.txt", "file4.txt"]
 * symmetricDifference(localFiles)(remoteFiles)
 * // ["file1.txt", "file4.txt"] (out of sync files)
 * 
 * // Tag differences
 * const article1Tags = ["javascript", "react", "frontend"]
 * const article2Tags = ["javascript", "node", "backend"]
 * symmetricDifference(article1Tags)(article2Tags)
 * // ["react", "frontend", "node", "backend"]
 * 
 * // Team member changes
 * const teamBefore = ["Alice", "Bob", "Charlie"]
 * const teamAfter = ["Bob", "Charlie", "David"]
 * symmetricDifference(teamBefore)(teamAfter)
 * // ["Alice", "David"] (left: Alice, joined: David)
 * 
 * // Playlist differences
 * const playlist1 = ["song1", "song2", "song3"]
 * const playlist2 = ["song2", "song3", "song4", "song5"]
 * symmetricDifference(playlist1)(playlist2)
 * // ["song1", "song4", "song5"]
 * 
 * // Configuration differences
 * const config1 = ["optionA", "optionB", "optionC"]
 * const config2 = ["optionB", "optionC", "optionD"]
 * symmetricDifference(config1)(config2)
 * // ["optionA", "optionD"]
 * 
 * // Error code differences
 * const errors1 = [404, 500, 503]
 * const errors2 = [400, 404, 500]
 * symmetricDifference(errors1)(errors2)
 * // [503, 400]
 * 
 * // Mixed types
 * symmetricDifference([1, "a", true])([true, 2, "b"])
 * // [1, "a", 2, "b"]
 * 
 * // Handle null/undefined
 * symmetricDifference(null)([1, 2])       // [1, 2]
 * symmetricDifference(undefined)([1, 2])  // [1, 2]
 * symmetricDifference([1, 2])(null)       // [1, 2]
 * symmetricDifference([1, 2])(undefined)  // [1, 2]
 * 
 * // Skill differences
 * const developer1Skills = ["JavaScript", "React", "Node"]
 * const developer2Skills = ["JavaScript", "Vue", "Python"]
 * symmetricDifference(developer1Skills)(developer2Skills)
 * // ["React", "Node", "Vue", "Python"]
 * 
 * // Inventory differences
 * const warehouse1 = ["SKU001", "SKU002", "SKU003"]
 * const warehouse2 = ["SKU002", "SKU003", "SKU004", "SKU005"]
 * symmetricDifference(warehouse1)(warehouse2)
 * // ["SKU001", "SKU004", "SKU005"]
 * 
 * // Schedule conflicts
 * const person1Busy = ["9:00", "10:00", "14:00"]
 * const person2Busy = ["10:00", "11:00", "14:00"]
 * symmetricDifference(person1Busy)(person2Busy)
 * // ["9:00", "11:00"] (unique busy times)
 * 
 * // Menu differences
 * const menu1 = ["burger", "pizza", "salad"]
 * const menu2 = ["pizza", "salad", "pasta", "soup"]
 * symmetricDifference(menu1)(menu2)
 * // ["burger", "pasta", "soup"]
 * 
 * // Partial application for comparison
 * const diffWithBase = symmetricDifference([1, 2, 3, 4, 5])
 * diffWithBase([3, 4, 5, 6, 7])  // [1, 2, 6, 7]
 * diffWithBase([1, 2])            // [3, 4, 5]
 * diffWithBase([6, 7, 8])         // [1, 2, 3, 4, 5, 6, 7, 8]
 * 
 * // Version feature differences
 * const v1Features = ["feature1", "feature2", "feature3"]
 * const v2Features = ["feature2", "feature3", "feature4", "feature5"]
 * symmetricDifference(v1Features)(v2Features)
 * // ["feature1", "feature4", "feature5"]
 * 
 * // Symmetric property: A △ B = B △ A
 * const a = [1, 2, 3]
 * const b = [2, 3, 4]
 * symmetricDifference(a)(b)  // [1, 4]
 * symmetricDifference(b)(a)  // [4, 1] (same elements, possibly different order)
 * 
 * // A/B test groups (find non-overlapping users)
 * const groupA = ["user1", "user2", "user3"]
 * const groupB = ["user2", "user3", "user4", "user5"]
 * symmetricDifference(groupA)(groupB)
 * // ["user1", "user4", "user5"] (exclusive to each group)
 * 
 * // Database record differences
 * const table1Ids = [101, 102, 103, 104]
 * const table2Ids = [103, 104, 105, 106]
 * symmetricDifference(table1Ids)(table2Ids)
 * // [101, 102, 105, 106] (records to sync)
 * 
 * // Color palette differences
 * const palette1 = ["red", "blue", "green"]
 * const palette2 = ["blue", "green", "yellow", "purple"]
 * symmetricDifference(palette1)(palette2)
 * // ["red", "yellow", "purple"]
 * 
 * // Network node differences
 * const network1 = ["nodeA", "nodeB", "nodeC"]
 * const network2 = ["nodeB", "nodeC", "nodeD", "nodeE"]
 * symmetricDifference(network1)(network2)
 * // ["nodeA", "nodeD", "nodeE"]
 * 
 * // Language support differences
 * const app1Languages = ["en", "es", "fr"]
 * const app2Languages = ["en", "de", "it", "fr"]
 * symmetricDifference(app1Languages)(app2Languages)
 * // ["es", "de", "it"]
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Symmetric - Order of arrays doesn't affect result elements
 * @property Unique - Returns unique elements only
 */
const symmetricDifference = <T>(
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
	
	// Create sets for efficient lookup
	const set1 = new Set(array1)
	const set2 = new Set(array2)
	
	const result: Array<T> = []
	
	// Add elements from array1 that are not in array2
	for (const item of set1) {
		if (!set2.has(item)) {
			result.push(item)
		}
	}
	
	// Add elements from array2 that are not in array1
	for (const item of set2) {
		if (!set1.has(item)) {
			result.push(item)
		}
	}
	
	return result
}

export default symmetricDifference