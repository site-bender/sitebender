import pipe from "../../combinator/pipe/index.ts"
import isNullish from "../../predicates/isNullish/index.ts"
import insertAt from "../insertAt/index.ts"
import removeAt from "../removeAt/index.ts"

//++ Moves an element to a new position
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
