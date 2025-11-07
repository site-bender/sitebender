import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import _dropWhileArray from "../_dropWhileArray/index.ts"

//++ Private helper: drops leading elements while predicate is true (Validation monad)
export default function _dropWhileToValidation<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _dropWhileToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<T>> {
		return success(_dropWhileArray(predicate)(array))
	}
}
