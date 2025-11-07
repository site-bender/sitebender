import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

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
export default function findIndex<E, T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	//++ [OVERLOAD] Plain array path: takes array, returns number
	function findIndexWithPredicate(array: ReadonlyArray<T>): number

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function findIndexWithPredicate(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, number>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function findIndexWithPredicate(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, number>

	//++ Implementation with type dispatch
	function findIndexWithPredicate(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| number
		| Result<E, number>
		| Validation<E, number> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _findIndexArray<T>(predicate)(array)
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
