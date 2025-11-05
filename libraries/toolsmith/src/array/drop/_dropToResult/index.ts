import type { Result, ValidationError } from "../../../types/fp/index.ts"
import _dropArray from "../_dropArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Monadic wrapper for Result path
//++ Takes plain array, returns Result-wrapped array
export default function _dropToResult<T>(n: number) {
	return function _dropToResultWithN(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_dropArray(n)(array))
	}
}
