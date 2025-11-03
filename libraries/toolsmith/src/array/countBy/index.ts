import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import _countByArray from "./_countByArray/index.ts"
import _countByToResult from "./_countByToResult/index.ts"
import _countByToValidation from "./_countByToValidation/index.ts"

//++ Counts elements by grouping criteria
export default function countBy<T, K extends string | number | symbol>(
	fn: (element: T) => K,
) {
	// [OVERLOAD 1] Plain array path
	function countByWithFn(array: ReadonlyArray<T>): Record<K, number>

	// [OVERLOAD 2] Result monad path (fail-fast)
	function countByWithFn(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, Record<K, number>>

	// [OVERLOAD 3] Validation monad path (accumulate errors)
	function countByWithFn(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, Record<K, number>>

	// Implementation with type dispatch
	function countByWithFn(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| Record<K, number>
		| Result<ValidationError, Record<K, number>>
		| Validation<ValidationError, Record<K, number>> {
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
