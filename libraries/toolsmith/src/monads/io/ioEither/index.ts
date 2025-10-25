import type { Either } from "../../../types/fp/either/index.ts"
import type { IoEither } from "../../../types/fp/io/index.ts"

//++ Creates an IoEither from a thunk returning Either (deferred branching computation)
//++ NOTE: Either is for branching where BOTH outcomes are valid, NOT for error handling
export default function ioEither<L, R>(
	thunk: () => Either<L, R>,
): IoEither<L, R> {
	return thunk
}
