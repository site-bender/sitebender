import type { IOMaybe } from "../../../types/fp/io/index.ts"
import type { Maybe } from "../../../types/fp/maybe/index.ts"

//++ Creates an IOMaybe from a thunk returning Maybe (deferred optional computation)
export default function ioMaybe<A>(thunk: () => Maybe<A>): IOMaybe<A> {
	return thunk
}

//?? [EXAMPLE] ioMaybe(() => just(42)) // IOMaybe(() => Just(42))
//?? [EXAMPLE] runIO(ioMaybe(() => nothing())) // Nothing
/*??
 | [EXAMPLE]
 | const parseJsonIO = ioMaybe(() => {
 |   try {
 |     return just(JSON.parse('{"valid": true}'))
 |   } catch {
 |     return nothing()
 |   }
 | })
 | runIO(parseJsonIO) // Just({ valid: true })
 |
 | [PRO] Primary constructor for effectful computations that may not produce a value
 | [PRO] Maintains referential transparency while handling potential absence
 | [GOTCHA] Contains impure operations - only execute when ready for side effects
 |
*/
