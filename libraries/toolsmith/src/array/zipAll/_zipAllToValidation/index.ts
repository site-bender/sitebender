import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _zipAllArray from "../_zipAllArray/index.ts"

//++ Private helper: Validation monad path for zipAll
//++ Transforms successful Validation, passes through failures unchanged
export default function _zipAllToValidation<E, T, U>(
	array2: ReadonlyArray<U>,
) {
	return function zipAllWithSecondArrayToValidation(
		array1: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<[T | undefined, U | undefined]>> {
		const result = _zipAllArray<T>(array2)(array1)
		return success(result)
	}
}
