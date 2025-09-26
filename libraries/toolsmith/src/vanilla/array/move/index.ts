import pipe from "../../combinator/pipe/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
import insertAt from "../insertAt/index.ts"
import removeAt from "../removeAt/index.ts"

//++ move(from)(to)(array) — returns new array with element repositioned or original if invalid
export default function move<T>(from: number) {
	return function moveFromIndexTo(to: number) {
		return function moveInArray(
			array: ReadonlyArray<T> | null | undefined,
		): Array<T> {
			if (isNullish(array) || !Array.isArray(array)) {
				return []
			}

			if (from === to) {
				return array as Array<T>
			}

			if (from >= 0 && from < array.length && to >= 0 && to < array.length) {
				const item = array[from]
				return pipe([removeAt(from), insertAt(to)(item)])(array)
			}
			return array as Array<T>
		}
	}
}

//?? [EXAMPLE] `move(0)(2)([1, 2, 3, 4]) // [2, 3, 1, 4]`
//?? [EXAMPLE] `move(3)(0)(["a", "b", "c", "d"]) // ["d", "a", "b", "c"]`
//?? [EXAMPLE] `move(1)(1)([1, 2, 3]) // [1, 2, 3]`
//?? [EXAMPLE] `move(5)(2)([1, 2, 3]) // [1, 2, 3]`
//?? [EXAMPLE] `move(0)(1)(null) // []`
