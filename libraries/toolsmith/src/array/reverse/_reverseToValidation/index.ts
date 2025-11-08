import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _reverseArray from "../_reverseArray/index.ts"

//++ [PRIVATE] Reverses array order, returning Validation monad
export default function _reverseToValidation<E, T>(
	array: ReadonlyArray<T>,
): Validation<E, Array<T>> {
	return success(_reverseArray<T>(array))
}
