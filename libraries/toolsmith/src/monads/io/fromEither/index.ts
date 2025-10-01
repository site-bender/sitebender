import type { Either } from "../../../types/fp/either/index.ts"
import type { IOEither } from "../../../types/fp/io/index.ts"

//++ Lifts a pure Either into IOEither context
export default function fromEither<E, A>(either: Either<E, A>): IOEither<E, A> {
	return () => either
}
