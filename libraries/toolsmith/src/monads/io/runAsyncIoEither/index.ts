import type { AsyncIoEither } from "../../../types/fp/io/index.ts"
import type { Either } from "../../../types/fp/either/index.ts"

//++ Executes an AsyncIoEither by calling the async thunk and awaiting the result (branching logic)
export default function runAsyncIoEither<L, R>(
	asyncIo: AsyncIoEither<L, R>,
): Promise<Either<L, R>> {
	return asyncIo()
}
