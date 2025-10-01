import type { Either } from "../../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"

//++ Swaps Left and Right branches (Left -> Right, Right -> Left)
export default function swap<E, A>(either: Either<E, A>): Either<A, E> {
	if (isLeft(either)) {
		return right(either.left)
	}

	return left(either.right)
}
