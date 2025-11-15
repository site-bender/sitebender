/*++
 + Gets an element at the specified index from an array (supports negative indices).
 + Implements the three-path pattern: plain array, Result monad, or Validation monad.
 */

import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _atArray from "./_atArray/index.ts"
import _atToResult from "./_atToResult/index.ts"
import _atToValidation from "./_atToValidation/index.ts"

export default function at<E, T>(index: number) {
	//++ [OVERLOAD] Plain array: gets element at index, returns element or null
	function atWithIndex(array: ReadonlyArray<T>): T | null

	//++ [OVERLOAD] Result monad: gets element from Result array (fail-fast)
	function atWithIndex(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, T | null>

	//++ [OVERLOAD] Validation monad: gets element from Validation array (error accumulation)
	function atWithIndex(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, T | null>

	//++ Implementation of the full curried function with runtime type routing
	function atWithIndex(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	): T | null | Result<E, T | null> | Validation<E, T | null> {
		// Happy path: plain array
		if (isArray<T>(array)) {
			return _atArray<T>(index)(array)
		}

		// Result path: fail-fast monadic access
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_atToResult<E, T>(index))(array)
		}

		// Validation path: error accumulation monadic access
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_atToValidation<E, T>(index))(array)
		}

		// Fallback: pass through unchanged (handles Error/Failure states)
		return array as
			| T
			| null
			| Result<E, T | null>
			| Validation<E, T | null>
	}

	return atWithIndex
}
