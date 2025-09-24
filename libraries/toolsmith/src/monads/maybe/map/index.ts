import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"
import just from "../just/index.ts"

//++ Maps a function over the value inside a Just, leaving Nothing unchanged
export default function map<A, B>(fn: (a: A) => B) {
	return function mapMaybe(maybe: Maybe<A>): Maybe<B> {
		if (isNothing(maybe)) {
			return maybe
		}

		return just(fn(maybe.value))
	}
}

//?? [EXAMPLE] map((x: number) => x * 2)(just(5)) // Just(10)
//?? [EXAMPLE] map((x: number) => x * 2)(nothing()) // Nothing
/*??
 | [EXAMPLE]
 | pipe(
 |   just(5),
 |   map(x => x * 2),        // Just(10)
 |   map(x => x + 1),        // Just(11)
 |   map(x => x.toString())  // Just("11")
 | )
 |
 | [PRO] Fundamental operation for transforming optional values safely
 | [PRO] Short-circuits on Nothing, making null checking unnecessary
 |
*/
