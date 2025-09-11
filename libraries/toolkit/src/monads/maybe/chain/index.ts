import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

//++ Flat maps a function over the value inside a Just (monadic bind/flatMap)
export default function chain<A, B>(fn: (a: A) => Maybe<B>) {
	return function chainMaybe(maybe: Maybe<A>): Maybe<B> {
		if (isNothing(maybe)) {
			return maybe
		}

		return fn(maybe.value)
	}
}

//?? [EXAMPLE] chain((n: number) => n === 0 ? nothing() : just(10 / n))(just(2)) // Just(5)
//?? [EXAMPLE] chain((n: number) => n === 0 ? nothing() : just(10 / n))(just(0)) // Nothing
/*??
 | [EXAMPLE]
 | const safeDivide = (x: number) => (y: number): Maybe<number> =>
 |   y === 0 ? nothing() : just(x / y)
 | pipe(
 |   just(20),
 |   chain(n => just(n - 10)),     // Just(10)
 |   chain(safeDivide(100))         // Just(10)
 | )
 |
 | [PRO] Essential for sequential composition of operations that might fail
 | [PRO] Flattens nested Maybe values automatically
 |
*/
