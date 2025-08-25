/**
 * Combines two arrays into an array of pairs
 *
 * Takes two arrays and returns an array of tuples, where each tuple
 * contains the elements at the same index from both arrays. The result
 * length is the minimum of the two input array lengths. This is a
 * special case of zipWith where the combining function creates a tuple.
 *
 * @curried (array2) => (array1) => result
 * @param array2 - Second array to zip
 * @param array1 - First array to zip
 * @returns Array of pairs [element1, element2]
 * @example
 * ```typescript
 * // Basic zip
 * zip([4, 5, 6])([1, 2, 3])
 * // [[1, 4], [2, 5], [3, 6]]
 *
 * // Different types
 * zip(["a", "b", "c"])([1, 2, 3])
 * // [[1, "a"], [2, "b"], [3, "c"]]
 *
 * // Different lengths (uses shorter)
 * zip([10, 20])([1, 2, 3, 4, 5])
 * // [[1, 10], [2, 20]]
 *
 * // Create key-value pairs
 * const keys = ["name", "age", "city"]
 * const values = ["Alice", 30, "NYC"]
 * zip(values)(keys)
 * // [["name", "Alice"], ["age", 30], ["city", "NYC"]]
 *
 * // Parallel arrays to objects
 * const ids = [1, 2, 3]
 * const names = ["Alice", "Bob", "Charlie"]
 * zip(names)(ids)
 * // [[1, "Alice"], [2, "Bob"], [3, "Charlie"]]
 * // Can map to objects: .map(([id, name]) => ({ id, name }))
 *
 * // Coordinate pairs
 * const xs = [1, 2, 3, 4]
 * const ys = [10, 20, 30, 40]
 * zip(ys)(xs)
 * // [[1, 10], [2, 20], [3, 30], [4, 40]]
 *
 * // Index with values
 * const items = ["a", "b", "c"]
 * const indices = [0, 1, 2]
 * zip(items)(indices)
 * // [[0, "a"], [1, "b"], [2, "c"]]
 *
 * // Empty arrays
 * zip([])([1, 2, 3])        // []
 * zip([1, 2, 3])([])        // []
 * zip([])([])               // []
 *
 * // Single element
 * zip([10])([1])            // [[1, 10]]
 *
 * // Complex objects
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" }
 * ]
 * const scores = [95, 87]
 * zip(scores)(users)
 * // [[{ id: 1, name: "Alice" }, 95], [{ id: 2, name: "Bob" }, 87]]
 *
 * // Partial application for pairing
 * const pairWithIndex = zip([0, 1, 2, 3, 4])
 * pairWithIndex(["a", "b", "c"])  // [["a", 0], ["b", 1], ["c", 2]]
 *
 * // Combine related data
 * const timestamps = ["2024-01-01", "2024-01-02", "2024-01-03"]
 * const temperatures = [20, 22, 19]
 * zip(temperatures)(timestamps)
 * // [["2024-01-01", 20], ["2024-01-02", 22], ["2024-01-03", 19]]
 *
 * // Creating test pairs
 * const inputs = [1, 2, 3, 4, 5]
 * const expected = [1, 4, 9, 16, 25]
 * zip(expected)(inputs)
 * // [[1, 1], [2, 4], [3, 9], [4, 16], [5, 25]]
 *
 * // Handle null/undefined gracefully
 * zip([1, 2])(null)         // []
 * zip([1, 2])(undefined)    // []
 * zip(null)([1, 2])         // []
 * zip(undefined)([1, 2])    // []
 *
 * // Can be used with Object.fromEntries
 * const entries = zip(["value1", "value2", "value3"])(["key1", "key2", "key3"])
 * // Object.fromEntries(entries) => { key1: "value1", key2: "value2", key3: "value3" }
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Truncating - result length is minimum of input lengths
 * @property Order-preserving - pairs elements at same indices
 */
const zip = <T, U>(
	array2: ReadonlyArray<U> | null | undefined,
) =>
(
	array1: ReadonlyArray<T> | null | undefined,
): Array<[T, U]> => {
	if (array1 == null || !Array.isArray(array1) || array1.length === 0) {
		return []
	}

	if (array2 == null || !Array.isArray(array2) || array2.length === 0) {
		return []
	}

	const length = Math.min(array1.length, array2.length)
	const result: Array<[T, U]> = []

	for (let i = 0; i < length; i++) {
		result.push([array1[i], array2[i]])
	}

	return result
}

export default zip
