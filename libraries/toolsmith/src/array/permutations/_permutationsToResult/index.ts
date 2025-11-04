import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _permutationsArray from "../_permutationsArray/index.ts"

//++ Private helper: generates permutations and wraps result in Result monad
export default function _permutationsToResult<T>(
	array: ReadonlyArray<T>,
): Result<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
	const permutations = _permutationsArray<T>(array)
	return ok<ReadonlyArray<ReadonlyArray<T>>>(permutations)
}
