import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _unflattenArray from "../_unflattenArray/index.ts"

//++ [PRIVATE] Unflattens array and wraps in Validation monad (accumulator)
export default function _unflattenToValidation(
	depths: ReadonlyArray<number>,
) {
	return function _unflattenToValidationWithDepths<E, T>(
		array: ReadonlyArray<T>,
	): Validation<E, Array<T | Array<unknown>>> {
		return success(_unflattenArray<T>(depths)(array))
	}
}
