import type { Result, ValidationError } from "../../types/fp/index.ts"
import type { Validation } from "../../types/fp/index.ts"

import _intersectionArray from "./_intersectionArray/index.ts"
import _intersectionToResult from "./_intersectionToResult/index.ts"
import _intersectionToValidation from "./_intersectionToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Set intersection: returns elements that exist in both arrays
export default function intersection<T>(array2: ReadonlyArray<T>) {
	//++ [OVERLOAD] Plain array path: takes array, returns array
	function intersectionWithArray2(array1: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function intersectionWithArray2(
		array1: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function intersectionWithArray2(
		array1: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<T>>

	//++ Implementation with type dispatch
	function intersectionWithArray2(
		array1:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| ReadonlyArray<T>
		| Result<ValidationError, ReadonlyArray<T>>
		| Validation<ValidationError, ReadonlyArray<T>> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array1)) {
			return _intersectionArray(array2)(array1)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array1)) {
			return chainResults(_intersectionToResult(array2))(array1)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array1)) {
			return chainValidations(_intersectionToValidation(array2))(array1)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array1
	}

	return intersectionWithArray2
}
