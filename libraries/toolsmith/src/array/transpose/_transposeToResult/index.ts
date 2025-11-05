import type { Result, ValidationError } from "../../../types/fp/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _transposeArray from "../_transposeArray/index.ts"

//++ [PRIVATE] Transposes array and wraps in Result monad (fail-fast)
export default function _transposeToResult<T>(
	matrix: ReadonlyArray<ReadonlyArray<T>>,
): Result<ValidationError, Array<Array<T | undefined>>> {
	return ok(_transposeArray(matrix))
}
