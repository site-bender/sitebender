import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _indexByArray from "../_indexByArray/index.ts"

export default function _indexByToValidation<
	E,
	T,
	K extends string | number | symbol,
>(
	keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K,
) {
	return function _indexByToValidationWithKeyFn(
		array: ReadonlyArray<T>,
	): Validation<E, Record<K, T>> {
		const indexed = _indexByArray(keyFn)(array)
		return success(indexed)
	}
}
