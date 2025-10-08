import type { Either } from "../either/index.ts"
import type { Maybe } from "../maybe/index.ts"

export type IO<A> = () => A

export type IOMaybe<A> = IO<Maybe<A>>

export type IOEither<E, A> = IO<Either<E, A>>
