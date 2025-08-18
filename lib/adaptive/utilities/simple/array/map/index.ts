/**
 * Transforms each element of an array using a function
 * 
 * Applies a transformation function to each element of the array,
 * creating a new array with the transformed values. The original
 * array is not modified. This is the fundamental operation for
 * data transformation in functional programming.
 * 
 * @curried (fn) => (array) => result
 * @param fn - Function to transform each element
 * @param array - Array to transform
 * @returns New array with transformed elements
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
 * map((user: { name: string; age: number }) => user.name)([
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 }
 * ])
 * // ["Alice", "Bob"]
 * 
 * // Complex transformations
 * map((n: number) => ({ value: n, squared: n * n }))([1, 2, 3])
 * // [{ value: 1, squared: 1 }, { value: 2, squared: 4 }, { value: 3, squared: 9 }]
 * 
 * // With index
 * map((x: number, i: number) => x + i)([10, 20, 30])
 * // [10, 21, 32]
 * 
 * // Chaining transformations
 * const double = map((x: number) => x * 2)
 * const addOne = map((x: number) => x + 1)
 * addOne(double([1, 2, 3])) // [3, 5, 7]
 * 
 * // Type transformations
 * map((n: number) => n.toString())([1, 2, 3])
 * // ["1", "2", "3"]
 * 
 * // Parse strings to numbers
 * map((s: string) => parseInt(s, 10))(["1", "2", "3"])
 * // [1, 2, 3]
 * 
 * // Handle null/undefined gracefully
 * map((x: number) => x * 2)(null)       // []
 * map((x: number) => x * 2)(undefined)  // []
 * map((x: number) => x * 2)([])         // []
 * 
 * // Partial application for reusable transformers
 * const double = map((x: number) => x * 2)
 * double([1, 2, 3])     // [2, 4, 6]
 * double([10, 20, 30])  // [20, 40, 60]
 * 
 * const getName = map((obj: { name: string }) => obj.name)
 * getName([{ name: "Alice" }, { name: "Bob" }])  // ["Alice", "Bob"]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Structure-preserving - output array has same length as input
 * @property Functor - follows functor laws (identity and composition)
 */
const map = <T, U>(
	fn: (element: T, index: number, array: ReadonlyArray<T>) => U
) => (
	array: ReadonlyArray<T> | null | undefined
): Array<U> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}
	
	return array.map(fn)
}

export default map
