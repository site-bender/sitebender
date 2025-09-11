import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

//++ Extracts a value from a Maybe using handlers for each case (pattern matching)
export default function maybe<B>(onNothing: () => B) {
	return function maybeJust<A>(onJust: (value: A) => B) {
		return function maybeValue(maybe: Maybe<A>): B {
			if (isNothing(maybe)) {
				return onNothing()
			}

			return onJust(maybe.value)
		}
	}
}

//?? [EXAMPLE] maybe(() => 0)((x: number) => x)(just(42)) // 42
//?? [EXAMPLE] maybe(() => 0)((x: number) => x)(nothing()) // 0
/*??
 | [EXAMPLE]
 | const toResult = <T>(maybeValue: Maybe<T>) =>
 |   maybe(
 |     () => ({ success: false, error: "No value present" })
 |   )(
 |     value => ({ success: true, value })
 |   )(maybeValue)
 |
 | [PRO] Primary way to consume Maybe values and convert to regular values
 | [PRO] Forces explicit handling of absence case
 |
*/
