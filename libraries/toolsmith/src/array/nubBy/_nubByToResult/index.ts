import type { Result, ValidationError } from "../../../types/fp/index.ts"

import _nubByArray from "../_nubByArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _nubByArray for Result monad path
export default function _nubByToResult<T>(equalityFn: (a: T, b: T) => boolean) {
	return function _nubByToResultWithEqualityFn(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_nubByArray(equalityFn)(array))
	}
}
