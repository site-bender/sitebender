import type { Either } from "../either/index.ts"
import type { Maybe } from "../maybe/index.ts"
import type { Result } from "../result/index.ts"

export type IO<A> = () => A

export type IOMaybe<A> = IO<Maybe<A>>

export type IOEither<E, A> = IO<Either<E, A>>

export type IOResult<T, E> = IO<Result<E, T>>

export type AsyncIOResult<T, E> = () => Promise<Result<E, T>>
