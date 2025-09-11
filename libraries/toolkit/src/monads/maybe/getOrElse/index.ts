import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

//++ Extracts the value from a Just or returns a default for Nothing
export default function getOrElse<A>(getDefault: () => A) {
	return function getOrElseMaybe(maybe: Maybe<A>): A {
		if (isNothing(maybe)) {
			return getDefault()
		}

		return maybe.value
	}
}

//?? [EXAMPLE] getOrElse(() => 0)(just(42)) // 42
//?? [EXAMPLE] getOrElse(() => 0)(nothing()) // 0
/*??
 | [EXAMPLE]
 | const expensiveDefault = () => computeExpensiveValue()
 | getOrElse(expensiveDefault)(just(5))   // 5 (not computed)
 | getOrElse(expensiveDefault)(nothing()) // expensive value (computed)
 |
 | [PRO] Lazy evaluation - default only computed if needed
 | [PRO] Primary way to exit Maybe context with concrete value
 |
*/
