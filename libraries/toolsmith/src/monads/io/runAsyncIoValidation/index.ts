import type { AsyncIoValidation } from "../../../types/fp/io/index.ts"
import type { Validation } from "../../../types/fp/validation/index.ts"

//++ Executes an AsyncIoValidation by calling the async thunk and awaiting the result
export default function runAsyncIoValidation<E, A>(
	asyncIo: AsyncIoValidation<E, A>,
): Promise<Validation<E, A>> {
	return asyncIo()
}
