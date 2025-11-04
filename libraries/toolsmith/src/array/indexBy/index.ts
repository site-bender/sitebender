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
import _indexByArray from "./_indexByArray/index.ts"
import _indexByToResult from "./_indexByToResult/index.ts"
import _indexByToValidation from "./_indexByToValidation/index.ts"

//++ Indexes elements by a key function
export default function indexBy<T, K extends string | number | symbol>(
	keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K,
) {
	// [OVERLOAD 1] Plain array path
	function indexByWithKeyFn(array: ReadonlyArray<T>): Record<K, T>

	// [OVERLOAD 2] Result monad path (fail-fast)
	function indexByWithKeyFn(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, Record<K, T>>

	// [OVERLOAD 3] Validation monad path (accumulate errors)
	function indexByWithKeyFn(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, Record<K, T>>

	// Implementation with type dispatch
	function indexByWithKeyFn(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| Record<K, T>
		| Result<ValidationError, Record<K, T>>
		| Validation<ValidationError, Record<K, T>> {
		// Path 1: Plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _indexByArray(keyFn)(array)
		}

		// Path 2: Result (fail-fast error handling)
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_indexByToResult(keyFn))(array)
		}

		// Path 3: Validation (error accumulation)
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_indexByToValidation(keyFn))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return indexByWithKeyFn
}
