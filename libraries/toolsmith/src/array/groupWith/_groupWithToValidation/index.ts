import type { Validation } from "../../../types/fp/validation/index.ts"

import _groupWithArray from "../_groupWithArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _groupWithArray for Validation monad path
export default function _groupWithToValidation<E, T>(
	predicate: (a: T, b: T) => boolean,
) {
	return function _groupWithToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<ReadonlyArray<T>>> {
		return success(_groupWithArray<T>(predicate)(array))
	}
}
