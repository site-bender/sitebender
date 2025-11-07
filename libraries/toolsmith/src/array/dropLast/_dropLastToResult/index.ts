import type { Result, ValidationError } from "../../../types/fp/index.ts"
import _dropLastArray from "../_dropLastArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Monadic wrapper for Result path
//++ Takes plain array, returns Result-wrapped array
export default function _dropLastToResult<T>(n: number) {
	return function _dropLastToResultWithN(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_dropLastArray(n)(array))
	}
}
