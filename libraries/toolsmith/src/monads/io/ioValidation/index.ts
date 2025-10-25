import type { IoValidation } from "../../../types/fp/io/index.ts"
import type { Validation } from "../../../types/fp/validation/index.ts"

//++ Creates an IoValidation by wrapping a thunk that returns a Validation (error accumulation)
export default function ioValidation<E, A>(
	thunk: () => Validation<E, A>,
): IoValidation<E, A> {
	return thunk
}
