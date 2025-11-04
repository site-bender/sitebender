import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _countByArray from "../_countByArray/index.ts"

export default function _countByToResult<
	T,
	K extends string | number | symbol,
>(
	fn: (element: T) => K,
) {
	return function _countByToResultWithFn(
		array: ReadonlyArray<T>,
	): Result<ValidationError, Record<K, number>> {
		const counted = _countByArray(fn)(array)
		return ok(counted)
	}
}
