import type { Validation } from "../../../types/fp/validation/index.ts"

import _dropRepeatsWithArray from "../_dropRepeatsWithArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _dropRepeatsWithArray for Validation monad path
export default function _dropRepeatsWithToValidation<E, T>(
	comparator: (a: T, b: T) => boolean,
) {
	return function _dropRepeatsWithToValidationWithComparator(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<T>> {
		return success(_dropRepeatsWithArray<T>(comparator)(array))
	}
}
