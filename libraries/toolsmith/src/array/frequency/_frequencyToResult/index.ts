import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _frequencyArray from "../_frequencyArray/index.ts"

export default function _frequencyToResult<T>(
	array: ReadonlyArray<T>,
): Result<ValidationError, Record<string, number>> {
	const frequencies = _frequencyArray(array)
	return ok(frequencies)
}
