import type { Either } from "../../../types/fp/either/index.ts"

import isRight from "../isRight/index.ts"

//++ Extracts the Right value or returns a default value
export default function getOrElse<A>(defaultValue: A | ((e: unknown) => A)) {
	return function getOrElseEither<E>(either: Either<E, A>): A {
		if (isRight(either)) {
			return (either as any).right as A
		}

		return typeof defaultValue === "function"
			? (defaultValue as (e: E) => A)((either as any).left as E)
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
 | [PRO] Common way to escape Either context with reasonable defaults
 | [PRO] Default can be constant or computed from the error
 |
*/
