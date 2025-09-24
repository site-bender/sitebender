import type { Either } from "../../../types/fp/either/index.ts"

import isRight from "../isRight/index.ts"

//++ Extracts the Right branch value or returns a default for Left
export default function getOrElse<A>(defaultValue: A | ((e: unknown) => A)) {
	return function getOrElseEither<E>(either: Either<E, A>): A {
		if (isRight(either)) {
			return either.right
		}

		return typeof defaultValue === "function"
			? (defaultValue as (e: E) => A)(either.left)
			: defaultValue
	}
}

//?? [EXAMPLE] getOrElse(0)(right(42)) // 42
//?? [EXAMPLE] getOrElse(0)(left("error")) // 0
/*??
 | [EXAMPLE]
 | const withComputedDefault = getOrElse(
 |   (err: string) => err.length
 | )
 | withComputedDefault(right(100))     // 100
 | withComputedDefault(left("error"))  // 5 (length of "error")
 |
 | [PRO] Bridges Either to raw value with fallback
 | [PRO] Lazy default avoids unnecessary computation when Right
 | [PRO] Default can depend on Left branch value
 |
 | [GOTCHA] Function default only runs for Left
 | [GOTCHA] For alternative Either use orElse (not getOrElse)
 | [GOTCHA] Prefer small default lambdas to keep stack traces clear
 */
