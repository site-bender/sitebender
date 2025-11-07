import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import _countByArray from "./_countByArray/index.ts"
import _countByToResult from "./_countByToResult/index.ts"
import _countByToValidation from "./_countByToValidation/index.ts"

//++ Counts elements by grouping criteria
export default function countBy<E, T, K extends string | number | symbol>(
	fn: (element: T) => K,
) {
	// [OVERLOAD 1] Plain array path
	function countByWithFn(array: ReadonlyArray<T>): Record<K, number>

	// [OVERLOAD 2] Result monad path (fail-fast)
	function countByWithFn(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, Record<K, number>>

	// [OVERLOAD 3] Validation monad path (accumulate errors)
	function countByWithFn(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, Record<K, number>>

	// Implementation with type dispatch
	function countByWithFn(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| Record<K, number>
		| Result<E, Record<K, number>>
		| Validation<E, Record<K, number>> {
		// Path 1: Plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _countByArray(fn)(array)
		}

		// Path 2: Result (fail-fast error handling)
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_countByToResult(fn))(array)
		}

		// Path 3: Validation (error accumulation)
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_countByToValidation(fn))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return countByWithFn
}
