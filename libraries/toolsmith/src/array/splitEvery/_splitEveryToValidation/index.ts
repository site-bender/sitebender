import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _splitEveryArray from "../_splitEveryArray/index.ts"

//++ Private helper: splits array and wraps result in Validation monad
export default function _splitEveryToValidation<E, T>(chunkSize: number) {
	return function _splitEveryToValidationWithSize(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<ReadonlyArray<T>>> {
		const chunks = _splitEveryArray<T>(chunkSize)(array)
		return success<ReadonlyArray<ReadonlyArray<T>>>(chunks)
	}
}
