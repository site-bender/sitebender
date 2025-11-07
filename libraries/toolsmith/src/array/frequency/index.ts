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
import _frequencyArray from "./_frequencyArray/index.ts"
import _frequencyToResult from "./_frequencyToResult/index.ts"
import _frequencyToValidation from "./_frequencyToValidation/index.ts"

//++ Counts occurrences of each element
export default function frequency<T>() {
	// [OVERLOAD 1] Plain array path
	function frequencyWithoutParameter(
		array: ReadonlyArray<T>,
	): Record<string, number>

	// [OVERLOAD 2] Result monad path (fail-fast)
	function frequencyWithoutParameter(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, Record<string, number>>

	// [OVERLOAD 3] Validation monad path (accumulate errors)
	function frequencyWithoutParameter(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, Record<string, number>>

	// Implementation with type dispatch
	function frequencyWithoutParameter(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| Record<string, number>
		| Result<ValidationError, Record<string, number>>
		| Validation<ValidationError, Record<string, number>> {
		// Path 1: Plain array (most common, zero overhead)
		if (isArray<T>(array)) {
			return _frequencyArray(array)
		}

		// Path 2: Result (fail-fast error handling)
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_frequencyToResult)(array)
		}

		// Path 3: Validation (error accumulation)
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_frequencyToValidation)(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return frequencyWithoutParameter
}
