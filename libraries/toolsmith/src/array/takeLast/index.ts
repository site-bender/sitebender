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
import _takeLastArray from "./_takeLastArray/index.ts"
import _takeLastToResult from "./_takeLastToResult/index.ts"
import _takeLastToValidation from "./_takeLastToValidation/index.ts"

//++ Takes the last n elements from an array
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function takeLast<T>(n: number) {
	//++ [OVERLOAD] Plain array path: takes array, returns array
	function takeLastWithN(array: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function takeLastWithN(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function takeLastWithN(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<T>>

	//++ Implementation with type dispatch
	function takeLastWithN(
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
			return _takeLastArray(n)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_takeLastToResult(n))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_takeLastToValidation(n))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return takeLastWithN
}
