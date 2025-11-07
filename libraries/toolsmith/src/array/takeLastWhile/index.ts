import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _takeLastWhileArray from "./_takeLastWhileArray/index.ts"
import _takeLastWhileToResult from "./_takeLastWhileToResult/index.ts"
import _takeLastWhileToValidation from "./_takeLastWhileToValidation/index.ts"

//++ Takes elements from the end while predicate is true
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function takeLastWhile<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	//++ [OVERLOAD] Plain array path: takes array, returns array
	function takeLastWhileWithPredicate(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function takeLastWhileWithPredicate(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function takeLastWhileWithPredicate(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<T>>

	//++ Implementation with type dispatch
	function takeLastWhileWithPredicate(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| ReadonlyArray<T>
		| Result<E, ReadonlyArray<T>>
		| Validation<E, ReadonlyArray<T>> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _takeLastWhileArray<T>(predicate)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_takeLastWhileToResult(predicate))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_takeLastWhileToValidation(predicate))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return takeLastWhileWithPredicate
}
