import type { Either } from "../../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"

//++ Chains Right-branch computations (flatMap/bind) and flattens nested Either
export default function chain<E, A, B>(fn: (a: A) => Either<E, B>) {
	return function chainEither(either: Either<E, A>): Either<E, B> {
		if (isLeft(either)) {
			return either
		}

		return fn(either.right)
	}
}
