import type { Result, ValidationError } from "../../../types/fp/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _reverseArray from "../_reverseArray/index.ts"

//++ [PRIVATE] Reverses array order, returning Result monad
export default function _reverseToResult<T>(
	array: ReadonlyArray<T>,
): Result<ValidationError, Array<T>> {
	return ok(_reverseArray(array))
}
