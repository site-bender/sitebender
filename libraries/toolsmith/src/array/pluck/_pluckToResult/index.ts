import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _pluckArray from "../_pluckArray/index.ts"

//++ [PRIVATE] Plucks property and wraps in Result monad (fail-fast)
export default function _pluckToResult<E, T, K extends keyof T>(
	key: K,
) {
	return function _pluckToResultWithKey(
		array: ReadonlyArray<T>,
	): Result<E, Array<T[K] | null>> {
		return ok(_pluckArray<T, K>(key)(array))
	}
}
