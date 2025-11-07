import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _concatToArray from "./_concatToArray/index.ts"
import _concatToToResult from "./_concatToToResult/index.ts"
import _concatToToValidation from "./_concatToToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Appends a fixed array to any array
export default function concatTo<E, T>(toAppend: ReadonlyArray<T>) {
	//++ [OVERLOAD] Array appender: takes array, returns array with toAppend at end
	function concatToWithAppend(baseArray: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result appender: takes and returns Result monad (fail fast)
	function concatToWithAppend(
		baseArray: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation appender: takes and returns Validation monad (accumulator)
	function concatToWithAppend(
		baseArray: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<T>>

	//++ Implementation of the full curried function
	function concatToWithAppend(
		baseArray:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| ReadonlyArray<T>
		| Result<E, ReadonlyArray<T>>
		| Validation<E, ReadonlyArray<T>> {
		// Happy path: plain array
		if (isArray<T>(baseArray)) {
			return _concatToArray(toAppend)(baseArray)
		}

		// Result path: fail-fast monadic appending
		if (isOk<ReadonlyArray<T>>(baseArray)) {
			return chainResults(_concatToToResult(toAppend))(baseArray)
		}

		// Validation path: error accumulation monadic appending
		if (isSuccess<ReadonlyArray<T>>(baseArray)) {
			return chainValidations(_concatToToValidation(toAppend))(baseArray)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return baseArray
	}

	return concatToWithAppend
}
