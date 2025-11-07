import type { Result, Validation } from "../../types/fp/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _rotateRightArray from "./_rotateRightArray/index.ts"
import _rotateRightToResult from "./_rotateRightToResult/index.ts"
import _rotateRightToValidation from "./_rotateRightToValidation/index.ts"

//++ Rotates elements right by n positions
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function rotateRight<E, T>(
	positions: number,
) {
	//++ [OVERLOAD] Plain array path: takes array, returns rotated array
	function rotateRightByPositions(
		array: ReadonlyArray<T>,
	): Array<T>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function rotateRightByPositions(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, Array<T>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function rotateRightByPositions(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, Array<T>>

	//++ Implementation with type dispatch
	function rotateRightByPositions(
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
			return _rotateRightArray(positions)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_rotateRightToResult(positions))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_rotateRightToValidation(positions))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return rotateRightByPositions
}
