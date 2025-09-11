import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

//++ Folds a Maybe value to a single result using handlers for each case
export default function fold<A, B>(onNothing: () => B) {
	return function foldJust(onJust: (value: A) => B) {
		return function foldMaybe(maybe: Maybe<A>): B {
			if (isNothing(maybe)) {
				return onNothing()
			}

			return onJust(maybe.value)
		}
	}
}

//?? [EXAMPLE] fold(() => 0)((x: number) => x)(just(42)) // 42
//?? [EXAMPLE] fold(() => 0)((x: number) => x)(nothing()) // 0
/*??
 | [EXAMPLE]
 | const toString = fold(
 |   () => "Nothing",
 |   (n: number) => `Just(${n})`
 | )
 | toString(just(42))    // "Just(42)"
 | toString(nothing())   // "Nothing"
 |
 | [PRO] Reduces Maybe to single value handling both cases explicitly
 | [PRO] Common pattern for converting Maybe to other types
 |
*/
