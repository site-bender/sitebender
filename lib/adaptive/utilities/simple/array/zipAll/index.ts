/**
 * Like zip but continues until the longest array is exhausted, using undefined for missing values
 * 
 * Combines elements from multiple arrays into tuples, continuing until the longest
 * array is exhausted. When arrays have different lengths, missing values are
 * filled with undefined. This ensures no data is lost and all array elements
 * are included in the result. Useful for processing arrays of different lengths,
 * data alignment, or when you need to preserve all values.
 * 
 * @curried (array2) => (array1) => result
 * @param array2 - Second array to zip with
 * @param array1 - First array to zip from
 * @returns Array of tuples containing elements from both arrays
 * @example
 * ```typescript
 * // Different length arrays
 * zipAll([4, 5, 6, 7])([1, 2, 3])
 * // [[1, 4], [2, 5], [3, 6], [undefined, 7]]
 * 
 * // First array longer
 * zipAll([4, 5])([1, 2, 3, 4])
 * // [[1, 4], [2, 5], [3, undefined], [4, undefined]]
 * 
 * // Same length (like regular zip)
 * zipAll(["a", "b", "c"])([1, 2, 3])
 * // [[1, "a"], [2, "b"], [3, "c"]]
 * 
 * // Mixed types with different lengths
 * zipAll([true, false])([1, 2, 3, 4, 5])
 * // [[1, true], [2, false], [3, undefined], [4, undefined], [5, undefined]]
 * 
 * // String arrays of different lengths
 * zipAll(["x", "y", "z", "w"])(["a", "b"])
 * // [["a", "x"], ["b", "y"], [undefined, "z"], [undefined, "w"]]
 * 
 * // Combine names and scores (missing scores)
 * const names = ["Alice", "Bob", "Charlie", "David"]
 * const scores = [85, 92, 78]
 * zipAll(scores)(names)
 * // [["Alice", 85], ["Bob", 92], ["Charlie", 78], ["David", undefined]]
 * 
 * // Time series data alignment
 * const timestamps = [1000, 2000, 3000, 4000, 5000]
 * const values = [10, 20, 30]
 * zipAll(values)(timestamps)
 * // [[1000, 10], [2000, 20], [3000, 30], [4000, undefined], [5000, undefined]]
 * 
 * // Form fields and validation results
 * const fields = ["email", "password", "confirm", "terms"]
 * const errors = ["invalid email", "too short"]
 * zipAll(errors)(fields)
 * // [["email", "invalid email"], ["password", "too short"], ["confirm", undefined], ["terms", undefined]]
 * 
 * // Data from different sources
 * const userIds = [1, 2, 3, 4, 5]
 * const profiles = [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }]
 * zipAll(profiles)(userIds)
 * // [[1, { name: "Alice" }], [2, { name: "Bob" }], [3, { name: "Charlie" }], [4, undefined], [5, undefined]]
 * 
 * // One empty array
 * zipAll([])(["a", "b", "c"])
 * // [["a", undefined], ["b", undefined], ["c", undefined]]
 * 
 * zipAll(["x", "y", "z"])([])
 * // [[undefined, "x"], [undefined, "y"], [undefined, "z"]]
 * 
 * // Both empty
 * zipAll([])([])
 * // []
 * 
 * // Single elements
 * zipAll([42])(["hello"])
 * // [["hello", 42]]
 * 
 * // Object arrays with different lengths
 * const products = [
 *   { id: 1, name: "Laptop" },
 *   { id: 2, name: "Mouse" },
 *   { id: 3, name: "Keyboard" }
 * ]
 * const reviews = [
 *   { rating: 5, comment: "Great!" },
 *   { rating: 4, comment: "Good" }
 * ]
 * zipAll(reviews)(products)
 * // [
 * //   [{ id: 1, name: "Laptop" }, { rating: 5, comment: "Great!" }],
 * //   [{ id: 2, name: "Mouse" }, { rating: 4, comment: "Good" }],
 * //   [{ id: 3, name: "Keyboard" }, undefined]
 * // ]
 * 
 * // Date and event arrays
 * const dates = [
 *   new Date("2024-01-01"),
 *   new Date("2024-01-02"),
 *   new Date("2024-01-03"),
 *   new Date("2024-01-04")
 * ]
 * const events = ["New Year", "Meeting"]
 * zipAll(events)(dates)
 * // [
 * //   [Date("2024-01-01"), "New Year"],
 * //   [Date("2024-01-02"), "Meeting"],
 * //   [Date("2024-01-03"), undefined],
 * //   [Date("2024-01-04"), undefined]
 * // ]
 * 
 * // Coordinates with labels
 * const coordinates = [[0, 0], [1, 1], [2, 4], [3, 9], [4, 16]]
 * const labels = ["origin", "unit", "square"]
 * zipAll(labels)(coordinates)
 * // [
 * //   [[0, 0], "origin"],
 * //   [[1, 1], "unit"],
 * //   [[2, 4], "square"],
 * //   [[3, 9], undefined],
 * //   [[4, 16], undefined]
 * // ]
 * 
 * // API responses with different result counts
 * const queries = ["users", "products", "orders", "analytics"]
 * const results = [
 *   { count: 150, data: [] },
 *   { count: 75, data: [] }
 * ]
 * zipAll(results)(queries)
 * // [
 * //   ["users", { count: 150, data: [] }],
 * //   ["products", { count: 75, data: [] }],
 * //   ["orders", undefined],
 * //   ["analytics", undefined]
 * // ]
 * 
 * // Partial application for consistent second array
 * const withDefaults = zipAll([true, false, true])
 * withDefaults(["setting1", "setting2", "setting3", "setting4", "setting5"])
 * // [["setting1", true], ["setting2", false], ["setting3", true], ["setting4", undefined], ["setting5", undefined]]
 * 
 * // Handle null/undefined gracefully
 * zipAll([1, 2, 3])(null)       // []
 * zipAll([1, 2, 3])(undefined)  // []
 * zipAll(null)([1, 2, 3])       // []
 * zipAll(undefined)([1, 2, 3])  // []
 * 
 * // Sparse data combination
 * const indices = [0, 1, 2, 3, 4, 5]
 * const values = [10, , 30, , 50]  // Sparse array
 * zipAll(values)(indices)
 * // [[0, 10], [1, undefined], [2, 30], [3, undefined], [4, 50], [5, undefined]]
 * 
 * // Multi-language support
 * const keys = ["welcome", "goodbye", "hello", "thanks", "error"]
 * const translations = ["Bienvenido", "Adiós", "Hola"]
 * zipAll(translations)(keys)
 * // [
 * //   ["welcome", "Bienvenido"],
 * //   ["goodbye", "Adiós"],
 * //   ["hello", "Hola"],
 * //   ["thanks", undefined],
 * //   ["error", undefined]
 * // ]
 * 
 * // Data validation scenarios
 * const inputFields = ["name", "email", "age", "phone", "address"]
 * const validationResults = [true, false, true]
 * zipAll(validationResults)(inputFields)
 * // [
 * //   ["name", true],
 * //   ["email", false],
 * //   ["age", true],
 * //   ["phone", undefined],
 * //   ["address", undefined]
 * // ]
 * 
 * // Statistical data alignment
 * const measurements = [1.2, 1.5, 1.8, 2.1, 2.4, 2.7]
 * const targets = [1.0, 1.5, 2.0]
 * zipAll(targets)(measurements)
 * // [
 * //   [1.2, 1.0],
 * //   [1.5, 1.5],
 * //   [1.8, 2.0],
 * //   [2.1, undefined],
 * //   [2.4, undefined],
 * //   [2.7, undefined]
 * // ]
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Length-preserving - result length equals longest input array
 * @property Undefined-filling - uses undefined for missing values
 */
const zipAll = <T, U>(
	array2: ReadonlyArray<U> | null | undefined
) => (
	array1: ReadonlyArray<T> | null | undefined
): Array<[T | undefined, U | undefined]> => {
	if (array1 == null || !Array.isArray(array1)) {
		array1 = []
	}
	if (array2 == null || !Array.isArray(array2)) {
		array2 = []
	}
	
	const maxLength = Math.max(array1.length, array2.length)
	const result: Array<[T | undefined, U | undefined]> = []
	
	for (let i = 0; i < maxLength; i++) {
		const value1 = i < array1.length ? array1[i] : undefined
		const value2 = i < array2.length ? array2[i] : undefined
		result.push([value1, value2])
	}
	
	return result
}

export default zipAll