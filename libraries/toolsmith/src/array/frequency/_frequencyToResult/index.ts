import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _frequencyArray from "../_frequencyArray/index.ts"

export default function _frequencyToResult<E, T>(
	array: ReadonlyArray<T>,
): Result<E, Record<string, number>> {
	const frequencies = _frequencyArray(array)
	return ok(frequencies)
}
