import type { Validation, ValidationError } from "../../../types/fp/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _toSetArray from "../_toSetArray/index.ts"

//++ [PRIVATE] Converts array to Set, returning Validation monad
export default function _toSetToValidation<T>(
	array: ReadonlyArray<T>,
): Validation<ValidationError, Set<T>> {
	return success(_toSetArray(array))
}
