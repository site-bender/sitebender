import type { AsyncIoEither } from "../../../types/fp/io/index.ts"
import type { Either } from "../../../types/fp/either/index.ts"

//++ Creates an AsyncIoEither by wrapping an async thunk that returns a Promise<Either>
//++ Used for async operations with branching logic where BOTH outcomes are valid
export default function asyncIoEither<L, R>(
	thunk: () => Promise<Either<L, R>>,
): AsyncIoEither<L, R> {
	return thunk
}
