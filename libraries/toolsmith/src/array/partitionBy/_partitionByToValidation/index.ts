import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import _partitionByArray from "../_partitionByArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _partitionByArray for Validation monad path
export default function _partitionByToValidation<T>(
	predicate: (value: T) => unknown,
) {
	return function _partitionByToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
		return success(partitionByArray<T>(predicate)(array))
	}
}
