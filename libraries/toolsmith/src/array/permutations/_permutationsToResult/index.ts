import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _permutationsArray from "../_permutationsArray/index.ts"

//++ Private helper: generates permutations and wraps result in Result monad
export default function _permutationsToResult<E, T>(
	array: ReadonlyArray<T>,
): Result<E, ReadonlyArray<ReadonlyArray<T>>> {
	const permutations = _permutationsArray<T>(array)
	return ok<ReadonlyArray<ReadonlyArray<T>>>(permutations)
}
