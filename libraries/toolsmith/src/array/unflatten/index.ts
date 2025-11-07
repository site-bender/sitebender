import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _unflattenArray from "./_unflattenArray/index.ts"
import _unflattenToResult from "./_unflattenToResult/index.ts"
import _unflattenToValidation from "./_unflattenToValidation/index.ts"

//++ Reconstructs nested arrays from flat structure using depth markers
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function unflatten(
	depths: ReadonlyArray<number>,
) {
	//++ [OVERLOAD] Plain array path: takes array, returns nested array
	function unflattenWithDepths<T>(
		array: ReadonlyArray<T>,
	): Array<T | Array<unknown>>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function unflattenWithDepths<T>(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, Array<T | Array<unknown>>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function unflattenWithDepths<T>(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, Array<T | Array<unknown>>>

	//++ Implementation with type dispatch
	function unflattenWithDepths<T>(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| Array<T | Array<unknown>>
		| Result<E, Array<T | Array<unknown>>>
		| Validation<E, Array<T | Array<unknown>>> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _unflattenArray<T>(depths)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_unflattenToResult(depths))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_unflattenToValidation(depths))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return unflattenWithDepths
}
