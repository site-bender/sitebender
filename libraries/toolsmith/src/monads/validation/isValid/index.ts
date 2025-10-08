import type { Success, Validation } from "../../../types/validation/index.ts"

//++ Checks if a validation is successful
export default function isValid<E, A>(
	validation: Validation<E, A>,
): validation is Success<A> {
	return validation._tag === "Success"
}
