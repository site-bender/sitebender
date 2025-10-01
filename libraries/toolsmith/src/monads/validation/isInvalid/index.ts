import type { Failure, Validation } from "../../../types/Validation/index.ts"

//++ Checks if a validation is a failure
export default function isInvalid<E, A>(
	validation: Validation<E, A>,
): validation is Failure<E> {
	return validation._tag === "Failure"
}
