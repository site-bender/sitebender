import type { Either } from "../either/index.ts"
import type { Maybe } from "../maybe/index.ts"
import type { Result } from "../result/index.ts"
import type { Validation } from "../validation/index.ts"

//++ IO monad represents a deferred computation that performs side effects when executed
export type Io<A> = () => A

//++ IO that returns a Maybe (optional value with side effects)
export type IoMaybe<A> = Io<Maybe<A>>

//++ Either represents branching logic where BOTH left and right are valid outcomes.
//++ It is NOT for error handling - use Result (fail-fast) or Validation (accumulation).
//++ Example: IoEither<CachedData, FreshData> - both sides are successful outcomes.
export type IoEither<L, R> = Io<Either<L, R>>

//++ Result for fail-fast error handling (sequential operations)
//++ Error on LEFT, value on RIGHT
export type IoResult<E, T> = Io<Result<E, T>>

//++ Validation for error accumulation (parallel/tree operations)
//++ Error on LEFT, value on RIGHT
export type IoValidation<E, A> = Io<Validation<E, A>>

//++ Async IO that returns a Result (Promise-based fail-fast error handling)
//++ Error on LEFT, value on RIGHT
export type AsyncIoResult<E, T> = () => Promise<Result<E, T>>

//++ Async IO that returns a Validation (Promise-based error accumulation)
//++ Error on LEFT, value on RIGHT
export type AsyncIoValidation<E, A> = () => Promise<Validation<E, A>>

//++ Async IO that returns a Maybe (Promise-based optional value)
export type AsyncIoMaybe<A> = () => Promise<Maybe<A>>

//++ Async IO that returns an Either (Promise-based branching)
//++ Both left and right are valid outcomes - NOT for errors
export type AsyncIoEither<L, R> = () => Promise<Either<L, R>>
