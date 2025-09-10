import type { Either } from "../../types/fp/either/index.ts"

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
 * [EXAMPLE]
 * pipe(
 *   left("timeout"),
 *   mapLeft(err => err.toUpperCase()),
 *   mapLeft(err => `NETWORK_${err}`),
 *   mapLeft(err => ({ code: err, retry: true }))
 * ) // Left({ code: "NETWORK_TIMEOUT", retry: true })
 *
 * [PRO] Useful for enriching error messages or converting error types
 * [PRO] Keeps success path unaffected while transforming failures
 */
