/**
 * Combines two arrays element-wise using a function
 *
 * Takes a binary function and two arrays, applying the function to
 * corresponding elements from each array. The result length is the
 * minimum of the two input array lengths. Excess elements are ignored.
 *
 * @curried
 * @pure
 * @immutable
 * @safe
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
 * // Handle null/undefined gracefully
 * zipWith((a: number, b: number) => a + b)([1, 2])(null) // []
 * zipWith((a: number, b: number) => a + b)(null)([1, 2]) // []
 * ```
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
