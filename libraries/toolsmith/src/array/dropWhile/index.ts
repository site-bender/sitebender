import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _dropWhileArray from "./_dropWhileArray/index.ts"
import _dropWhileToResult from "./_dropWhileToResult/index.ts"
import _dropWhileToValidation from "./_dropWhileToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Drops leading elements while predicate is true
export default function dropWhile<E, T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	//++ [OVERLOAD] Array dropper: takes array, returns array with leading elements dropped
	function dropWhileWithPredicate(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T>

	//++ [OVERLOAD] Result dropper: takes and returns Result monad (fail fast)
	function dropWhileWithPredicate(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation dropper: takes and returns Validation monad (accumulator)
	function dropWhileWithPredicate(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<T>>

	//++ Implementation of the full curried function
	function dropWhileWithPredicate(
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
			return _dropWhileArray(predicate)(array)
		}

		// Result path: fail-fast monadic drop
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_dropWhileToResult(predicate))(array)
		}

		// Validation path: error accumulation monadic drop
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_dropWhileToValidation(predicate))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return dropWhileWithPredicate
}
