import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _chunkArray from "../_chunkArray/index.ts"

//++ Private helper: chunks array and wraps result in Result monad
export default function _chunkToResult<E, T>(size: number) {
	return function _chunkToResultWithSize(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<ReadonlyArray<T>>> {
		const chunked = _chunkArray<T>(size)(array)
		return ok<ReadonlyArray<ReadonlyArray<T>>>(chunked)
	}
}
