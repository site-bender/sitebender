import type { IO, IOEither } from "../../../types/fp/io/index.ts"

import right from "../../either/right/index.ts"

//++ Converts IO<A> to IOEither<E, A> by wrapping the value in Right
export default function ioToIOEither<E, A>(io: IO<A>): IOEither<E, A> {
	return () => right(io())
}

//?? [EXAMPLE] ioToIOEither(io(() => 42)) // IOEither(() => Right(42))
//?? [EXAMPLE] runIO(ioToIOEither(randomIO)) // Right(0.123456...)
/*??
 | [EXAMPLE]
 | const userIO = io(() => ({ name: "Alice", age: 30 }))
 | const userIOEither = ioToIOEither(userIO)
 | const validateAge = (user: { age: number }) =>
 |   ioEither(() =>
 |     user.age >= 18 ? right(user) : left("User must be 18+")
 |   )
 | const validatedIO = chainIOEither(validateAge)(userIOEither)
 | runIO(validatedIO) // Right({ name: "Alice", age: 30 })
 |
 | [PRO] Lifts successful IO into IOEither context for integration
 | [PRO] Useful when integrating always-successful IO with error-prone operations
 |
*/
