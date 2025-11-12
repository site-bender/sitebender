//++ Private helper: creates sliding windows of consecutive elements
import not from "../../../logic/not/index.ts"
import isInteger from "../../../predicates/isInteger/index.ts"
import isEmpty from "../../isEmpty/index.ts"

export default function _apertureArray<T>(width: number) {
	return function _apertureArrayWithWidth(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>> {
		//++ [EXCEPTION] Using <= and || operators for performance in Toolsmith internals
		if (width <= 0 || not(isInteger(width))) {
			return []
		}

		//++ [EXCEPTION] Using > operator and .length property for performance in Toolsmith internals
		if (width > array.length) {
			return []
		}

		if (isEmpty(array)) {
			return []
		}

		//++ [EXCEPTION] Using .length property and arithmetic operators for performance in Toolsmith internals
		const windowCount = array.length - width + 1

		//++ [EXCEPTION] Using Array.from with map function instead of for loop for functional approach
		//++ while maintaining performance. Creates immutable windows without mutations.
		return Array.from({ length: windowCount }, function createWindow(
			_,
			index,
		) {
			//++ [EXCEPTION] Using .slice() method and arithmetic for performance in Toolsmith internals
			return array.slice(index, index + width)
		})
	}
}
