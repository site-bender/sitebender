import type {
	Result,
	Validation,
	ValidationError,
} from "../../types/fp/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _rotateLeftArray from "./_rotateLeftArray/index.ts"
import _rotateLeftToResult from "./_rotateLeftToResult/index.ts"
import _rotateLeftToValidation from "./_rotateLeftToValidation/index.ts"

//++ Rotates elements left by n positions
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function rotateLeft<T>(
	positions: number,
) {
	//++ [OVERLOAD] Plain array path: takes array, returns rotated array
	function rotateLeftByPositions(
		array: ReadonlyArray<T>,
	): Array<T>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function rotateLeftByPositions(
		array: Result<
			ValidationError,
			ReadonlyArray<T>
		>,
	): Result<
		ValidationError,
		Array<T>
	>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function rotateLeftByPositions(
		array: Validation<
			ValidationError,
			ReadonlyArray<T>
		>,
	): Validation<
		ValidationError,
		Array<T>
	>

	//++ Implementation with type dispatch
	function rotateLeftByPositions(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| Array<T>
		| Result<ValidationError, Array<T>>
		| Validation<ValidationError, Array<T>> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _rotateLeftArray(positions)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_rotateLeftToResult(positions))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_rotateLeftToValidation(positions))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return rotateLeftByPositions
}
