import type { Result } from "../../../types/fp/result/index.ts"
import _takeLastArray from "../_takeLastArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Monadic wrapper for Result path
//++ Takes plain array, returns Result-wrapped array
export default function _takeLastToResult<E, T>(n: number) {
	return function _takeLastToResultWithN(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<T>> {
		return ok(_takeLastArray<T>(n)(array))
	}
}
