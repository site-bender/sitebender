import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _transposeArray from "../_transposeArray/index.ts"

//++ [PRIVATE] Transposes array and wraps in Validation monad (accumulator)
export default function _transposeToValidation<E, T>(
	matrix: ReadonlyArray<ReadonlyArray<T>>,
): Validation<E, Array<Array<T | undefined>>> {
	return success(_transposeArray<T>(matrix))
}
