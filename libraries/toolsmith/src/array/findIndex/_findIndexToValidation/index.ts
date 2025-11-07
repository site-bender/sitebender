import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import _findIndexArray from "../_findIndexArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _findIndexArray for Validation monad path
export default function _findIndexToValidation<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _findIndexToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, number> {
		return success(findIndexArray<T>(predicate)(array))
	}
}
