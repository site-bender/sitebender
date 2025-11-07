import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _dropArray from "./_dropArray/index.ts"
import _dropToResult from "./_dropToResult/index.ts"
import _dropToValidation from "./_dropToValidation/index.ts"

//++ Drops the first n elements from an array
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function drop<E, T>(n: number) {
	//++ [OVERLOAD] Plain array path: takes array, returns array
	function dropWithN(array: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function dropWithN(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function dropWithN(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<T>>

	//++ Implementation with type dispatch
	function dropWithN(
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
			return _dropArray<T>(n)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_dropToResult<T>(n))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_dropToValidation<T>(n))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return dropWithN
}
