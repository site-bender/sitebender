import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _groupByArray from "../_groupByArray/index.ts"

export default function _groupByToValidation<T, K extends string | number>(
	keyFn: (element: T) => K,
) {
	return function _groupByToValidationWithKeyFn(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, Record<string, ReadonlyArray<T>>> {
		const grouped = _groupByArray(keyFn)(array)
		return success(grouped)
	}
}
