import type { Either } from "../../../types/fp/either/index.ts"
import type { IOEither } from "../../../types/fp/io/index.ts"

//++ Creates an IOEither from a thunk returning Either (deferred error-handling computation)
export default function ioEither<E, A>(
	thunk: () => Either<E, A>,
): IOEither<E, A> {
	return thunk
}
