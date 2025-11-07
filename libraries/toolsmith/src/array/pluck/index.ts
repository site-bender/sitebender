import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _pluckArray from "./_pluckArray/index.ts"
import _pluckToResult from "./_pluckToResult/index.ts"
import _pluckToValidation from "./_pluckToValidation/index.ts"

//++ Extracts property values from objects in array
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function pluck<E, T, K extends keyof T>(
	key: K,
) {
	//++ [OVERLOAD] Plain array path: takes array, returns array of property values
	function pluckWithKey(
		array: ReadonlyArray<T>,
	): Array<T[K] | null>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function pluckWithKey(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, Array<T[K] | null>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function pluckWithKey(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, Array<T[K] | null>>

	//++ Implementation with type dispatch
	function pluckWithKey(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| Array<T[K] | null>
		| Result<E, Array<T[K] | null>>
		| Validation<E, Array<T[K] | null>> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _pluckArray<T>(key)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_pluckToResult(key))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_pluckToValidation(key))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return pluckWithKey
}
