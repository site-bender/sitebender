import type { IOMaybe } from "../../../types/fp/io/index.ts"
import type { Maybe } from "../../../types/fp/maybe/index.ts"

//++ Lifts a pure function returning Maybe into IOMaybe
export default function liftMaybe<A>(f: () => Maybe<A>): IOMaybe<A> {
	return function runLiftedMaybe() {
		return f()
	}
}

//?? [EXAMPLE] liftMaybe(() => just(42)) // IOMaybe(() => Just(42))
//?? [EXAMPLE] liftMaybe(() => nothing()) // IOMaybe(() => Nothing)
/*??
 | [EXAMPLE]
 | const parseInteger = (s: string): Maybe<number> => {
 |   const n = parseInt(s, 10)
 |   return isNaN(n) ? nothing() : just(n)
 | }
 | const parseIntegerIO = (s: string): IOMaybe<number> =>
 |   liftMaybe(() => parseInteger(s))
 | runIO(parseIntegerIO("42"))    // Just(42)
 | runIO(parseIntegerIO("abc"))   // Nothing
 |
 | [PRO] Integrates pure Maybe computations into IO pipelines
 | [PRO] Allows composition with other IO operations
 | [PRO] Maintains optional value semantics in IO context
 |
*/
