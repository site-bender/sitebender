import type { IOMaybe } from "../../../types/fp/io/index.ts"
import type { Maybe } from "../../../types/fp/maybe/index.ts"

//++ Lifts a Maybe<A> into IOMaybe<A> context
export default function fromMaybe<A>(maybe: Maybe<A>): IOMaybe<A> {
	return () => maybe
}

//?? [EXAMPLE] fromMaybe(just(42)) // IOMaybe(() => Just(42))
//?? [EXAMPLE] runIO(fromMaybe(nothing())) // Nothing
/*??
 | [EXAMPLE]
 | const validateEmail = (email: string) =>
 |   email.includes("@") ? just(email) : nothing()
 | const validEmailIO = fromMaybe(validateEmail("alice@example.com"))
 | runIO(validEmailIO) // Just("alice@example.com")
 |
 | [PRO] Converts pure Maybe values for composition with IOMaybe operations
 | [PRO] Result deferred until runIO is executed
 |
*/
