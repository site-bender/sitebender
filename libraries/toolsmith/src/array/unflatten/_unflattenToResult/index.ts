import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _unflattenArray from "../_unflattenArray/index.ts"

//++ [PRIVATE] Unflattens array and wraps in Result monad (fail-fast)
export default function _unflattenToResult(
	depths: ReadonlyArray<number>,
) {
	return function _unflattenToResultWithDepths<E, T>(
		array: ReadonlyArray<T>,
	): Result<E, Array<T | Array<unknown>>> {
		return ok(_unflattenArray<T>(depths)(array))
	}
}
