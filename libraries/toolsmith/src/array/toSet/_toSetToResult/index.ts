import type { Result, ValidationError } from "../../../types/fp/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _toSetArray from "../_toSetArray/index.ts"

//++ [PRIVATE] Converts array to Set, returning Result monad
export default function _toSetToResult<T>(
	array: ReadonlyArray<T>,
): Result<ValidationError, Set<T>> {
	return ok(_toSetArray(array))
}
