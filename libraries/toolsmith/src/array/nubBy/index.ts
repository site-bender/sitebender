import type { Result, ValidationError } from "../../types/fp/index.ts"
import type { Validation } from "../../types/fp/index.ts"

import _nubByArray from "./_nubByArray/index.ts"
import _nubByToResult from "./_nubByToResult/index.ts"
import _nubByToValidation from "./_nubByToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Removes duplicates using custom equality function
//++ [1, 2, 1, 3, 2] with (a, b) => a === b -> [1, 2, 3]
export default function nubBy<T>(equalityFn: (a: T, b: T) => boolean) {
	//++ [OVERLOAD] Plain array path: takes array, returns array
	function nubByWithEqualityFn(array: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function nubByWithEqualityFn(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function nubByWithEqualityFn(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<T>>

	//++ Implementation with type dispatch
	function nubByWithEqualityFn(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| ReadonlyArray<T>
		| Result<ValidationError, ReadonlyArray<T>>
		| Validation<ValidationError, ReadonlyArray<T>> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _nubByArray(equalityFn)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_nubByToResult(equalityFn))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_nubByToValidation(equalityFn))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return nubByWithEqualityFn
}
