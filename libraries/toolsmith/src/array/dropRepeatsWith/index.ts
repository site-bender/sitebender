import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import _dropRepeatsWithArray from "./_dropRepeatsWithArray/index.ts"
import _dropRepeatsWithToResult from "./_dropRepeatsWithToResult/index.ts"
import _dropRepeatsWithToValidation from "./_dropRepeatsWithToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Removes consecutive duplicate elements using custom equality function
//++ comparator(a, b) returns true if a and b are considered equal
export default function dropRepeatsWith<E, T>(
	comparator: (a: T, b: T) => boolean,
) {
	//++ [OVERLOAD] Plain array path: takes array, returns array
	function dropRepeatsWithComparator(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function dropRepeatsWithComparator(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function dropRepeatsWithComparator(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<T>>

	//++ Implementation with type dispatch
	function dropRepeatsWithComparator(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| ReadonlyArray<T>
		| Result<E, ReadonlyArray<T>>
		| Validation<E, ReadonlyArray<T>> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _dropRepeatsWithArray<T>(comparator)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_dropRepeatsWithToResult<T>(comparator))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_dropRepeatsWithToValidation<T>(comparator))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return dropRepeatsWithComparator
}
