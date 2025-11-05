import type { Result, ValidationError } from "../../types/fp/index.ts"
import type { Validation } from "../../types/fp/index.ts"

import _findIndexArray from "./_findIndexArray/index.ts"
import _findIndexToResult from "./_findIndexToResult/index.ts"
import _findIndexToValidation from "./_findIndexToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Finds the index of the first element matching a predicate
//++ Returns -1 if no element matches (following native findIndex behavior)
export default function findIndex<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	//++ [OVERLOAD] Plain array path: takes array, returns number
	function findIndexWithPredicate(array: ReadonlyArray<T>): number

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function findIndexWithPredicate(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, number>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function findIndexWithPredicate(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, number>

	//++ Implementation with type dispatch
	function findIndexWithPredicate(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| number
		| Result<ValidationError, number>
		| Validation<ValidationError, number> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _findIndexArray(predicate)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_findIndexToResult(predicate))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_findIndexToValidation(predicate))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return findIndexWithPredicate
}
