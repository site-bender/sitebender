import pipe from "../../functions/pipe/index.ts"
import insertAt from "../insertAt/index.ts"
import removeAt from "../removeAt/index.ts"

/**
 * Moves an item from one index to another in an array
 * 
 * @param i - Source index (where to move item from)
 * @returns Function that takes target index and returns function that moves item in array
 * @example
 * ```typescript
 * move(0)(2)([1, 2, 3, 4]) // [2, 3, 1, 4]
 * move(2)(0)([1, 2, 3, 4]) // [3, 1, 2, 4]
 * move(10)(0)([1, 2, 3]) // [1, 2, 3] (invalid index, returns original)
 * ```
 */
const move = <T>(i: number) => (j: number) => (arr: Array<T>): Array<T> => {
	if (i >= 0 && i < arr.length && j >= 0 && j < arr.length) {
		const toMove = arr[i]

		return pipe([removeAt(i), insertAt(j)(toMove)])(arr)
	}

	return arr
}

export default move
