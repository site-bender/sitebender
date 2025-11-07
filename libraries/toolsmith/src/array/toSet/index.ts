import type {
	Result,
	Validation,
	ValidationError,
} from "../../types/fp/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _toSetArray from "./_toSetArray/index.ts"
import _toSetToResult from "./_toSetToResult/index.ts"
import _toSetToValidation from "./_toSetToValidation/index.ts"

//++ Converts array to Set (removes duplicates)
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function toSet<T>(
	array:
		| ReadonlyArray<T>
		| Result<ValidationError, ReadonlyArray<T>>
		| Validation<ValidationError, ReadonlyArray<T>>,
):
	| Set<T>
	| Result<ValidationError, Set<T>>
	| Validation<ValidationError, Set<T>> {
	// Happy path: plain array (most common, zero overhead)
	if (isArray<T>(array)) {
		return _toSetArray(array)
	}

	// Result path: fail-fast monadic transformation
	if (isOk<ReadonlyArray<T>>(array)) {
		return chainResults(_toSetToResult)(array)
	}

	// Validation path: error accumulation monadic transformation
	if (isSuccess<ReadonlyArray<T>>(array)) {
		return chainValidations(_toSetToValidation)(array)
	}

	// Fallback: pass through unchanged (error/failure states)
	return array
}
