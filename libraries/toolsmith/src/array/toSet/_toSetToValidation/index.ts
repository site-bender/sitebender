import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _toSetArray from "../_toSetArray/index.ts"

//++ [PRIVATE] Converts array to Set, returning Validation monad
export default function _toSetToValidation<E, T>(
	array: ReadonlyArray<T>,
): Validation<E, Set<T>> {
	return success(_toSetArray<T>(array))
}
