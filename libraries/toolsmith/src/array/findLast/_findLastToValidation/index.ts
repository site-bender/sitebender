import type { Validation } from "../../../types/fp/validation/index.ts"

import _findLastArray from "../_findLastArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _findLastArray for Validation monad path
export default function _findLastToValidation<E, T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _findLastToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<E, T | null> {
		return success(_findLastArray<T>(predicate)(array))
	}
}
