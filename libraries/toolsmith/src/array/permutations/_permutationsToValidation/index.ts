import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _permutationsArray from "../_permutationsArray/index.ts"

//++ Private helper: generates permutations and wraps result in Validation monad
export default function _permutationsToValidation<E, T>(
	array: ReadonlyArray<T>,
): Validation<E, ReadonlyArray<ReadonlyArray<T>>> {
	const permutations = _permutationsArray<T>(array)
	return success<ReadonlyArray<ReadonlyArray<T>>>(permutations)
}
