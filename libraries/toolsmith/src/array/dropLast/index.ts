import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _dropLastArray from "./_dropLastArray/index.ts"
import _dropLastToResult from "./_dropLastToResult/index.ts"
import _dropLastToValidation from "./_dropLastToValidation/index.ts"

//++ Drops the last n elements from an array
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function dropLast<E, T>(n: number) {
	//++ [OVERLOAD] Plain array path: takes array, returns array
	function dropLastWithN(array: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function dropLastWithN(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function dropLastWithN(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<T>>

	//++ Implementation with type dispatch
	function dropLastWithN(
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
			return _dropLastArray<T>(n)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_dropLastToResult<T>(n))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_dropLastToValidation<T>(n))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return dropLastWithN
}
