import is from "../../validation/is/index.ts"
import isNullish from "../../predicates/isNullish/index.ts"

//++ Checks if array starts with prefix
export default function startsWith<T>(
	prefix: ReadonlyArray<T> | null | undefined,
) {
	return function checkStartsWith(
		array: ReadonlyArray<T> | null | undefined,
	): boolean {
		if (isNullish(prefix) || isNullish(array)) {
			return false
		}

		if (prefix.length === 0) {
			return true
		}

		if (prefix.length > array.length) {
			return false
		}

		// Check each element of the prefix using every
		return prefix.every(function checkElement(value, index) {
			return is(value)(array[index])
		})
	}
}
