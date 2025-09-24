import type { Either } from "../either/index.ts"
import type { Maybe } from "../maybe/index.ts"

/**
 * IO type representing a deferred computation that may have side effects
 *
 * An IO is simply a thunk (function with no parameters) that when executed
 * will perform some side effect and return a value. The computation is
 * deferred until runIO is called, maintaining referential transparency.
 */
export type IO<A> = () => A

/**
 * IO that may not produce a value (wraps Maybe)
 *
 * Represents a computation that may have side effects and may not
 * produce a result, combining IO with Maybe semantics.
 */
export type IOMaybe<A> = IO<Maybe<A>>

/**
 * IO that may fail with an error (wraps Either)
 *
 * Represents a computation that may have side effects and may fail
 * with an error, combining IO with Either semantics for error handling.
 */
export type IOEither<E, A> = IO<Either<E, A>>
