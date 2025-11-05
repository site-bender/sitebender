import type { Result, ValidationError } from "../../types/fp/index.ts"
import type { Validation } from "../../types/fp/index.ts"

import _unionArray from "./_unionArray/index.ts"
import _unionToResult from "./_unionToResult/index.ts"
import _unionToValidation from "./_unionToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Set union: returns unique elements from both arrays
export default function union<T>(array1: ReadonlyArray<T>) {
	//++ [OVERLOAD] Plain array path: takes array, returns array
	function unionWithArray1(array2: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function unionWithArray1(
		array2: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function unionWithArray1(
		array2: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<T>>

	//++ Implementation with type dispatch
	function unionWithArray1(
		array2:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| ReadonlyArray<T>
		| Result<ValidationError, ReadonlyArray<T>>
		| Validation<ValidationError, ReadonlyArray<T>> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array2)) {
			return _unionArray(array1)(array2)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array2)) {
			return chainResults(_unionToResult(array1))(array2)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array2)) {
			return chainValidations(_unionToValidation(array1))(array2)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array2
	}

	return unionWithArray1
}
