import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _frequencyArray from "../_frequencyArray/index.ts"

export default function _frequencyToValidation<E, T>(
	array: ReadonlyArray<T>,
): Validation<E, Record<string, number>> {
	const frequencies = _frequencyArray(array)
	return success(frequencies)
}
