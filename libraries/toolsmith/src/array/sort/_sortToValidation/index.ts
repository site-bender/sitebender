import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import _sortArray from "../_sortArray/index.ts"

//++ Private helper: sorts Validation monad (error accumulation)
export default function _sortToValidation<T>(
	compareFn?: (a: T, b: T) => number,
) {
	return function _sortToValidationWithComparator(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<T>> {
		return success(_sortArray(compareFn)(array))
	}
}
