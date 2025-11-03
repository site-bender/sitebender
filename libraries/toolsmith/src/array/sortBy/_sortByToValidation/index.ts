import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import _sortByArray from "../_sortByArray/index.ts"

//++ Private helper: sorts Validation monad by mapping function (error accumulation)
export default function _sortByToValidation<T, U>(fn: (value: T) => U) {
	return function _sortByToValidationWithFunction(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<T>> {
		return success(_sortByArray(fn)(array))
	}
}
