import type { Either } from "../../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"

//++ Swaps the Left and Right values of an Either, exchanging error and success positions
export default function swap<E, A>(either: Either<E, A>): Either<A, E> {
	if (isLeft(either)) {
		return right(either.left)
	}

	return left(either.right)
}

//?? [EXAMPLE] swap(right(42)) // Left(42)
//?? [EXAMPLE] swap(left("error")) // Right("error")
/*??
 | [EXAMPLE]
 | pipe(
 |   right(100),
 |   swap,  // Left(100)
 |   swap   // Right(100) - idempotent operation
 | )
 |
 | [PRO] Useful for adapting between different error handling conventions
 | [PRO] Idempotent - double swap returns to original
 |
*/
