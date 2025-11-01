import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _flatMapArray from "./_flatMapArray/index.ts"
import _flatMapToResult from "./_flatMapToResult/index.ts"
import _flatMapToValidation from "./_flatMapToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Transforms each array element using a function that returns an array, then flattens the result
export default function flatMap<T, U>(
	f: (arg: T, index?: number) => ReadonlyArray<U>,
) {
	//++ [OVERLOAD] Array flatMapper: takes array, returns flatMapped array
	function flatMapWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U>

	//++ [OVERLOAD] Result flatMapper: takes and returns Result monad (fail fast)
	function flatMapWithFunction(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<U>>

	//++ [OVERLOAD] Validation flatMapper: takes and returns Validation monad (accumulator)
	function flatMapWithFunction(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<U>>

	//++ Implementation of the full curried function
	function flatMapWithFunction(
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
			return _flatMapArray(f)(array)
		}

		// Result path: fail-fast monadic flatMapping
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_flatMapToResult(f))(array)
		}

		// Validation path: error accumulation monadic flatMapping
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_flatMapToValidation(f))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return flatMapWithFunction
}
