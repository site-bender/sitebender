import type { Failure, Validation } from "../../../types/fp/validation/index.ts"

//++ Checks if a validation is a failure
//++ [EXCEPTION] Uses === operator and property access to check discriminated union tag - this is a primitive type guard operation with no higher-level abstraction available
export default function isInsuccess<E, A>(
	validation: Validation<E, A>,
): validation is Failure<E> {
	return validation._tag === "Failure"
}
