import type { Validation } from "../../../types/fp/validation/index.ts"

import _partitionByArray from "../_partitionByArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _partitionByArray for Validation monad path
export default function _partitionByToValidation<E, T>(
	predicate: (value: T) => unknown,
) {
	return function _partitionByToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<ReadonlyArray<T>>> {
		return success(_partitionByArray<T>(predicate)(array))
	}
}
