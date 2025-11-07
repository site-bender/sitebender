import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _concatArray from "./_concatArray/index.ts"
import _concatToResult from "./_concatToResult/index.ts"
import _concatToValidation from "./_concatToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Concatenates two arrays
export default function concat<E, T>(first: ReadonlyArray<T>) {
	//++ [OVERLOAD] Array concatenator: takes array, returns concatenated array
	function concatWithFirst(second: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result concatenator: takes and returns Result monad (fail fast)
	function concatWithFirst(
		second: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation concatenator: takes and returns Validation monad (accumulator)
	function concatWithFirst(
		second: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<T>>

	//++ Implementation of the full curried function
	function concatWithFirst(
		second:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| ReadonlyArray<T>
		| Result<E, ReadonlyArray<T>>
		| Validation<E, ReadonlyArray<T>> {
		// Happy path: plain array
		if (isArray<T>(second)) {
			return _concatArray(first)(second)
		}

		// Result path: fail-fast monadic concatenation
		if (isOk<ReadonlyArray<T>>(second)) {
			return chainResults(_concatToResult(first))(second)
		}

		// Validation path: error accumulation monadic concatenation
		if (isSuccess<ReadonlyArray<T>>(second)) {
			return chainValidations(_concatToValidation(first))(second)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return second
	}

	return concatWithFirst
}
