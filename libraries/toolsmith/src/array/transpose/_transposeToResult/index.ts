import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _transposeArray from "../_transposeArray/index.ts"

//++ [PRIVATE] Transposes array and wraps in Result monad (fail-fast)
export default function _transposeToResult<T>(
	matrix: ReadonlyArray<ReadonlyArray<T>>,
): Result<ValidationError, Array<Array<T | undefined>>> {
	return ok(transposeArray<T>(matrix))
}
