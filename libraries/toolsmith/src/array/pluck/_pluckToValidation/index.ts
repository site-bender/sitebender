import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _pluckArray from "../_pluckArray/index.ts"

//++ [PRIVATE] Plucks property and wraps in Validation monad (accumulator)
export default function _pluckToValidation<E, T, K extends keyof T>(
	key: K,
) {
	return function _pluckToValidationWithKey(
		array: ReadonlyArray<T>,
	): Validation<E, Array<T[K] | null>> {
		return success(_pluckArray<T>(key)(array))
	}
}
