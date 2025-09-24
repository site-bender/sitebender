import type { Either } from "../../../types/fp/either/index.ts"

import isRight from "../isRight/index.ts"

//++ Supplies an alternative Either when the input is Left (Right passes through)
export default function orElse<E, A, F>(
	alternative: Either<F, A> | (() => Either<F, A>),
) {
	return function orElseEither(either: Either<E, A>): Either<F, A> {
		if (isRight(either)) {
			return either as unknown as Either<F, A>
		}

		return typeof alternative === "function" ? alternative() : alternative
	}
}

//?? [EXAMPLE] orElse(right(0))(right(42)) // Right(42)
//?? [EXAMPLE] orElse(right(0))(left("error")) // Right(0)
/*??
 | [EXAMPLE]
 | const primary = left("Primary failed")
 | const secondary = left("Secondary failed")
 | const tertiary = right(100)
 | pipe(
 |   primary,
 |   orElse(secondary),
 |   orElse(tertiary)
 | ) // Right(100)
 |
 | [PRO] Fallback chaining without leaving Either context
 | [PRO] Lazy alternative avoids allocating when already Right
 | [PRO] Type parameter F allows changing Left branch type after recovery
 |
 | [GOTCHA] Alternative (function) only evaluated for Left inputs
 | [GOTCHA] Each fallback can erase original Left context—log earlier if needed
 | [GOTCHA] Consider chainLeft when recovery logic itself can produce new Left
 */
