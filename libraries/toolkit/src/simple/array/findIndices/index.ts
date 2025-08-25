/**
 * Returns all indices of elements that satisfy the predicate
 *
 * Finds and returns an array of all indices where the predicate function
 * returns true for the element at that index. Unlike findIndex which returns
 * only the first match, this returns all matching indices. Useful for locating
 * all occurrences, pattern matching, or multi-element operations.
 *
 * @curried (predicate) => (array) => result
 * @param predicate - Function to test each element
 * @param array - Array to search through
 * @returns Array of indices where predicate returns true
 * @example
 * ```typescript
 * // Find all even numbers
 * findIndices((x: number) => x % 2 === 0)([1, 2, 3, 4, 5, 6])
 * // [1, 3, 5]
 *
 * // Find all occurrences of a value
 * findIndices((x: string) => x === "a")(["a", "b", "a", "c", "a"])
 * // [0, 2, 4]
 *
 * // Find all numbers greater than 10
 * findIndices((x: number) => x > 10)([5, 15, 8, 20, 3, 12])
 * // [1, 3, 5]
 *
 * // Find all truthy values
 * findIndices(Boolean)([0, 1, false, true, "", "hello", null, 42])
 * // [1, 3, 5, 7]
 *
 * // Find all objects with specific property
 * const users = [
 *   { name: "Alice", active: true },
 *   { name: "Bob", active: false },
 *   { name: "Charlie", active: true },
 *   { name: "David", active: false },
 *   { name: "Eve", active: true }
 * ]
 * findIndices((u: { active: boolean }) => u.active)(users)
 * // [0, 2, 4]
 *
 * // Find all strings of specific length
 * findIndices((s: string) => s.length === 3)(["a", "foo", "bars", "baz", "qux"])
 * // [1, 3, 4]
 *
 * // Find all null or undefined values
 * findIndices((x: any) => x == null)([1, null, 3, undefined, 5, null])
 * // [1, 3, 5]
 *
 * // Find all elements matching regex
 * findIndices((s: string) => /^[A-Z]/.test(s))(["Apple", "banana", "Cherry", "date", "Elderberry"])
 * // [0, 2, 4]
 *
 * // Find all prime number positions
 * const isPrime = (n: number) => {
 *   if (n <= 1) return false
 *   for (let i = 2; i <= Math.sqrt(n); i++) {
 *     if (n % i === 0) return false
 *   }
 *   return true
 * }
 * findIndices(isPrime)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
 * // [1, 2, 4, 6, 10]
 *
 * // Find all local maxima indices
 * const array = [1, 3, 2, 5, 4, 6, 3]
 * findIndices((val: number, idx: number, arr: number[]) =>
 *   idx > 0 && idx < arr.length - 1 &&
 *   val > arr[idx - 1] && val > arr[idx + 1]
 * )(array)
 * // [1, 3, 5]
 *
 * // Find all duplicate positions (after first occurrence)
 * const items = ["a", "b", "a", "c", "b", "a"]
 * findIndices((val: string, idx: number, arr: string[]) =>
 *   arr.indexOf(val) !== idx
 * )(items)
 * // [2, 4, 5]
 *
 * // Find positions of errors
 * const results = [
 *   { status: "success" },
 *   { status: "error" },
 *   { status: "success" },
 *   { status: "error" },
 *   { status: "pending" }
 * ]
 * findIndices((r: { status: string }) => r.status === "error")(results)
 * // [1, 3]
 *
 * // Find all indices divisible by index
 * findIndices((val: number, idx: number) =>
 *   idx > 0 && val % idx === 0
 * )([10, 20, 30, 40, 50])
 * // [1, 2, 3, 4]
 *
 * // No matches
 * findIndices((x: number) => x > 100)([1, 2, 3, 4, 5])
 * // []
 *
 * // All match
 * findIndices((x: number) => x > 0)([1, 2, 3, 4, 5])
 * // [0, 1, 2, 3, 4]
 *
 * // Empty array
 * findIndices((x: any) => true)([])
 * // []
 *
 * // Find gap positions in sequence
 * const sequence = [1, 2, 4, 5, 8, 9]
 * findIndices((val: number, idx: number, arr: number[]) =>
 *   idx > 0 && val - arr[idx - 1] > 1
 * )(sequence)
 * // [2, 4]
 *
 * // Find all palindrome positions
 * const words = ["radar", "hello", "level", "world", "noon"]
 * findIndices((w: string) => w === w.split("").reverse().join(""))(words)
 * // [0, 2, 4]
 *
 * // Find positions of specific date patterns
 * const dates = [
 *   new Date("2024-01-01"),
 *   new Date("2024-01-15"),
 *   new Date("2024-02-01"),
 *   new Date("2024-02-15"),
 *   new Date("2024-03-01")
 * ]
 * findIndices((d: Date) => d.getDate() === 1)(dates)
 * // [0, 2, 4]
 *
 * // Complex predicate with multiple conditions
 * type Item = { value: number; category: string; active: boolean }
 * const inventory: Item[] = [
 *   { value: 100, category: "A", active: true },
 *   { value: 50, category: "B", active: false },
 *   { value: 200, category: "A", active: true },
 *   { value: 75, category: "C", active: true },
 *   { value: 150, category: "A", active: false }
 * ]
 * findIndices((item: Item) =>
 *   item.value > 100 && item.category === "A" && item.active
 * )(inventory)
 * // [2]
 *
 * // Partial application for reusable finders
 * const findEvens = findIndices((n: number) => n % 2 === 0)
 * findEvens([1, 2, 3, 4, 5])  // [1, 3]
 * findEvens([10, 15, 20, 25]) // [0, 2]
 *
 * const findNulls = findIndices((x: any) => x == null)
 * findNulls([1, null, 2, undefined, 3])  // [1, 3]
 * findNulls(["a", null, "b", null])       // [1, 3]
 *
 * // Handle null/undefined gracefully
 * findIndices((x: any) => true)(null)       // []
 * findIndices((x: any) => true)(undefined)  // []
 *
 * // Find indices for removal
 * const data = [1, -2, 3, -4, 5, -6]
 * const indicesToRemove = findIndices((n: number) => n < 0)(data)
 * // [1, 3, 5]
 * // Can be used to filter: data.filter((_, i) => !indicesToRemove.includes(i))
 *
 * // Find change points
 * const values = [1, 1, 2, 2, 2, 3, 3, 1, 1]
 * findIndices((val: number, idx: number, arr: number[]) =>
 *   idx > 0 && val !== arr[idx - 1]
 * )(values)
 * // [2, 5, 7]
 *
 * // Performance monitoring
 * const measurements = [100, 105, 98, 120, 95, 130, 102]
 * const threshold = 110
 * findIndices((m: number) => m > threshold)(measurements)
 * // [3, 5]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Complete - returns all matching indices
 * @property Order-preserving - indices are in ascending order
 */
const findIndices = <T>(
	predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<number> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}

	const indices: Array<number> = []

	for (let i = 0; i < array.length; i++) {
		if (predicate(array[i], i, array)) {
			indices.push(i)
		}
	}

	return indices
}

export default findIndices
