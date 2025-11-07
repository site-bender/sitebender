import type { Result, ValidationError } from "../../types/fp/index.ts"
import type { Validation } from "../../types/fp/index.ts"

import _findLastArray from "./_findLastArray/index.ts"
import _findLastToResult from "./_findLastToResult/index.ts"
import _findLastToValidation from "./_findLastToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Finds the last element matching a predicate
//++ Returns null if no element matches (Toolsmith pattern for missing values)
export default function findLast<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	//++ [OVERLOAD] Plain array path: takes array, returns T | null
	function findLastWithPredicate(array: ReadonlyArray<T>): T | null

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function findLastWithPredicate(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, T | null>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function findLastWithPredicate(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, T | null>

	//++ Implementation with type dispatch
	function findLastWithPredicate(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| T
		| null
		| Result<ValidationError, T | null>
		| Validation<ValidationError, T | null> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _findLastArray(predicate)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_findLastToResult(predicate))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_findLastToValidation(predicate))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return findLastWithPredicate
}
