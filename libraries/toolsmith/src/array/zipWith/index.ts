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
import _zipWithArray from "./_zipWithArray/index.ts"
import _zipWithToResult from "./_zipWithToResult/index.ts"
import _zipWithToValidation from "./_zipWithToValidation/index.ts"

//++ Combines arrays using a function
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function zipWith<T, U, V>(
	fn: (a: T) => (b: U) => V,
) {
	return function zipWithWithFunction(
		array1: ReadonlyArray<T>,
	) {
		function zipWithWithFirstArray(
			array2: ReadonlyArray<U>,
		): ReadonlyArray<V>

		function zipWithWithFirstArray(
			array2: Result<ValidationError, ReadonlyArray<U>>,
		): Result<ValidationError, ReadonlyArray<V>>

		function zipWithWithFirstArray(
			array2: Validation<ValidationError, ReadonlyArray<U>>,
		): Validation<ValidationError, ReadonlyArray<V>>

		function zipWithWithFirstArray(
			array2:
				| ReadonlyArray<U>
				| Result<ValidationError, ReadonlyArray<U>>
				| Validation<ValidationError, ReadonlyArray<U>>,
		):
			| ReadonlyArray<V>
			| Result<ValidationError, ReadonlyArray<V>>
			| Validation<ValidationError, ReadonlyArray<V>> {
			// Happy path: plain array (most common, zero overhead)
			if (isArray<U>(array2)) {
				return _zipWithArray(fn)(array1)(array2)
			}

			// Result path: fail-fast monadic transformation
			if (isOk<ReadonlyArray<U>>(array2)) {
				return chainResults(_zipWithToResult(fn)(array1))(array2)
			}

			// Validation path: error accumulation monadic transformation
			if (isSuccess<ReadonlyArray<U>>(array2)) {
				return chainValidations(_zipWithToValidation(fn)(array1))(array2)
			}

			// Fallback: pass through unchanged (error/failure states)
			return array2
		}

		return zipWithWithFirstArray
	}
}
