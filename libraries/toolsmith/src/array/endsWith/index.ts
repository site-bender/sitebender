import is from "../../validation/is/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isEmpty from "../isEmpty/index.ts"
import length from "../length/index.ts"

//++ Checks if an array ends with a given suffix array
//++ NOTE: This is a plain function (single return path). Will be migrated to three-path pattern in future batch.
export default function endsWith<T>(
	suffix: ReadonlyArray<T> | null | undefined,
) {
	return function endsWithSuffix(
		array: ReadonlyArray<T> | null | undefined,
	): boolean {
		if (isArray(suffix) && isArray(array)) {
			if (isEmpty(suffix)) {
				return true
			}

			const arrayLen = length(array)
			const suffixLen = length(suffix)

			if (suffixLen <= arrayLen) {
				//++ [EXCEPTION] Using native subtraction for significant performance benefit in Toolsmith internals
				const startIndex = arrayLen - suffixLen

				//++ [EXCEPTION] Using native .every() for significant performance benefit in Toolsmith internals
				return suffix.every(function checkElement(value, i) {
					return is(value)(array[startIndex + i])
				})
			}
		}
		return false
	}
}
