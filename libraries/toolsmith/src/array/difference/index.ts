import type { Result, ValidationError } from "../../types/fp/index.ts"
import type { Validation } from "../../types/fp/index.ts"

import _differenceArray from "./_differenceArray/index.ts"
import _differenceToResult from "./_differenceToResult/index.ts"
import _differenceToValidation from "./_differenceToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Set difference: returns elements in minuend that are not in subtrahend
export default function difference<T>(subtrahend: ReadonlyArray<T>) {
	//++ [OVERLOAD] Plain array path: takes array, returns array
	function differenceWithSubtrahend(
		minuend: ReadonlyArray<T>,
	): ReadonlyArray<T>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function differenceWithSubtrahend(
		minuend: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function differenceWithSubtrahend(
		minuend: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<T>>

	//++ Implementation with type dispatch
	function differenceWithSubtrahend(
		minuend:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| ReadonlyArray<T>
		| Result<ValidationError, ReadonlyArray<T>>
		| Validation<ValidationError, ReadonlyArray<T>> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(minuend)) {
			return _differenceArray(subtrahend)(minuend)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(minuend)) {
			return chainResults(_differenceToResult(subtrahend))(minuend)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(minuend)) {
			return chainValidations(_differenceToValidation(subtrahend))(minuend)
		}

		// Fallback: pass through unchanged (error/failure states)
		return minuend
	}

	return differenceWithSubtrahend
}
