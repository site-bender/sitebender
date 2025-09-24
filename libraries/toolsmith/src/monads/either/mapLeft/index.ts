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

//?? [EXAMPLE] mapLeft((err: string) => `Error: ${err}`)(left("Not found")) // Left("Error: Not found")
//?? [EXAMPLE] mapLeft((err: string) => `Error: ${err}`)(right(42)) // Right(42)
/*??
 | [EXAMPLE]
 | pipe(
 |   left("timeout"),
 |   mapLeft(err => err.toUpperCase()), // Left("TIMEOUT")
 |   mapLeft(err => ({ code: err })),   // Left({ code: "TIMEOUT" })
 | )
 |
 | [PRO] Transforms only the Left branch without allocating when already Right
 | [PRO] Enables enrichment / normalization of Left values
 | [PRO] Composes with bimap for dual-branch transformations
 |
 | [GOTCHA] Function never runs for Right values
 | [GOTCHA] Use bimap to transform both Left and Right in one pass
 | [GOTCHA] Avoid heavy logic inside fn if most inputs are Right (wasted code size)
 */
