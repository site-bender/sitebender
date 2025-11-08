import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _splitEveryArray from "../_splitEveryArray/index.ts"

//++ Private helper: splits array and wraps result in Result monad
export default function _splitEveryToResult<E, T>(chunkSize: number) {
	return function _splitEveryToResultWithSize(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<ReadonlyArray<T>>> {
		const chunks = _splitEveryArray<T>(chunkSize)(array)
		return ok<ReadonlyArray<ReadonlyArray<T>>>(chunks)
	}
}
