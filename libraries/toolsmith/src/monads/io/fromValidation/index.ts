import type { IoValidation } from "../../../types/fp/io/index.ts"
import type { Validation } from "../../../types/fp/validation/index.ts"

//++ Lifts a Validation<E, A> into IoValidation<E, A> context (error accumulation)
export default function fromValidation<E, A>(
	validation: Validation<E, A>,
): IoValidation<E, A> {
	return function ioValidationFromValidation() {
		return validation
	}
}
