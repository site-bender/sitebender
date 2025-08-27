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
 * @pure
 * @immutable
 * @param index - The array index to focus on (negative counts from end)
 * @returns A lens focused on the specified array index
 * @example
 * ```typescript
 * // Basic array index access
 * const firstLens = lensIndex(0)
 * const arr = [1, 2, 3, 4, 5]
 * firstLens.get(arr)                      // 1
 * firstLens.set(10)(arr)                  // [10, 2, 3, 4, 5]
 *
 * // Negative indices (from end)
 * const lastItemLens = lensIndex(-1)
 * lastItemLens.get([1, 2, 3])            // 3
 * lastItemLens.set(30)([1, 2, 3])        // [1, 2, 30]
 *
 * // Out of bounds - get returns undefined
 * const tenthLens = lensIndex(10)
 * tenthLens.get([1, 2, 3])               // undefined
 *
 * // Out of bounds - set extends array
 * const fifthLens = lensIndex(5)
 * fifthLens.set(60)([1, 2, 3])
 * // [1, 2, 3, undefined, undefined, 60]
 *
 * // With array of objects
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 3, name: "Charlie" }
 * ]
 * const secondUserLens = lensIndex(1)
 * secondUserLens.get(users)              // { id: 2, name: "Bob" }
 * secondUserLens.set({ id: 2, name: "Robert" })(users)
 * // [{ id: 1, name: "Alice" }, { id: 2, name: "Robert" }, { id: 3, name: "Charlie" }]
 * ```
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
			const gap = actualIndex - result.length + 1
			if (gap > 0) {
				const extension = Array.from({ length: gap }, () => undefined as T)
				extension[extension.length - 1] = value
				return [...result, ...extension]
			}

			result[actualIndex] = value
			return result
		},
	)
}

export default lensIndex
