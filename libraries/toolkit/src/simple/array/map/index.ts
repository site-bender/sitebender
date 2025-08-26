/**
 * Transforms each element of an array using a function
 *
 * Applies a transformation function to each element of the array,
 * creating a new array with the transformed values. The original
 * array is not modified. This is the fundamental operation for
 * data transformation in functional programming.
 *
 * @param fn - Function to transform each element
 * @param array - Array to transform
 * @returns New array with transformed elements
 * 
 * @pure
 * @curried
 * @immutable
 * 
 * @example
 * ```typescript
 * // Basic transformations
 * map((x: number) => x * 2)([1, 2, 3, 4])
 * // [2, 4, 6, 8]
 *
 * // String transformations
 * map((s: string) => s.toUpperCase())(["hello", "world"])
 * // ["HELLO", "WORLD"]
 *
 * // Object property extraction
 * const users = [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }]
 * map((user: { name: string }) => user.name)(users)
 * // ["Alice", "Bob"]
 *
 * // With index
 * map((x: number, i: number) => x + i)([10, 20, 30])
 * // [10, 21, 32]
 *
 * // Type transformation
 * map((n: number) => n.toString())([1, 2, 3])
 * // ["1", "2", "3"]
 *
 * // Partial application
 * const double = map((x: number) => x * 2)
 * double([1, 2, 3]) // [2, 4, 6]
 *
 * // Edge cases
 * map((x: number) => x * 2)(null)  // []
 * map((x: number) => x * 2)([])    // []
 * ```
 */
const map = <T, U>(
	fn: (element: T, index: number, array: ReadonlyArray<T>) => U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<U> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}

	return array.map(fn)
}

export default map
