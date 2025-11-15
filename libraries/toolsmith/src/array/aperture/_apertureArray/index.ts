import not from "../../../logic/not/index.ts"
import isInteger from "../../../predicates/isInteger/index.ts"
import _createWindow from "./_createWindow/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper: creates sliding windows of consecutive elements
 */
export default function _apertureArray<T>(width: number) {
	return function _apertureArrayWithWidth(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>> {
		if (width <= 0 || not(isInteger(width))) {
			return []
		}

		if (width > array.length) {
			return []
		}

		const windowCount = array.length - width + 1

		return Array.from({ length: windowCount }, _createWindow(width)(array))
	}
}
