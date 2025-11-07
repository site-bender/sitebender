import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _partitionArray from "./_partitionArray/index.ts"
import _partitionToResult from "./_partitionToResult/index.ts"
import _partitionToValidation from "./_partitionToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Splits array by predicate into two groups
export default function partition<E, T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	//++ [OVERLOAD] Array partitioner: takes array, returns tuple of [pass, fail] arrays
	function partitionWithPredicate(
		array: ReadonlyArray<T>,
	): [ReadonlyArray<T>, ReadonlyArray<T>]

	//++ [OVERLOAD] Result partitioner: takes and returns Result monad (fail fast)
	function partitionWithPredicate(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, [ReadonlyArray<T>, ReadonlyArray<T>]>

	//++ [OVERLOAD] Validation partitioner: takes and returns Validation monad (accumulator)
	function partitionWithPredicate(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, [ReadonlyArray<T>, ReadonlyArray<T>]>

	//++ Implementation of the full curried function
	function partitionWithPredicate(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| [ReadonlyArray<T>, ReadonlyArray<T>]
		| Result<E, [ReadonlyArray<T>, ReadonlyArray<T>]>
		| Validation<E, [ReadonlyArray<T>, ReadonlyArray<T>]> {
		// Happy path: plain array
		if (isArray<T>(array)) {
			return _partitionArray(predicate)(array)
		}

		// Result path: fail-fast monadic partition
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_partitionToResult(predicate))(array)
		}

		// Validation path: error accumulation monadic partition
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_partitionToValidation(predicate))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return partitionWithPredicate
}
