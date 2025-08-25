import type { Lens } from "../lens/index.ts"

import lens from "../lens/index.ts"

/**
 * Creates a lens focused on an array index
 *
 * Returns a lens that focuses on a specific index in an array, allowing
 * immutable get and set operations at that position. Handles negative
 * indices (counting from the end) and out-of-bounds access gracefully.
 * When setting at an out-of-bounds index, the array is extended with
 * undefined values as needed.
 *
 * @param index - The array index to focus on (negative counts from end)
 * @returns A lens focused on the specified array index
 * @example
 * ```typescript
 * // Basic array index access
 * const firstLens = lensIndex(0)
 * const arr = [1, 2, 3, 4, 5]
 *
 * firstLens.get(arr)                      // 1
 * firstLens.set(10)(arr)                  // [10, 2, 3, 4, 5]
 * arr                                     // [1, 2, 3, 4, 5] (unchanged)
 *
 * // Middle index
 * const thirdLens = lensIndex(2)
 * thirdLens.get([1, 2, 3, 4, 5])         // 3
 * thirdLens.set(30)([1, 2, 3, 4, 5])     // [1, 2, 30, 4, 5]
 *
 * // Last index
 * const lastLens = lensIndex(4)
 * lastLens.get([1, 2, 3, 4, 5])          // 5
 * lastLens.set(50)([1, 2, 3, 4, 5])      // [1, 2, 3, 4, 50]
 *
 * // Negative indices (from end)
 * const lastItemLens = lensIndex(-1)
 * lastItemLens.get([1, 2, 3])            // 3
 * lastItemLens.set(30)([1, 2, 3])        // [1, 2, 30]
 *
 * const secondLastLens = lensIndex(-2)
 * secondLastLens.get([1, 2, 3, 4])       // 3
 * secondLastLens.set(30)([1, 2, 3, 4])   // [1, 2, 30, 4]
 *
 * // Out of bounds - get returns undefined
 * const tenthLens = lensIndex(10)
 * tenthLens.get([1, 2, 3])               // undefined
 *
 * // Out of bounds - set extends array with undefined
 * const fifthLens = lensIndex(5)
 * fifthLens.set(60)([1, 2, 3])
 * // [1, 2, 3, undefined, undefined, 60]
 *
 * // Empty array
 * const zeroLens = lensIndex(0)
 * zeroLens.get([])                       // undefined
 * zeroLens.set(1)([])                    // [1]
 *
 * // With array of objects
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 3, name: "Charlie" }
 * ]
 *
 * const secondUserLens = lensIndex(1)
 * secondUserLens.get(users)              // { id: 2, name: "Bob" }
 * secondUserLens.set({ id: 2, name: "Robert" })(users)
 * // [
 * //   { id: 1, name: "Alice" },
 * //   { id: 2, name: "Robert" },
 * //   { id: 3, name: "Charlie" }
 * // ]
 *
 * // Combining with object updates
 * const updateSecondUserName = (name: string) => (users: typeof users) => {
 *   const user = secondUserLens.get(users)
 *   if (user) {
 *     return secondUserLens.set({ ...user, name })(users)
 *   }
 *   return users
 * }
 *
 * updateSecondUserName("Bobby")(users)
 * // Updates just the name of the second user
 *
 * // Working with nested arrays
 * const matrix = [[1, 2], [3, 4], [5, 6]]
 * const secondRowLens = lensIndex(1)
 * secondRowLens.get(matrix)              // [3, 4]
 * secondRowLens.set([30, 40])(matrix)    // [[1, 2], [30, 40], [5, 6]]
 *
 * // Composing with other operations
 * const todos = [
 *   { task: "Code", done: false },
 *   { task: "Test", done: false },
 *   { task: "Deploy", done: false }
 * ]
 *
 * const markDone = (index: number) => (todos: typeof todos) => {
 *   const todoLens = lensIndex(index)
 *   const todo = todoLens.get(todos)
 *   if (todo) {
 *     return todoLens.set({ ...todo, done: true })(todos)
 *   }
 *   return todos
 * }
 *
 * markDone(1)(todos)
 * // [
 * //   { task: "Code", done: false },
 * //   { task: "Test", done: true },
 * //   { task: "Deploy", done: false }
 * // ]
 *
 * // Type-safe array updates
 * const numbers: Array<number> = [1, 2, 3, 4, 5]
 * const idx2 = lensIndex(2)
 * const doubled = idx2.set(idx2.get(numbers) * 2)(numbers)
 * // [1, 2, 6, 4, 5]
 *
 * // Safe chaining of updates
 * const arr2 = [10, 20, 30]
 * const l0 = lensIndex(0)
 * const l1 = lensIndex(1)
 * const l2 = lensIndex(2)
 *
 * const updated = l2.set(300)(l1.set(200)(l0.set(100)(arr2)))
 * // [100, 200, 300]
 * ```
 * @property Negative index support - negative indices count from array end
 * @property Safe access - returns undefined for out-of-bounds indices
 * @property Array extension - setting beyond bounds extends array with undefined
 */
const lensIndex = <T>(
	index: number,
): Lens<Array<T>, T> => {
	return lens<Array<T>, T>(
		// Getter: safely access array at index
		(arr) => {
			// Handle negative indices
			const actualIndex = index < 0 ? arr.length + index : index

			return arr[actualIndex]
		},
	)(
		// Setter: immutably update array at index
		(value) => (arr) => {
			// Handle negative indices
			const actualIndex = index < 0 ? arr.length + index : index

			// If index is out of bounds, extend array
			if (actualIndex < 0) {
				// Negative index beyond array start - return unchanged
				return arr
			}

			// Create a new array with the updated value
			const result = [...arr]

			// Extend array if necessary (fills with undefined)
			while (result.length <= actualIndex) {
				result.push(undefined as T)
			}

			result[actualIndex] = value
			return result
		},
	)
}

export default lensIndex
