import type { Just, Maybe } from "../../../types/fp/maybe/index.ts"

//++ Creates a Just value representing the presence of a value in a Maybe
export default function just<A>(value: A): Maybe<A> {
	return {
		_tag: "Just" as const,
		value,
	} as Just<A>
}

//?? [EXAMPLE] just(42) // { _tag: "Just", value: 42 }
//?? [EXAMPLE] just({ id: 1, name: "Alice" }) // Just({ id: 1, name: "Alice" })
/*??
 | [EXAMPLE]
 | const safeDivide = (a: number) => (b: number): Maybe<number> =>
 |   b === 0 ? nothing() : just(a / b)
 | safeDivide(10)(2)  // Just(5)
 | safeDivide(10)(0)  // Nothing
 |
 | [PRO] Represents presence of value (similar to Some in other languages)
 | [PRO] Enables safe handling of nullable values and optional data
 |
*/
