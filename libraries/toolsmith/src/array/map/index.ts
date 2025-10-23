import type { Result } from "../../types/fp/result/index.ts"
import type { Validation, ValidationError } from "../../types/fp/validation/index.ts"
import type { Value } from "../../types/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _mapArray from "./_mapArray/index.ts"
import _mapToResult from "./_mapToResult/index.ts"
import _mapToValidation from "./_mapToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

type A = Array<Value>
type Err = ValidationError
type RM = Result<Err, A>
type VM = Validation<Err, A>

//++ Transforms each array element using a function
export default function map<T extends Value = Value>(f: (arg: T, index?: number) => T) {
	//++ [OVERLOAD] Array mapper: takes array, returns mapped array
	function mapWithFunction(array: A): A

	//++ [OVERLOAD] Result mapper: takes and returns Result monad (fail fast)
	function mapWithFunction(array: RM): RM

	//++ [OVERLOAD] Validation mapper: takes and returns Validation monad (accumulator)
	function mapWithFunction(array: VM): VM

	//++ Implementation of the full curried function
	function mapWithFunction(array: A | RM | VM): A | RM | VM {
		// Happy path: plain array
		if (isArray(array)) {
			return _mapArray(f)(array)
		}

		// Result path: fail-fast monadic mapping
		if (isOk(array)) {
			return chainResults(_mapToResult(f))(array)
		}

		// Validation path: error accumulation monadic mapping
		if (isSuccess(array)) {
			return chainValidations(_mapToValidation(f))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return mapWithFunction
}
