import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _zipObjArray from "../_zipObjArray/index.ts"

//++ [PRIVATE] Creates object from keys and values arrays, returning Validation monad
export default function _zipObjToValidation<E, T>(
	keys: ReadonlyArray<string | number>,
) {
	return function _zipObjToValidationWithKeys(
		values: ReadonlyArray<T>,
	): Validation<E, Record<string | number, T | undefined>> {
		return success(_zipObjArray(keys)(values))
	}
}
