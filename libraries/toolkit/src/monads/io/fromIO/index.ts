import type { IO, IOMaybe } from "../../../types/fp/io/index.ts"

import just from "../../maybe/just/index.ts"

//++ Converts IO<A> to IOMaybe<A> by wrapping result in Just
export default function fromIO<A>(io: IO<A>): IOMaybe<A> {
	return () => just(io())
}

//?? [EXAMPLE] fromIO(io(() => 42)) // IOMaybe(() => Just(42))
//?? [EXAMPLE] runIO(fromIO(numberIO)) // Just(42)
/*??
 | [EXAMPLE]
 | const userIO = io(() => ({ name: "Alice", age: 30 }))
 | const userMaybeIO = fromIO(userIO)
 | const nameIO = mapIOMaybe((u: { name: string }) => u.name)(userMaybeIO)
 | runIO(nameIO) // Just("Alice")
 |
 | [PRO] Lifts successful IO into IOMaybe context for composition
 | [PRO] Resulting IOMaybe always contains Just(value) when executed
 |
*/
