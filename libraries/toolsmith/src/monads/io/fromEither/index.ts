import type { Either } from "../../../types/fp/either/index.ts"
import type { IoEither } from "../../../types/fp/io/index.ts"

//++ Lifts a pure Either into IoEither context (branching logic, both outcomes valid)
export default function fromEither<L, R>(either: Either<L, R>): IoEither<L, R> {
	return function ioEitherFromEither() {
		return either
	}
}
