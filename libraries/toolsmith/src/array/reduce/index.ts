import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import _reduceArray from "./_reduceArray/index.ts"
import _reduceToResult from "./_reduceToResult/index.ts"
import _reduceToValidation from "./_reduceToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Reduces array to a single value using a reducer function
export default function reduce<E, T, U>(fn: (accumulator: U, item: T) => U) {
	return function reduceWithFunction(initialValue: U) {
		//++ [OVERLOAD] Array reducer: takes array, returns reduced value
		function reduceWithFunctionAndInitialValue(array: ReadonlyArray<T>): U

		//++ [OVERLOAD] Result reducer: takes and returns Result monad (fail fast)
		function reduceWithFunctionAndInitialValue(
			array: Result<E, ReadonlyArray<T>>,
		): Result<E, U>

		//++ [OVERLOAD] Validation reducer: takes and returns Validation monad (accumulator)
		function reduceWithFunctionAndInitialValue(
			array: Validation<E, ReadonlyArray<T>>,
		): Validation<E, U>

		//++ Implementation of the full curried function
		function reduceWithFunctionAndInitialValue(
			array:
				| ReadonlyArray<T>
				| Result<E, ReadonlyArray<T>>
				| Validation<E, ReadonlyArray<T>>,
		): U | Result<E, U> | Validation<E, U> {
			// Happy path: plain array
			if (isArray<T>(array)) {
				return _reduceArray(fn)(initialValue)(array)
			}

			// Result path: fail-fast monadic reduction
			if (isOk<ReadonlyArray<T>>(array)) {
				return chainResults(_reduceToResult(fn)(initialValue))(array)
			}

			// Validation path: error accumulation monadic reduction
			if (isSuccess<ReadonlyArray<T>>(array)) {
				return chainValidations(_reduceToValidation(fn)(initialValue))(array)
			}

			// Fallback: pass through unchanged (handles error/failure states)
			return array
		}

		return reduceWithFunctionAndInitialValue
	}
}
