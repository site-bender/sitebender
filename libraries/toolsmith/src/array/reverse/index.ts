import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _reverseArray from "./_reverseArray/index.ts"
import _reverseToResult from "./_reverseToResult/index.ts"
import _reverseToValidation from "./_reverseToValidation/index.ts"

//++ Reverses array order
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function reverse<E, T>(
	array:
		| ReadonlyArray<T>
		| Result<E, ReadonlyArray<T>>
		| Validation<E, ReadonlyArray<T>>,
):
	| Array<T>
	| Result<E, Array<T>>
	| Validation<E, Array<T>> {
	// Happy path: plain array (most common, zero overhead)
	if (isArray<T>(array)) {
		return _reverseArray<T>(array)
	}

	// Result path: fail-fast monadic transformation
	if (isOk<ReadonlyArray<T>>(array)) {
		return chainResults(_reverseToResult<T>)(array)
	}

	// Validation path: error accumulation monadic transformation
	if (isSuccess<ReadonlyArray<T>>(array)) {
		return chainValidations(_reverseToValidation<T>)(array)
	}

	// Fallback: pass through unchanged (error/failure states)
	return array
}
