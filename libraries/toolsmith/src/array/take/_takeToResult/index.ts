import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import _takeArray from "../_takeArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Monadic wrapper for Result path
//++ Takes plain array, returns Result-wrapped array
export default function _takeToResult<T>(n: number) {
	return function _takeToResultWithN(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(takeArray<T>(n)(array))
	}
}
