import type { Result, ValidationError } from "../../../types/fp/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _zipObjArray from "../_zipObjArray/index.ts"

//++ [PRIVATE] Creates object from keys and values arrays, returning Result monad
export default function _zipObjToResult<T>(
	keys: ReadonlyArray<string | number>,
) {
	return function _zipObjToResultWithKeys(
		values: ReadonlyArray<T>,
	): Result<ValidationError, Record<string | number, T | undefined>> {
		return ok(_zipObjArray(keys)(values))
	}
}
