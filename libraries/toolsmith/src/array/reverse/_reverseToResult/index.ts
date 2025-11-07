import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _reverseArray from "../_reverseArray/index.ts"

//++ [PRIVATE] Reverses array order, returning Result monad
export default function _reverseToResult<T>(
	array: ReadonlyArray<T>,
): Result<ValidationError, Array<T>> {
	return ok(reverseArray<T>(array))
}
