import type { AsyncIoValidation } from "../../../types/fp/io/index.ts"
import type { Validation } from "../../../types/fp/validation/index.ts"

//++ Creates an AsyncIoValidation by wrapping an async thunk that returns a Promise<Validation>
//++ Used for async operations with error accumulation
export default function asyncIoValidation<E, A>(
	thunk: () => Promise<Validation<E, A>>,
): AsyncIoValidation<E, A> {
	return thunk
}
