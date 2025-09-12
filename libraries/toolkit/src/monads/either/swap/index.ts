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

//?? [EXAMPLE] swap(right(42)) // Left(42)
//?? [EXAMPLE] swap(left("error")) // Right("error")
/*??
 | [EXAMPLE]
 | pipe(
 |   right(100),
 |   swap,  // Left(100)
 |   swap   // Right(100) - original restored
 | )
 |
 | [PRO] Adapts to APIs where primary branch meaning is reversed
 | [PRO] Involutive: swap(swap(x)) === x
 |
 | [GOTCHA] Shallow operation (does not recurse into nested Either)
 | [GOTCHA] Can obscure intended semantics—use intentionally
 | [GOTCHA] Prefer bimap for transforming content instead of swapping then mapping
 */
