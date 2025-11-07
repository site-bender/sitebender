import type { Validation, ValidationError } from "../../../types/fp/index.ts"

import _findLastIndexArray from "../_findLastIndexArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _findLastIndexArray for Validation monad path
export default function _findLastIndexToValidation<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _findLastIndexToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, number | null> {
		return success(_findLastIndexArray(predicate)(array))
	}
}
