import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import _zipObjArray from "./_zipObjArray/index.ts"
import _zipObjToResult from "./_zipObjToResult/index.ts"
import _zipObjToValidation from "./_zipObjToValidation/index.ts"

//++ Creates object from keys and values arrays
//++ Three-path pattern: plain array, Result monad (fail-fast), or Validation monad (accumulate)
export default function zipObj<T>(
	keys: ReadonlyArray<string | number>,
) {
	function zipObjWithKeys(
		values: ReadonlyArray<T>,
	): Record<string | number, T | undefined>

	function zipObjWithKeys(
		values: Result<E, ReadonlyArray<T>>,
	): Result<E, Record<string | number, T | undefined>>

	function zipObjWithKeys(
		values: Validation<E, ReadonlyArray<T>>,
	): Validation<E, Record<string | number, T | undefined>>

	function zipObjWithKeys(
		values:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	):
		| Record<string | number, T | undefined>
		| Result<E, Record<string | number, T | undefined>>
		| Validation<E, Record<string | number, T | undefined>> {
		// Happy path: plain array (most common, zero overhead)
		if (isArray<T>(values)) {
			return _zipObjArray(keys)(values)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<ReadonlyArray<T>>(values)) {
			return chainResults(_zipObjToResult(keys))(values)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<ReadonlyArray<T>>(values)) {
			return chainValidations(_zipObjToValidation(keys))(values)
		}

		// Fallback: pass through unchanged (error/failure states)
		return values
	}

	return zipObjWithKeys
}
