import type { Either } from "../../../types/fp/either/index.ts"

import isRight from "../isRight/index.ts"

//++ Chains Left-branch recovery computations (like flatMap over Left)
export default function chainLeft<E, F, A>(fn: (e: E) => Either<F, A>) {
	return function chainLeftEither(either: Either<E, A>): Either<F, A> {
		if (isRight(either)) {
			return either
		}

		return fn(either.left)
	}
}
