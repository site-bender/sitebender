import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import _partitionArray from "../_partitionArray/index.ts"

//++ Private helper: splits array by predicate into two groups (Validation monad)
export default function _partitionToValidation<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _partitionToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, [ReadonlyArray<T>, ReadonlyArray<T>]> {
		return success(_partitionArray(predicate)(array))
	}
}
