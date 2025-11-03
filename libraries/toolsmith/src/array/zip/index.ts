import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _zipArray from "./_zipArray/index.ts"
import _zipToResult from "./_zipToResult/index.ts"
import _zipToValidation from "./_zipToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Combines two arrays into pairs
export default function zip<T, U>(first: ReadonlyArray<T>) {
	//++ [OVERLOAD] Array zipper: takes array, returns array of pairs
	function zipWithFirst(second: ReadonlyArray<U>): ReadonlyArray<[T, U]>

	//++ [OVERLOAD] Result zipper: takes and returns Result monad (fail fast)
	function zipWithFirst(
		second: Result<ValidationError, ReadonlyArray<U>>,
	): Result<ValidationError, ReadonlyArray<[T, U]>>

	//++ [OVERLOAD] Validation zipper: takes and returns Validation monad (accumulator)
	function zipWithFirst(
		second: Validation<ValidationError, ReadonlyArray<U>>,
	): Validation<ValidationError, ReadonlyArray<[T, U]>>

	//++ Implementation of the full curried function
	function zipWithFirst(
		second:
			| ReadonlyArray<U>
			| Result<ValidationError, ReadonlyArray<U>>
			| Validation<ValidationError, ReadonlyArray<U>>,
	):
		| ReadonlyArray<[T, U]>
		| Result<ValidationError, ReadonlyArray<[T, U]>>
		| Validation<ValidationError, ReadonlyArray<[T, U]>> {
		// Happy path: plain array
		if (isArray<U>(second)) {
			return _zipArray(first)(second)
		}

		// Result path: fail-fast monadic zipping
		if (isOk<ReadonlyArray<U>>(second)) {
			return chainResults(_zipToResult(first))(second)
		}

		// Validation path: error accumulation monadic zipping
		if (isSuccess<ReadonlyArray<U>>(second)) {
			return chainValidations(_zipToValidation(first))(second)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return second
	}

	return zipWithFirst
}
