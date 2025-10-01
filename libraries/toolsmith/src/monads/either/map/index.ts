import type { Either } from "../../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"
import right from "../right/index.ts"

//++ Maps a function over the Right branch of an Either (Left passes through)
export default function map<A, B>(fn: (a: A) => B) {
	return function mapEither<E>(either: Either<E, A>): Either<E, B> {
		if (isLeft(either)) {
			return either
		}

		return right(fn(either.right))
	}
}
