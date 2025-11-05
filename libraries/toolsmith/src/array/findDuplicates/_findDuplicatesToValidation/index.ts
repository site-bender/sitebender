import type { Validation, ValidationError } from "../../../types/fp/index.ts"

import _findDuplicatesArray from "../_findDuplicatesArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _findDuplicatesArray for Validation monad path
export default function _findDuplicatesToValidation<T>(
	array: ReadonlyArray<T>,
): Validation<ValidationError, ReadonlyArray<T>> {
	return success(_findDuplicatesArray(array))
}
