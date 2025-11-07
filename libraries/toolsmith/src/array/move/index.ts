import type { Result, Validation } from "../../types/fp/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _moveArray from "./_moveArray/index.ts"
import _moveToResult from "./_moveToResult/index.ts"
import _moveToValidation from "./_moveToValidation/index.ts"

//++ Moves an element from one position to another
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function move<E, T>(
	fromIndex: number,
) {
	return function moveFrom(
		toIndex: number,
	) {
		//++ [OVERLOAD] Plain array path: takes array, returns array with moved element
		function moveInArray(
			array: ReadonlyArray<T>,
		): Array<T>

		//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
		function moveInArray(
			array: Result<E, ReadonlyArray<T>>,
		): Result<E, Array<T>>

		//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
		function moveInArray(
			array: Validation<E, ReadonlyArray<T>>,
		): Validation<E, Array<T>>

		//++ Implementation with type dispatch
		function moveInArray<E>(
			array:
				| ReadonlyArray<T>
				| Result<E, ReadonlyArray<T>>
				| Validation<E, ReadonlyArray<T>>,
		):
			| Array<T>
			| Result<E, Array<T>>
			| Validation<E, Array<T>> {
			// Happy path: plain array (most common, zero overhead)
			if (isArray<T>(array)) {
				return _moveArray(fromIndex)(toIndex)(array)
			}

			// Result path: fail-fast monadic transformation
			if (isOk<ReadonlyArray<T>>(array)) {
				return chainResults(_moveToResult(fromIndex)(toIndex))(array)
			}

			// Validation path: error accumulation monadic transformation
			if (isSuccess<ReadonlyArray<T>>(array)) {
				return chainValidations(_moveToValidation(fromIndex)(toIndex))(array)
			}

			// Fallback: pass through unchanged (error/failure states)
			return array
		}

		return moveInArray
	}
}
