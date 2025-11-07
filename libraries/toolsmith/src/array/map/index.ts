import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _mapArray from "./_mapArray/index.ts"
import _mapToResult from "./_mapToResult/index.ts"
import _mapToValidation from "./_mapToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Transforms each array element using a function
export default function map<E, T, U>(f: (arg: T, index?: number) => U) {
	//++ [OVERLOAD] Array mapper: takes array, returns mapped array
	function mapWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U>

	//++ [OVERLOAD] Result mapper: takes and returns Result monad (fail fast)
	function mapWithFunction(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<U>>

	//++ [OVERLOAD] Validation mapper: takes and returns Validation monad (accumulator)
	function mapWithFunction(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<U>>

	//++ Implementation of the full curried function
	function mapWithFunction(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| ReadonlyArray<U>
		| Result<E, ReadonlyArray<U>>
		| Validation<E, ReadonlyArray<U>> {
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
