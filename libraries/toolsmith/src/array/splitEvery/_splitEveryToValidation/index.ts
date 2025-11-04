import type { Validation, ValidationError } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _splitEveryArray from "../_splitEveryArray/index.ts"

//++ Private helper: splits array and wraps result in Validation monad
export default function _splitEveryToValidation<T>(chunkSize: number) {
	return function _splitEveryToValidationWithSize(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
		const chunks = _splitEveryArray(chunkSize)(array)
		return success(chunks)
	}
}
