import type { Validation } from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import _rejectArray from "../_rejectArray/index.ts"

//++ Private helper: removes elements that satisfy predicate (Validation monad)
export default function _rejectToValidation<E, T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _rejectToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<T>> {
		return success(_rejectArray(predicate)(array))
	}
}
