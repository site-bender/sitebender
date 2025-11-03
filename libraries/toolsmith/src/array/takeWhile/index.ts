import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _takeWhileArray from "./_takeWhileArray/index.ts"
import _takeWhileToResult from "./_takeWhileToResult/index.ts"
import _takeWhileToValidation from "./_takeWhileToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Takes from start while predicate is true
export default function takeWhile<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	//++ [OVERLOAD] Array taker: takes array, returns array with leading elements taken
	function takeWhileWithPredicate(array: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result taker: takes and returns Result monad (fail fast)
	function takeWhileWithPredicate(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation taker: takes and returns Validation monad (accumulator)
	function takeWhileWithPredicate(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<T>>

	//++ Implementation of the full curried function
	function takeWhileWithPredicate(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| ReadonlyArray<T>
		| Result<ValidationError, ReadonlyArray<T>>
		| Validation<ValidationError, ReadonlyArray<T>> {
		// Happy path: plain array
		if (isArray<T>(array)) {
			return _takeWhileArray(predicate)(array)
		}

		// Result path: fail-fast monadic take
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_takeWhileToResult(predicate))(array)
		}

		// Validation path: error accumulation monadic take
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_takeWhileToValidation(predicate))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return takeWhileWithPredicate
}
