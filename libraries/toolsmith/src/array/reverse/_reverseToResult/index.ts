import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _reverseArray from "../_reverseArray/index.ts"

//++ [PRIVATE] Reverses array order, returning Result monad
export default function _reverseToResult<E, T>(
	array: ReadonlyArray<T>,
): Result<E, Array<T>> {
	return ok(_reverseArray<T>(array))
}
