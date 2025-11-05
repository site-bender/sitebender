import type { Validation, ValidationError } from "../../../types/fp/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _transposeArray from "../_transposeArray/index.ts"

//++ [PRIVATE] Transposes array and wraps in Validation monad (accumulator)
export default function _transposeToValidation<T>(
	matrix: ReadonlyArray<ReadonlyArray<T>>,
): Validation<ValidationError, Array<Array<T | undefined>>> {
	return success(_transposeArray(matrix))
}
