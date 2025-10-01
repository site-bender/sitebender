import type { Either } from "../../types/fp/either/index.ts"

import doNotation from "../doNotation/index.ts"
import createEitherMonad from "./createEitherMonad/index.ts"

// Re-export commonly used Either functions for convenience in do-notation
export { default as Left } from "../either/left/index.ts"
export { default as Right } from "../either/right/index.ts"
export { default as isLeft } from "../either/isLeft/index.ts"
export { default as isRight } from "../either/isRight/index.ts"
export { default as fromNullable } from "../either/fromNullable/index.ts"
export { default as tryCatch } from "../either/tryCatch/index.ts"

//++ Specialized do-notation for Either monad with error handling
export default function doEither<L, R>(
	genFn: () => Generator<Either<L, unknown>, R, unknown>,
): Either<L, R> {
	return doNotation(createEitherMonad<L>())(genFn) as Either<L, R>
}
