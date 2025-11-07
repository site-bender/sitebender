import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import _groupWithArray from "./_groupWithArray/index.ts"
import _groupWithToResult from "./_groupWithToResult/index.ts"
import _groupWithToValidation from "./_groupWithToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Groups consecutive elements by binary predicate
//++ predicate(previous, current) returns true to group together
//++ [1, 2, 2, 3, 3, 3] with (a, b) => a === b -> [[1], [2, 2], [3, 3, 3]]
export default function groupWith<E, T>(predicate: (a: T, b: T) => boolean) {
	//++ [OVERLOAD] Plain array path: takes array, returns array of arrays
	function groupWithPredicate(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function groupWithPredicate(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<ReadonlyArray<T>>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function groupWithPredicate(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<ReadonlyArray<T>>>

	//++ Implementation with type dispatch
	function groupWithPredicate(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| ReadonlyArray<ReadonlyArray<T>>
		| Result<E, ReadonlyArray<ReadonlyArray<T>>>
		| Validation<E, ReadonlyArray<ReadonlyArray<T>>> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _groupWithArray<T>(predicate)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_groupWithToResult(predicate))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_groupWithToValidation(predicate))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return groupWithPredicate
}
