import type { Validation } from "../../../types/fp/validation/index.ts"

import _findDuplicatesArray from "../_findDuplicatesArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _findDuplicatesArray for Validation monad path
export default function _findDuplicatesToValidation<E, T>(
	array: ReadonlyArray<T>,
): Validation<E, ReadonlyArray<T>> {
	return success(_findDuplicatesArray<T>(array))
}
