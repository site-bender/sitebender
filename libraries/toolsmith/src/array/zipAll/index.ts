import type {
	Result,
	Validation,
	ValidationError,
} from "../../types/fp/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _zipAllArray from "./_zipAllArray/index.ts"
import _zipAllToResult from "./_zipAllToResult/index.ts"
import _zipAllToValidation from "./_zipAllToValidation/index.ts"

//++ Zips arrays filling missing values with undefined
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function zipAll<T, U>(
	array2: ReadonlyArray<U>,
) {
	function zipAllWithSecondArray(
		array1: ReadonlyArray<T>,
	): ReadonlyArray<[T | undefined, U | undefined]>

	function zipAllWithSecondArray(
		array1: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<[T | undefined, U | undefined]>>

	function zipAllWithSecondArray(
		array1: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<[T | undefined, U | undefined]>>

	function zipAllWithSecondArray(
		array1:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| ReadonlyArray<[T | undefined, U | undefined]>
		| Result<ValidationError, ReadonlyArray<[T | undefined, U | undefined]>>
		| Validation<
			ValidationError,
			ReadonlyArray<[T | undefined, U | undefined]>
		> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array1)) {
			return _zipAllArray(array2)(array1)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array1)) {
			return chainResults(_zipAllToResult(array2))(array1)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array1)) {
			return chainValidations(_zipAllToValidation(array2))(array1)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array1
	}

	return zipAllWithSecondArray
}
