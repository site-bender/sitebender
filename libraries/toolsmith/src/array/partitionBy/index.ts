import type { Result, ValidationError } from "../../types/fp/index.ts"
import type { Validation } from "../../types/fp/index.ts"

import _partitionByArray from "./_partitionByArray/index.ts"
import _partitionByToResult from "./_partitionByToResult/index.ts"
import _partitionByToValidation from "./_partitionByToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Groups consecutive elements by predicate result (unary function)
//++ [1, 1, 2, 3, 3, 3] with x => x -> [[1, 1], [2], [3, 3, 3]]
//++ ['a', 'b', 'A', 'B'] with x => x.toLowerCase() -> [['a'], ['b', 'A', 'B']]
export default function partitionBy<T>(predicate: (value: T) => unknown) {
	//++ [OVERLOAD] Plain array path: takes array, returns array of arrays
	function partitionByPredicate(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function partitionByPredicate(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<ReadonlyArray<T>>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function partitionByPredicate(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<ReadonlyArray<T>>>

	//++ Implementation with type dispatch
	function partitionByPredicate(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| ReadonlyArray<ReadonlyArray<T>>
		| Result<ValidationError, ReadonlyArray<ReadonlyArray<T>>>
		| Validation<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _partitionByArray(predicate)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_partitionByToResult(predicate))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_partitionByToValidation(predicate))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return partitionByPredicate
}
