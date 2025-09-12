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

//?? [EXAMPLE] chainLeft((err: string) => err === "recoverable" ? right(0) : left(err))(left("recoverable")) // Right(0)
//?? [EXAMPLE] chainLeft((err: string) => err === "recoverable" ? right(0) : left(err))(left("fatal")) // Left("fatal")
/*??
 | [EXAMPLE]
 | const tryCache = (err: string) =>
 |   err === "DB_ERROR" ? right(defaultUser) : left(err)
 | const tryDefault = (err: string) =>
 |   err === "CACHE_MISS" ? right(guestUser) : left(err)
 | pipe(
 |   left("DB_ERROR"),
 |   chainLeft(tryCache),    // Attempts recovery
 |   chainLeft(tryDefault)   // Falls back if still Left
 | )
 |
 | [PRO] Enables Left-branch recovery without leaving Either context
 | [PRO] Right values pass through untouched (no extra allocation)
 |
 | [GOTCHA] fn never runs for Right inputs
 | [GOTCHA] Overuse can obscure original Left source—log or annotate early
 | [GOTCHA] Use orElse for static fallback without branching logic
 */
