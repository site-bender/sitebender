import type { Result } from "../../types/fp/result/index.ts"
import type { Validation, ValidationError } from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _mapArray from "./_mapArray/index.ts"
import _mapToResult from "./_mapToResult/index.ts"
import _mapToValidation from "./_mapToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Transforms each array element using a function
export default function map<T, U>(f: (arg: T, index?: number) => U) {
	//++ [OVERLOAD] Array mapper: takes array, returns mapped array
	function mapWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U>

	//++ [OVERLOAD] Result mapper: takes and returns Result monad (fail fast)
	function mapWithFunction(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<U>>

	//++ [OVERLOAD] Validation mapper: takes and returns Validation monad (accumulator)
	function mapWithFunction(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<U>>

	//++ Implementation of the full curried function
	function mapWithFunction(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| ReadonlyArray<U>
		| Result<ValidationError, ReadonlyArray<U>>
		| Validation<ValidationError, ReadonlyArray<U>> {
		// Happy path: plain array
		if (isArray<T>(array)) {
			return _mapArray(f)(array)
		}

		// Result path: fail-fast monadic mapping
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_mapToResult(f))(array)
		}

		// Validation path: error accumulation monadic mapping
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_mapToValidation(f))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return mapWithFunction
}
