import type { Either } from "../../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"

//++ Maps functions over both Left and Right branches (one side executed)
export default function bimap<E, F>(leftFn: (e: E) => F) {
	return function bimapRight<A, B>(rightFn: (a: A) => B) {
		return function bimapEither(either: Either<E, A>): Either<F, B> {
			if (isLeft(either)) {
				return left(leftFn(either.left))
			}

			return right(rightFn(either.right))
		}
	}
}

//?? [EXAMPLE] bimap((e: string) => e.toUpperCase())((v: number) => v * 2)(right(5)) // Right(10)
//?? [EXAMPLE] bimap((e: string) => e.toUpperCase())((v: number) => v * 2)(left("error")) // Left("ERROR")
/*??
 | [EXAMPLE]
 | const convertCurrency = (rate: number) => bimap(
 |   (err: string) => `Currency issue: ${err}`
 | )(
 |   (amount: number) => amount * rate
 | )
 | const toEuros = convertCurrency(0.85)
 | toEuros(right(100))               // Right(85)
 | toEuros(left("Invalid amount"))   // Left("Currency issue: Invalid amount")
 |
 | [PRO] Single pass branch-aware transformation
 | [PRO] Combines map + mapLeft ergonomically
 | [PRO] Keeps original shape (Either) for further composition
 |
 | [GOTCHA] Only one of the functions runs (based on branch)
 | [GOTCHA] Avoid heavy logic in both functions if only one branch is common
 | [GOTCHA] Prefer map/mapLeft when only one branch needs change (smaller bundle)
 */
