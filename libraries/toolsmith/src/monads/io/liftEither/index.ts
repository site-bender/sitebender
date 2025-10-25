import type { Either } from "../../../types/fp/either/index.ts"
import type { IoEither } from "../../../types/fp/io/index.ts"

//++ Lifts a thunk returning Either into IoEither context (branching logic, both outcomes valid)
export default function liftEither<L, R>(
	thunk: () => Either<L, R>,
): IoEither<L, R> {
	return function liftedEitherThunk(): Either<L, R> {
		return thunk()
	}
}
