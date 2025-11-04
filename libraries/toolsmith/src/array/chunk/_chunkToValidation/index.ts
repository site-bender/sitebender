import type { Validation, ValidationError } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _chunkArray from "../_chunkArray/index.ts"

//++ Private helper: chunks array and wraps result in Validation monad
export default function _chunkToValidation<T>(size: number) {
	return function _chunkToValidationWithSize(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
		const chunked = _chunkArray<T>(size)(array)
		return success<ReadonlyArray<ReadonlyArray<T>>>(chunked)
	}
}
