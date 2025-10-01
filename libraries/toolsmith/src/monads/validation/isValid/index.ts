import type { Success, Validation } from "../../../types/Validation/index.ts"

//++ Checks if a validation is successful
export default function isValid<E, A>(
	validation: Validation<E, A>,
): validation is Success<A> {
	return validation._tag === "Success"
}
