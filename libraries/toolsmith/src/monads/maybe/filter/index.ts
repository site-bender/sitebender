import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"
import nothing from "../nothing/index.ts"

//++ Converts a Just to Nothing if its value doesn't satisfy a predicate
export default function filter<A>(predicate: (a: A) => boolean) {
	return function filterMaybe(maybe: Maybe<A>): Maybe<A> {
		if (isNothing(maybe)) {
			return maybe
		}

		return predicate((maybe as { _tag: "Just"; value: A }).value)
			? maybe
			: nothing()
	}
}

//?? [EXAMPLE] filter((n: number) => n > 0)(just(5)) // Just(5)
//?? [EXAMPLE] filter((n: number) => n > 0)(just(-3)) // Nothing
/*??
 | [EXAMPLE]
 | const isEven = (n: number) => n % 2 === 0
 | const isPositive = (n: number) => n > 0
 | pipe(
 |   just(42),
 |   filter(isPositive),     // Just(42)
 |   filter(isEven)          // Just(42)
 | )
 |
 | [PRO] Enables conditional propagation of values through computation chains
 | [PRO] Nothing values always remain Nothing (short-circuits)
 |
*/
