import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _sortWithArray from "./_sortWithArray/index.ts"
import _sortWithToResult from "./_sortWithToResult/index.ts"
import _sortWithToValidation from "./_sortWithToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Sorts using multiple comparators
export default function sortWith<T>(
	comparators: ReadonlyArray<(a: T, b: T) => number>,
) {
	//++ [OVERLOAD] Array sorter: takes array, returns sorted array
	function sortWithComparators(array: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result sorter: takes and returns Result monad (fail fast)
	function sortWithComparators(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation sorter: takes and returns Validation monad (accumulator)
	function sortWithComparators(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<T>>

	//++ Implementation of the full curried function
	function sortWithComparators(
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
			return _sortWithArray(comparators)(array)
		}

		// Result path: fail-fast monadic sorting
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_sortWithToResult(comparators))(array)
		}

		// Validation path: error accumulation monadic sorting
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_sortWithToValidation(comparators))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return sortWithComparators
}
