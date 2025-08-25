import pipe from "../../combinator/pipe/index.ts"
import insertAt from "../insertAt/index.ts"
import removeAt from "../removeAt/index.ts"

/**
 * Moves an element from one position to another in an array
 * 
 * Creates a new array with the element at the source index moved to
 * the target index. Other elements shift to accommodate. Returns
 * original array if either index is out of bounds.
 * 
 * @curried (from) => (to) => (array) => result
 * @param from - Source index (where to move element from)
 * @param to - Target index (where to move element to)
 * @param array - The array to operate on
 * @returns New array with element moved, or original if indices invalid
 * @example
 * ```typescript
 * move(0)(2)([1, 2, 3, 4]) // [2, 3, 1, 4]
 * move(2)(0)([1, 2, 3, 4]) // [3, 1, 2, 4]
 * move(1)(1)([1, 2, 3]) // [1, 2, 3] (no movement)
 * move(10)(0)([1, 2, 3]) // [1, 2, 3] (invalid index)
 * 
 * // Reorder list items
 * const moveToTop = move(3)(0)
 * moveToTop(["a", "b", "c", "d"]) // ["d", "a", "b", "c"]
 * ```
 */
const move = <T>(from: number) => (to: number) => (array: Array<T>): Array<T> => {
	if (from >= 0 && from < array.length && to >= 0 && to < array.length) {
		const item = array[from]
		return pipe([removeAt(from), insertAt(to)(item)])(array)
	}
	return array
}

export default move
