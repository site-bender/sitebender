import type { Result, ValidationError } from "../../types/fp/index.ts"
import type { Validation } from "../../types/fp/index.ts"

import _dropRepeatsArray from "./_dropRepeatsArray/index.ts"
import _dropRepeatsToResult from "./_dropRepeatsToResult/index.ts"
import _dropRepeatsToValidation from "./_dropRepeatsToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Removes consecutive duplicate elements using SameValue equality
//++ [1, 1, 2, 3, 3, 3, 4] -> [1, 2, 3, 4]
//++ [OVERLOAD] Plain array path: takes array, returns array
function dropRepeats<T>(array: ReadonlyArray<T>): ReadonlyArray<T>

//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
function dropRepeats<T>(
	array: Result<ValidationError, ReadonlyArray<T>>,
): Result<ValidationError, ReadonlyArray<T>>

//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
function dropRepeats<T>(
	array: Validation<ValidationError, ReadonlyArray<T>>,
): Validation<ValidationError, ReadonlyArray<T>>

//++ Implementation with type dispatch
function dropRepeats<T>(
	array:
		| ReadonlyArray<T>
		| Result<ValidationError, ReadonlyArray<T>>
		| Validation<ValidationError, ReadonlyArray<T>>,
):
	| ReadonlyArray<T>
	| Result<ValidationError, ReadonlyArray<T>>
	| Validation<ValidationError, ReadonlyArray<T>> {
	// Happy path: plain array (most common, zero overhead)
	if (isArray<T>(array)) {
		return _dropRepeatsArray(array)
	}

	// Result path: fail-fast monadic transformation
	if (isOk<ReadonlyArray<T>>(array)) {
		return chainResults(_dropRepeatsToResult)(array)
	}

	// Validation path: error accumulation monadic transformation
	if (isSuccess<ReadonlyArray<T>>(array)) {
		return chainValidations(_dropRepeatsToValidation)(array)
	}

	// Fallback: pass through unchanged (error/failure states)
	return array
}

export default dropRepeats
