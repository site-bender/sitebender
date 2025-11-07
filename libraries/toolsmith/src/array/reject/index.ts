import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _rejectArray from "./_rejectArray/index.ts"
import _rejectToResult from "./_rejectToResult/index.ts"
import _rejectToValidation from "./_rejectToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Removes elements that satisfy predicate
export default function reject<E, T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	//++ [OVERLOAD] Array rejecter: takes array, returns array with rejected elements removed
	function rejectWithPredicate(array: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result rejecter: takes and returns Result monad (fail fast)
	function rejectWithPredicate(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation rejecter: takes and returns Validation monad (accumulator)
	function rejectWithPredicate(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<T>>

	//++ Implementation of the full curried function
	function rejectWithPredicate(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| ReadonlyArray<T>
		| Result<E, ReadonlyArray<T>>
		| Validation<E, ReadonlyArray<T>> {
		// Happy path: plain array
		if (isArray<T>(array)) {
			return _rejectArray(predicate)(array)
		}

		// Result path: fail-fast monadic rejection
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_rejectToResult(predicate))(array)
		}

		// Validation path: error accumulation monadic rejection
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_rejectToValidation(predicate))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return rejectWithPredicate
}
