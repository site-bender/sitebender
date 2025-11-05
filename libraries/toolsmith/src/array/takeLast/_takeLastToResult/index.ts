import type { Result, ValidationError } from "../../../types/fp/index.ts"
import _takeLastArray from "../_takeLastArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Monadic wrapper for Result path
//++ Takes plain array, returns Result-wrapped array
export default function _takeLastToResult<T>(n: number) {
	return function _takeLastToResultWithN(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_takeLastArray(n)(array))
	}
}
