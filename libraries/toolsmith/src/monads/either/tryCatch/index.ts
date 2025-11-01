import type { Either } from "../../../types/fp/either/index.ts"

import left from "../left/index.ts"
import right from "../right/index.ts"

//++ Executes a synchronous function and captures thrown exceptions as Left
export default function tryCatch<A>(fn: () => A) {
	return function tryCatchWithError<E>(
		onError: (error: unknown) => E,
	): Either<E, A> {
		//++ [EXCEPTION] try/catch permitted in Toolsmith for performance - provides Either monad exception boundary
		try {
			return right(fn())
		} catch (error) {
			return left(onError(error))
		}
	}
}
