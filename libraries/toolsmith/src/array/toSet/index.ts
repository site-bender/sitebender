import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
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
		| Result<E, ReadonlyArray<T>>
		| Validation<E, ReadonlyArray<T>>,
):
	| Set<T>
	| Result<E, Set<T>>
	| Validation<E, Set<T>> {
	// Happy path: plain array (most common, zero overhead)
	if (isArray<T>(array)) {
		return _toSetArray<T>(array)
	}

	// Result path: fail-fast monadic transformation
	if (isOk<ReadonlyArray<T>>(array)) {
		return chainResults(_toSetToResult<T>)(array)
	}

	// Validation path: error accumulation monadic transformation
	if (isSuccess<ReadonlyArray<T>>(array)) {
		return chainValidations(_toSetToValidation<T>)(array)
	}

	// Fallback: pass through unchanged (error/failure states)
	return array
}
