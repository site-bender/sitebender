import type { Either } from "../../../types/fp/either/index.ts"
import type { Maybe } from "../../../types/fp/maybe/index.ts"

import left from "../../either/left/index.ts"
import right from "../../either/right/index.ts"
import isNothing from "../isNothing/index.ts"

//++ Converts a Maybe to an Either with a specified error value for Nothing
export default function toEither<E>(getError: () => E) {
	return function toEitherMaybe<A>(maybe: Maybe<A>): Either<E, A> {
		if (isNothing(maybe)) {
			return left(getError())
		}

		return right(maybe.value)
	}
}

//?? [EXAMPLE] toEither(() => "No value")(just(42)) // Right(42)
//?? [EXAMPLE] toEither(() => "No value")(nothing()) // Left("No value")
/*??
 | [EXAMPLE]
 | const requireValue = (field: string) =>
 |   toEither(() => `${field} is required`)
 | requireValue("email")(just("user@example.com"))  // Right("user@example.com")
 | requireValue("email")(nothing())                 // Left("email is required")
 |
 | [PRO] Enables transitioning from optional to explicit error handling
 | [PRO] Lazy error evaluation - error only computed if Nothing
 |
*/
