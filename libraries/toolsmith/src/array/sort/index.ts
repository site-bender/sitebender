import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _sortArray from "./_sortArray/index.ts"
import _sortToResult from "./_sortToResult/index.ts"
import _sortToValidation from "./_sortToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Sorts array with optional comparator
export default function sort<T>(compareFn?: (a: T, b: T) => number) {
	//++ [OVERLOAD] Array sorter: takes array, returns sorted array
	function sortWithComparator(array: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result sorter: takes and returns Result monad (fail fast)
	function sortWithComparator(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation sorter: takes and returns Validation monad (accumulator)
	function sortWithComparator(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<T>>

	//++ Implementation of the full curried function
	function sortWithComparator(
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
			return _sortArray(compareFn)(array)
		}

		// Result path: fail-fast monadic sorting
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_sortToResult(compareFn))(array)
		}

		// Validation path: error accumulation monadic sorting
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_sortToValidation(compareFn))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return sortWithComparator
}
