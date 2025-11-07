import type { Validation, ValidationError } from "../../../types/fp/index.ts"

import _groupWithArray from "../_groupWithArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _groupWithArray for Validation monad path
export default function _groupWithToValidation<T>(
	predicate: (a: T, b: T) => boolean,
) {
	return function _groupWithToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
		return success(_groupWithArray(predicate)(array))
	}
}
