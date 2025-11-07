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
import _takeArray from "./_takeArray/index.ts"
import _takeToResult from "./_takeToResult/index.ts"
import _takeToValidation from "./_takeToValidation/index.ts"

//++ Takes the first n elements from an array
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function take<T>(n: number) {
	//++ [OVERLOAD] Plain array path: takes array, returns array
	function takeWithN(array: ReadonlyArray<T>): ReadonlyArray<T>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function takeWithN(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<T>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function takeWithN(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<T>>

	//++ Implementation with type dispatch
	function takeWithN(
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
			return _takeArray(n)(array)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_takeToResult(n))(array)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_takeToValidation(n))(array)
		}

		// Fallback: pass through unchanged (error/failure states)
		return array
	}

	return takeWithN
}
