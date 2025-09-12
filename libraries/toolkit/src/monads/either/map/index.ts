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

//?? [EXAMPLE] map((x: number) => x * 2)(right(5)) // Right(10)
//?? [EXAMPLE] map((x: number) => x * 2)(left("error")) // Left("error")
/*??
 | [EXAMPLE]
 | pipe(
 |   right(5),
 |   map(x => x * 2),          // Right(10)
 |   map(x => x + 1),          // Right(11)
 |   map(x => x.toString())    // Right("11")
 | )
 |
 | [PRO] Skips computation for Left values (no function call)
 | [PRO] Fundamental Right-branch transformation primitive
 | [PRO] Composes naturally in a pipe chain
 |
 | [GOTCHA] fn never runs on Left values
 | [GOTCHA] Use bimap to transform both branches in one pass
 | [GOTCHA] Heavy logic in fn is wasted if upstream frequently yields Left
 */
