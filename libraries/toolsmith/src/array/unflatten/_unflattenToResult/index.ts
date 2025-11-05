import type { Result, ValidationError } from "../../../types/fp/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _unflattenArray from "../_unflattenArray/index.ts"

//++ [PRIVATE] Unflattens array and wraps in Result monad (fail-fast)
export default function _unflattenToResult(
	depths: ReadonlyArray<number>,
) {
	return function _unflattenToResultWithDepths<T>(
		array: ReadonlyArray<T>,
	): Result<ValidationError, Array<T | Array<unknown>>> {
		return ok(_unflattenArray(depths)(array))
	}
}
