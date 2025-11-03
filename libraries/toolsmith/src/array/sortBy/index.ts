import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _sortByArray from "./_sortByArray/index.ts"
import _sortByToResult from "./_sortByToResult/index.ts"
import _sortByToValidation from "./_sortByToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Sorts by mapping function result
export default function sortBy<T, U>(fn: (value: T) => U) {
	//++ [OVERLOAD] Array sorter: takes array, returns sorted array
	function sortByWithFunction(array: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result sorter: takes and returns Result monad (fail fast)
	function sortByWithFunction(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation sorter: takes and returns Validation monad (accumulator)
	function sortByWithFunction(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<T>>

	//++ Implementation of the full curried function
	function sortByWithFunction(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| ReadonlyArray<T>
		| Result<ValidationError, ReadonlyArray<T>>
		| Validation<ValidationError, ReadonlyArray<T>> {
		// Happy path: plain array
		if (isArray<T>(array)) {
			return _sortByArray(fn)(array)
		}

		// Result path: fail-fast monadic sorting
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_sortByToResult(fn))(array)
		}

		// Validation path: error accumulation monadic sorting
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_sortByToValidation(fn))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return sortByWithFunction
}
