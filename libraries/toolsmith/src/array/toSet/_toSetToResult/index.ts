import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _toSetArray from "../_toSetArray/index.ts"

//++ [PRIVATE] Converts array to Set, returning Result monad
export default function _toSetToResult<E, T>(
	array: ReadonlyArray<T>,
): Result<E, Set<T>> {
	return ok(_toSetArray<T>(array))
}
