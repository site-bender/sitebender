import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _combinationsArray from "../_combinationsArray/index.ts"

//++ Private helper: generates combinations and wraps result in Result monad
export default function _combinationsToResult<T>(k: number) {
	return function _combinationsToResultWithK(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
		const combinations = _combinationsArray<T>(k)(array)
		return ok<ReadonlyArray<ReadonlyArray<T>>>(combinations)
	}
}
