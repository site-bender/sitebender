import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _flattenArray from "../_flattenArray/index.ts"

//++ [PRIVATE] Flattens array and wraps in Result monad (fail-fast)
export default function _flattenToResult<E, T, D extends number = 1>(
	depth: D = 1 as D,
) {
	return function _flattenToResultWithDepth(
		array: ReadonlyArray<T>,
	): Result<E, Array<T extends ReadonlyArray<infer U> ? U : T>> {
		return ok(_flattenArray<T>(depth)(array))
	}
}
