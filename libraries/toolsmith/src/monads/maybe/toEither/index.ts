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
