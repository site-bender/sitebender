import isNullish from "../../validation/isNullish/index.ts"
import is from "../../validation/is/index.ts"

export default function endsWith<T>(
	suffix: ReadonlyArray<T> | null | undefined,
) {
	return function checkEndsWith(
		array: ReadonlyArray<T> | null | undefined,
	): boolean {
		if (isNullish(array)) {
			return false
		}

		if (isNullish(suffix)) {
			return false
		}

		if (suffix.length === 0) {
			return true
		}

		if (suffix.length > array.length) {
			return false
		}

		const startIndex = array.length - suffix.length

		return suffix.every(function checkElement(value, i) {
			return is(value)(array[startIndex + i])
		})
	}
}
