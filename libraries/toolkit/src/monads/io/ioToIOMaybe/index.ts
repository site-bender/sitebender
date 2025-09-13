import type { IO, IOMaybe } from "../../../types/fp/io/index.ts"

import just from "../../maybe/just/index.ts"

//++ Converts IO<A> to IOMaybe<A> by wrapping the value in Just
export default function ioToIOMaybe<A>(io: IO<A>): IOMaybe<A> {
	return () => just(io())
}

//?? [EXAMPLE] ioToIOMaybe(io(() => 42)) // IOMaybe(() => Just(42))
//?? [EXAMPLE] runIO(ioToIOMaybe(randomIO)) // Just(0.123456...)
/*??
 | [EXAMPLE]
 | const userIO = io(() => ({ name: "Alice", age: 30 }))
 | const userIOMaybe = ioToIOMaybe(userIO)
 | const validateAge = (user: { age: number }) =>
 |   ioMaybe(() => user.age >= 18 ? just(user) : nothing())
 | const validatedIO = chainIOMaybe(validateAge)(userIOMaybe)
 | runIO(validatedIO) // Just({ name: "Alice", age: 30 })
 |
 | [PRO] Lifts successful IO into IOMaybe context for integration
 | [PRO] Useful when integrating always-successful IO with optional operations
 |
*/
