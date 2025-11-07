import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import _combinationsArray from "./_combinationsArray/index.ts"
import _combinationsToResult from "./_combinationsToResult/index.ts"
import _combinationsToValidation from "./_combinationsToValidation/index.ts"

//++ Generates all k-element combinations from an array
export default function combinations<T>(k: number) {
	function combinationsWithK(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>>

	function combinationsWithK(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<ReadonlyArray<T>>>

	function combinationsWithK(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<ReadonlyArray<T>>>

	function combinationsWithK(array: unknown) {
		if (isArray<T>(array)) {
			return _combinationsArray(k)(array)
		}
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_combinationsToResult(k))(array)
		}
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_combinationsToValidation(k))(array)
		}
		return array
	}

	return combinationsWithK
}
