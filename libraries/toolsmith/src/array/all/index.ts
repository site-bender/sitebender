import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _allArray from "./_allArray/index.ts"
import _allToResult from "./_allToResult/index.ts"
import _allToValidation from "./_allToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Checks if all array elements satisfy predicate
 */
export default function all<E, T>(
	predicate: (item: T, index: number) => boolean,
) {
	//++ [OVERLOAD] Plain array: takes array, returns boolean
	function allWithPredicate(array: ReadonlyArray<T>): boolean

	//++ [OVERLOAD] Result: takes and returns Result monad (fail fast)
	function allWithPredicate(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, boolean>

	//++ [OVERLOAD] Validation: takes and returns Validation monad (accumulator)
	function allWithPredicate(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, boolean>

	//++ Implementation of the full curried function
	function allWithPredicate(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	): boolean | Result<E, boolean> | Validation<E, boolean> {
		// Happy path: plain array
		if (isArray<T>(array)) {
			return _allArray(predicate)(array)
		}

		// Result path: fail-fast monadic checking
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_allToResult<E, T>(predicate))(array)
		}

		// Validation path: error accumulation monadic checking
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_allToValidation<E, T>(predicate))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return allWithPredicate
}
