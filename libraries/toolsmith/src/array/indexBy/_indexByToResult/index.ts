import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _indexByArray from "../_indexByArray/index.ts"

export default function _indexByToResult<
	E,
	T,
	K extends string | number | symbol,
>(
	keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K,
) {
	return function _indexByToResultWithKeyFn(
		array: ReadonlyArray<T>,
	): Result<E, Record<K, T>> {
		const indexed = _indexByArray(keyFn)(array)
		return ok(indexed)
	}
}
