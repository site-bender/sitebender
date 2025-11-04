import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _frequencyArray from "../_frequencyArray/index.ts"

export default function _frequencyToValidation<T>(
	array: ReadonlyArray<T>,
): Validation<ValidationError, Record<string, number>> {
	const frequencies = _frequencyArray(array)
	return success(frequencies)
}
