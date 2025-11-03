import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import _takeWhileArray from "../_takeWhileArray/index.ts"

//++ Private helper: takes from start while predicate is true (Validation monad)
export default function _takeWhileToValidation<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _takeWhileToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<T>> {
		return success(_takeWhileArray(predicate)(array))
	}
}
