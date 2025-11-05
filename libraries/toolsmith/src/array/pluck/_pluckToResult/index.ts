import type { Result, ValidationError } from "../../../types/fp/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _pluckArray from "../_pluckArray/index.ts"

//++ [PRIVATE] Plucks property and wraps in Result monad (fail-fast)
export default function _pluckToResult<T, K extends keyof T>(
	key: K,
) {
	return function _pluckToResultWithKey(
		array: ReadonlyArray<T>,
	): Result<ValidationError, Array<T[K] | null>> {
		return ok(_pluckArray(key)(array))
	}
}
