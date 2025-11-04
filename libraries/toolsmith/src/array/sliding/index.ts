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
import _slidingArray from "./_slidingArray/index.ts"
import _slidingToResult from "./_slidingToResult/index.ts"
import _slidingToValidation from "./_slidingToValidation/index.ts"

//++ Creates sliding windows over array with configurable size and step
//++ Pattern: three-path overloaded function for plain arrays, Result monads, and Validation monads
export default function sliding<T>(size: number) {
	return function slidingWithSize(step: number) {
		//++ [OVERLOAD 1] Plain array path
		function slidingWithStep(
			array: ReadonlyArray<T>,
		): ReadonlyArray<ReadonlyArray<T>>

		//++ [OVERLOAD 2] Result monad path (fail-fast error handling)
		function slidingWithStep(
			array: Result<ValidationError, ReadonlyArray<T>>,
		): Result<ValidationError, ReadonlyArray<ReadonlyArray<T>>>

		//++ [OVERLOAD 3] Validation monad path (accumulate errors)
		function slidingWithStep(
			array: Validation<ValidationError, ReadonlyArray<T>>,
		): Validation<ValidationError, ReadonlyArray<ReadonlyArray<T>>>

		//++ Implementation with type dispatch
		function slidingWithStep(array: unknown) {
			if (isArray<T>(array)) {
				return _slidingArray(size)(step)(array)
			}

			if (isOk<ReadonlyArray<T>>(array)) {
				return chainResults(_slidingToResult(size)(step))(array)
			}

			if (isSuccess<ReadonlyArray<T>>(array)) {
				return chainValidations(_slidingToValidation(size)(step))(array)
			}

			return array
		}

		return slidingWithStep
	}
}
