import type { Validation } from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import _sortArray from "../_sortArray/index.ts"

//++ Private helper: sorts Validation monad (error accumulation)
export default function _sortToValidation<E, T>(
	compareFn?: (a: T, b: T) => number,
) {
	return function _sortToValidationWithComparator(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<T>> {
		return success(_sortArray(compareFn)(array))
	}
}
