import type { Either } from "../../types/fp/either/index.ts"

import isRight from "../isRight/index.ts"

//++ Provides an alternative Either if the original is Left
export default function orElse<E, F, A>(
	alternative: Either<F, A> | (() => Either<F, A>),
) {
	return function orElseEither(either: Either<E, A>): Either<F, A> {
		if (isRight(either)) {
			return either
		}

		return typeof alternative === "function" ? alternative() : alternative
	}
}

//?? [EXAMPLE] orElse(right(0))(right(42)) // Right(42)
//?? [EXAMPLE] orElse(right(0))(left("error")) // Right(0)
/*??
 * [EXAMPLE]
 * const primary = left("Primary failed")
 * const secondary = left("Secondary failed")
 * const tertiary = right(100)
 * pipe(
 *   primary,
 *   orElse(secondary),
 *   orElse(tertiary)
 * ) // Right(100)
 *
 * [PRO] Useful for fallback computations or default values
 * [PRO] Supports lazy alternatives to avoid unnecessary computation
 */
