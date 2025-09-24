import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

//++ Returns an alternative Maybe if the current one is Nothing
export default function orElse<A>(getAlternative: () => Maybe<A>) {
	return function orElseMaybe(maybe: Maybe<A>): Maybe<A> {
		if (isNothing(maybe)) {
			return getAlternative()
		}

		return maybe
	}
}

//?? [EXAMPLE] orElse(() => just(0))(just(42)) // Just(42) - original kept
//?? [EXAMPLE] orElse(() => just(0))(nothing()) // Just(0) - alternative used
/*??
 | [EXAMPLE]
 | pipe(
 |   nothing(),
 |   orElse(() => nothing()),
 |   orElse(() => just(42)),
 |   orElse(() => just(999))
 | )  // Just(42)
 |
 | [PRO] Keeps you within Maybe monad for continued chaining
 | [PRO] Lazy evaluation - alternative only computed if needed
 |
*/
