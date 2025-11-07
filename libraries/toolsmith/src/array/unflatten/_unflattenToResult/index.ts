import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _unflattenArray from "../_unflattenArray/index.ts"

//++ [PRIVATE] Unflattens array and wraps in Result monad (fail-fast)
export default function _unflattenToResult(
	depths: ReadonlyArray<number>,
) {
	return function _unflattenToResultWithDepths<T>(
		array: ReadonlyArray<T>,
	): Result<ValidationError, Array<T | Array<unknown>>> {
		return ok(unflattenArray<T>(depths)(array))
	}
}
