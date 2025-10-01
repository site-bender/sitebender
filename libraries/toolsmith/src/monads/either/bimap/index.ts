import type { Either } from "../../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"

//++ Maps functions over both Left and Right branches (one side executed)
export default function bimap<E, F>(leftFn: (e: E) => F) {
	return function bimapRight<A, B>(rightFn: (a: A) => B) {
		return function bimapEither(either: Either<E, A>): Either<F, B> {
			if (isLeft(either)) {
				return left(leftFn(either.left))
			}

			return right(rightFn(either.right))
		}
	}
}
