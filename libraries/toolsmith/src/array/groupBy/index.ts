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
import _groupByArray from "./_groupByArray/index.ts"
import _groupByToResult from "./_groupByToResult/index.ts"
import _groupByToValidation from "./_groupByToValidation/index.ts"

//++ Groups elements by a key function into a Record
export default function groupBy<T, K extends string | number>(
	keyFn: (element: T) => K,
) {
	// [OVERLOAD 1] Plain array path
	function groupByWithKeyFn(
		array: ReadonlyArray<T>,
	): Record<string, ReadonlyArray<T>>

	// [OVERLOAD 2] Result monad path (fail-fast)
	function groupByWithKeyFn(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, Record<string, ReadonlyArray<T>>>

	// [OVERLOAD 3] Validation monad path (accumulate errors)
	function groupByWithKeyFn(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, Record<string, ReadonlyArray<T>>>

	// Implementation with type dispatch
	function groupByWithKeyFn(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| Record<string, ReadonlyArray<T>>
		| Result<ValidationError, Record<string, ReadonlyArray<T>>>
		| Validation<ValidationError, Record<string, ReadonlyArray<T>>> {
		// Path 1: Plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _groupByArray(keyFn)(array)
		}

		// Path 2: Result (fail-fast error handling)
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_groupByToResult(keyFn))(array)
		}

		// Path 3: Validation (error accumulation)
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_groupByToValidation(keyFn))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return groupByWithKeyFn
}
