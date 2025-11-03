import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import _sortWithArray from "../_sortWithArray/index.ts"

//++ Private helper: sorts Validation monad using multiple comparators (error accumulation)
export default function _sortWithToValidation<T>(
	comparators: ReadonlyArray<(a: T, b: T) => number>,
) {
	return function _sortWithToValidationWithComparators(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<T>> {
		return success(_sortWithArray(comparators)(array))
	}
}
