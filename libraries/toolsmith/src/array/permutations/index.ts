import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import _permutationsArray from "./_permutationsArray/index.ts"
import _permutationsToResult from "./_permutationsToResult/index.ts"
import _permutationsToValidation from "./_permutationsToValidation/index.ts"

//++ Generates all permutations of array elements
export default function permutations<T>(
	array: ReadonlyArray<T>,
): ReadonlyArray<ReadonlyArray<T>>

export default function permutations<E, T>(
	array: Result<E, ReadonlyArray<T>>,
): Result<E, ReadonlyArray<ReadonlyArray<T>>>

export default function permutations<E, T>(
	array: Validation<E, ReadonlyArray<T>>,
): Validation<E, ReadonlyArray<ReadonlyArray<T>>>

export default function permutations<E, T>(array: unknown) {
	if (isArray<T>(array)) {
		return _permutationsArray(array)
	}
	if (isOk<ReadonlyArray<T>>(array)) {
		return chainResults(_permutationsToResult)(array)
	}
	if (isSuccess<ReadonlyArray<T>>(array)) {
		return chainValidations(_permutationsToValidation)(array)
	}
	return array
}
