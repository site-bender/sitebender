import type { Result } from "../../../types/fp/result/index.ts"
import _dropArray from "../_dropArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Monadic wrapper for Result path
//++ Takes plain array, returns Result-wrapped array
export default function _dropToResult<E, T>(n: number) {
	return function _dropToResultWithN(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<T>> {
		return ok(_dropArray<T>(n)(array))
	}
}
