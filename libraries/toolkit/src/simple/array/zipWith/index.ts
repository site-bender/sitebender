/**
 * Combines two arrays element-wise using a function
 *
 * Takes a binary function and two arrays, applying the function to
 * corresponding elements from each array. The result length is the
 * minimum of the two input array lengths. Excess elements are ignored.
 *
 * @curried (fn) => (array1) => (array2) => result
 * @param fn - Binary function to combine elements (a: T, b: U) => V
 * @param array1 - First array
 * @param array2 - Second array
 * @returns New array with combined elements
 * @example
 * ```typescript
 * // Add corresponding elements
 * zipWith((a: number, b: number) => a + b)([1, 2, 3])([10, 20, 30])
 * // [11, 22, 33]
 *
 * // Different length arrays (uses shorter length)
 * zipWith((a: number, b: number) => a * b)([1, 2, 3, 4])([10, 20])
 * // [10, 40]
 *
 * // Create tuples
 * zipWith((a: string, b: number) => [a, b] as const)(["a", "b", "c"])([1, 2, 3])
 * // [["a", 1], ["b", 2], ["c", 3]]
 *
 * // Create objects
 * zipWith((name: string, age: number) => ({ name, age }))(
 *   ["Alice", "Bob", "Charlie"]
 * )([30, 25, 35])
 * // [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }, { name: "Charlie", age: 35 }]
 *
 * // String concatenation
 * zipWith((a: string, b: string) => `${a}-${b}`)(["A", "B", "C"])(["1", "2", "3"])
 * // ["A-1", "B-2", "C-3"]
 *
 * // Boolean operations
 * zipWith((a: boolean, b: boolean) => a && b)([true, true, false])([true, false, true])
 * // [true, false, false]
 *
 * // Calculate differences
 * zipWith((a: number, b: number) => Math.abs(a - b))([10, 20, 30])([15, 18, 35])
 * // [5, 2, 5]
 *
 * // Partial application for reusable combiners
 * const zip = zipWith((a: any, b: any) => [a, b] as const)
 * zip([1, 2, 3])(["a", "b", "c"]) // [[1, "a"], [2, "b"], [3, "c"]]
 *
 * const addArrays = zipWith((a: number, b: number) => a + b)
 * addArrays([1, 2, 3])([4, 5, 6]) // [5, 7, 9]
 *
 * // Handle null/undefined gracefully
 * zipWith((a: number, b: number) => a + b)([1, 2])(null) // []
 * zipWith((a: number, b: number) => a + b)(null)([1, 2]) // []
 * zipWith((a: number, b: number) => a + b)([1, 2])([]) // []
 *
 * // Complex example: merge coordinate arrays
 * const coords1 = [{ x: 1 }, { x: 2 }, { x: 3 }]
 * const coords2 = [{ y: 10 }, { y: 20 }, { y: 30 }]
 * zipWith((a: { x: number }, b: { y: number }) => ({ ...a, ...b }))(coords1)(coords2)
 * // [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }]
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Aligned - combines elements at same indices
 * @property Truncating - result length is minimum of input lengths
 */
const zipWith = <T, U, V>(
	fn: (a: T, b: U) => V,
) =>
(
	array1: ReadonlyArray<T> | null | undefined,
) =>
(
	array2: ReadonlyArray<U> | null | undefined,
): Array<V> => {
	if (
		array1 == null || !Array.isArray(array1) || array1.length === 0 ||
		array2 == null || !Array.isArray(array2) || array2.length === 0
	) {
		return []
	}

	const minLength = Math.min(array1.length, array2.length)

	// Build result using recursion
	const zipRecursive = (index: number): Array<V> => {
		if (index >= minLength) {
			return []
		}

		return [
			fn(array1[index], array2[index]),
			...zipRecursive(index + 1),
		]
	}

	return zipRecursive(0)
}

export default zipWith
