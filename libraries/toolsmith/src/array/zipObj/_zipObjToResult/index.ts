import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _zipObjArray from "../_zipObjArray/index.ts"

//++ [PRIVATE] Creates object from keys and values arrays, returning Result monad
export default function _zipObjToResult<E, T>(
	keys: ReadonlyArray<string | number>,
) {
	return function _zipObjToResultWithKeys(
		values: ReadonlyArray<T>,
	): Result<E, Record<string | number, T | undefined>> {
		return ok(_zipObjArray(keys)(values))
	}
}
