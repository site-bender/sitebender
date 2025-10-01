import type { Either } from "../../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"
import left from "../left/index.ts"

//++ Maps a function over the Left value of an Either, leaving Right unchanged
export default function mapLeft<E, F>(fn: (e: E) => F) {
	return function mapLeftEither<A>(either: Either<E, A>): Either<F, A> {
		if (isLeft(either)) {
			return left(fn(either.left))
		}

		return either
	}
}
