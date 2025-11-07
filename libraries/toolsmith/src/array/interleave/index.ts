import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _interleaveArray from "./_interleaveArray/index.ts"
import _interleaveToResult from "./_interleaveToResult/index.ts"
import _interleaveToValidation from "./_interleaveToValidation/index.ts"

//++ Alternates elements from two arrays
export default function interleave<T, U>(array1: ReadonlyArray<T>) {
	function interleaveWithFirstArray(
		array2: ReadonlyArray<U>,
	): ReadonlyArray<T | U>

	function interleaveWithFirstArray(
		array2: Result<ValidationError, ReadonlyArray<U>>,
	): Result<ValidationError, ReadonlyArray<T | U>>

	function interleaveWithFirstArray(
		array2: Validation<ValidationError, ReadonlyArray<U>>,
	): Validation<ValidationError, ReadonlyArray<T | U>>

	function interleaveWithFirstArray(
		array2:
			| ReadonlyArray<U>
			| Result<ValidationError, ReadonlyArray<U>>
			| Validation<ValidationError, ReadonlyArray<U>>,
	) {
		if (isArray<U>(array2)) {
			return _interleaveArray(array1)(array2)
		}
		if (isOk<ReadonlyArray<U>>(array2)) {
			return chainResults(_interleaveToResult(array1))(array2)
		}
		if (isSuccess<ReadonlyArray<U>>(array2)) {
			return chainValidations(_interleaveToValidation(array1))(array2)
		}
		return array2
	}

	return interleaveWithFirstArray
}
