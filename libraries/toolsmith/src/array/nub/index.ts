import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import _nubArray from "./_nubArray/index.ts"
import _nubToResult from "./_nubToResult/index.ts"
import _nubToValidation from "./_nubToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Removes duplicate elements (alias for unique)
//++ [OVERLOAD] Plain array path: takes array, returns array
function nub<T>(array: ReadonlyArray<T>): ReadonlyArray<T>

//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
function nub<E, T>(
	array: Result<E, ReadonlyArray<T>>,
): Result<E, ReadonlyArray<T>>

//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
function nub<E, T>(
	array: Validation<E, ReadonlyArray<T>>,
): Validation<E, ReadonlyArray<T>>

//++ Implementation with type dispatch
function nub<E, T>(
	array:
		| ReadonlyArray<T>
		| Result<E, ReadonlyArray<T>>
		| Validation<E, ReadonlyArray<T>>,
):
	| ReadonlyArray<T>
	| Result<E, ReadonlyArray<T>>
	| Validation<E, ReadonlyArray<T>> {
	// Happy path: plain array (most common, zero overhead)
	if (isArray<T>(array)) {
		return _nubArray<T>(array)
	}

	// Result path: fail-fast monadic transformation
	if (isOk<ReadonlyArray<T>>(array)) {
		return chainResults(_nubToResult<T>)(array)
	}

	// Validation path: error accumulation monadic transformation
	if (isSuccess<ReadonlyArray<T>>(array)) {
		return chainValidations(_nubToValidation<T>)(array)
	}

	// Fallback: pass through unchanged (error/failure states)
	return array
}

export default nub
