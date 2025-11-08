import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _groupByArray from "../_groupByArray/index.ts"

export default function _groupByToResult<E, T, K extends string | number>(
	keyFn: (element: T) => K,
) {
	return function _groupByToResultWithKeyFn(
		array: ReadonlyArray<T>,
	): Result<E, Record<string, ReadonlyArray<T>>> {
		const grouped = _groupByArray(keyFn)(array)
		return ok(grouped)
	}
}
