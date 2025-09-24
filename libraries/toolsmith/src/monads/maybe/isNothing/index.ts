import type { Maybe, Nothing } from "../../../types/fp/maybe/index.ts"

//++ Type guard that checks if a Maybe value is Nothing (absent value)
export default function isNothing<A>(maybe: Maybe<A>): maybe is Nothing {
	return maybe._tag === "Nothing"
}

//?? [EXAMPLE] isNothing(nothing()) // true
//?? [EXAMPLE] isNothing(just(42)) // false
/*??
 | [EXAMPLE]
 | const processData = <T>(maybe: Maybe<T>): T => {
 |   if (isNothing(maybe)) {
 |     throw new Error("No value present")
 |   }
 |   return maybe.value  // Safe after guard
 | }
 |
 | [PRO] Enables safe handling of absent values and early returns
 | [PRO] Complements isJust for complete pattern matching
 |
*/
