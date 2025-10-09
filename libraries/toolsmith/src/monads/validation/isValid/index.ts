import type { Success, Validation } from "../../../types/validation/index.ts"

//++ Checks if a validation is successful
//++ [EXCEPTION] Uses === operator and property access to check discriminated union tag - this is a primitive type guard operation with no higher-level abstraction available
export default function isValid<E, A>(
	validation: Validation<E, A>,
): validation is Success<A> {
	return validation._tag === "Success"
}
