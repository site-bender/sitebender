import type { Result, ValidationError } from "../../types/fp/index.ts"
import type { Validation } from "../../types/fp/index.ts"

import _findLastIndexArray from "./_findLastIndexArray/index.ts"
import _findLastIndexToResult from "./_findLastIndexToResult/index.ts"
import _findLastIndexToValidation from "./_findLastIndexToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Finds the index of the last element matching a predicate
//++ Returns null if no element matches (Toolsmith pattern for missing values)
export default function findLastIndex<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	//++ [OVERLOAD] Plain array path: takes array, returns number | null
	function findLastIndexWithPredicate(
		array: ReadonlyArray<T>,
	): number | null

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function findLastIndexWithPredicate(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, number | null>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function findLastIndexWithPredicate(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, number | null>

	//++ Implementation with type dispatch
	function findLastIndexWithPredicate(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| number
		| null
		| Result<ValidationError, number | null>
		| Validation<ValidationError, number | null> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _findLastIndexArray(predicate)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_findLastIndexToResult(predicate))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_findLastIndexToValidation(predicate))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return findLastIndexWithPredicate
}
