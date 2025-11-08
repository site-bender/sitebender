import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _countByArray from "../_countByArray/index.ts"

export default function _countByToValidation<
	E,
	T,
	K extends string | number | symbol,
>(
	fn: (element: T) => K,
) {
	return function _countByToValidationWithFn(
		array: ReadonlyArray<T>,
	): Validation<E, Record<K, number>> {
		const counted = _countByArray(fn)(array)
		return success(counted)
	}
}
