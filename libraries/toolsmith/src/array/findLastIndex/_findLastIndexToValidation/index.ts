import type { Validation } from "../../../types/fp/validation/index.ts"

import _findLastIndexArray from "../_findLastIndexArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _findLastIndexArray for Validation monad path
export default function _findLastIndexToValidation<E, T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _findLastIndexToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<E, number | null> {
		return success(_findLastIndexArray<T>(predicate)(array))
	}
}
