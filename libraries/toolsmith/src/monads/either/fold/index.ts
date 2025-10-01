import type { Either } from "../../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"

//++ Eliminates Either by applying a handler to the active branch (Left or Right)
export default function fold<E, A, B>(onLeft: (e: E) => B) {
	return function foldRight(onRight: (a: A) => B) {
		return function foldEither(either: Either<E, A>): B {
			if (isLeft(either)) {
				return onLeft(either.left)
			}

			return onRight(either.right)
		}
	}
}
