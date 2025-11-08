import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _countByArray from "../_countByArray/index.ts"

export default function _countByToResult<
	E,
	T,
	K extends string | number | symbol,
>(
	fn: (element: T) => K,
) {
	return function _countByToResultWithFn(
		array: ReadonlyArray<T>,
	): Result<E, Record<K, number>> {
		const counted = _countByArray(fn)(array)
		return ok(counted)
	}
}
