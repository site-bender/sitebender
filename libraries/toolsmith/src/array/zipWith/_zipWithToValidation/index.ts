import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _zipWithArray from "../_zipWithArray/index.ts"

//++ Private helper: Validation monad path for zipWith
//++ Transforms successful Validation, passes through failures unchanged
export default function _zipWithToValidation<E, T, U, V>(
	fn: (a: T) => (b: U) => V,
) {
	return function zipWithWithFunctionToValidation(
		array1: ReadonlyArray<T>,
	) {
		return function zipWithWithFirstArrayToValidation(
			array2: ReadonlyArray<U>,
		): Validation<E, ReadonlyArray<V>> {
			const result = _zipWithArray<T, U, V>(fn)(array1)(array2)
			return success(result)
		}
	}
}
