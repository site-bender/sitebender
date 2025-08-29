import type { IOMaybe } from "../../types/fp/io/index.ts"
import type { Maybe } from "../../types/fp/maybe/index.ts"

/**
 * Lifts a Maybe<A> into IOMaybe<A> context
 *
 * Converts a pure Maybe value into an IOMaybe by wrapping it in a thunk.
 * This is useful when you have a Maybe value that you want to compose
 * with other IOMaybe operations. The Maybe is evaluated immediately when
 * the function is called, but the result is deferred until runIO is executed.
 *
 * @param maybe - Maybe value to lift into IOMaybe
 * @returns IOMaybe that returns the Maybe when executed
 * @example
 * ```typescript
 * // Lift Maybe values into IOMaybe
 * const justValue = just(42)
 * const justIO = fromMaybe(justValue)
 * runIO(justIO)                            // Just(42)
 *
 * const nothingValue = nothing()
 * const nothingIO = fromMaybe(nothingValue)
 * runIO(nothingIO)                         // Nothing
 *
 * // Compose with IOMaybe operations
 * const baseValueIO = fromMaybe(just(10))
 * const doubledIO = mapIOMaybe((x: number) => x * 2)(baseValueIO)
 * runIO(doubledIO)                         // Just(20)
 *
 * // Pure validation results
 * const validateEmail = (email: string) =>
 *   email.includes("@") ? just(email) : nothing()
 *
 * const validEmailIO = fromMaybe(validateEmail("alice@example.com"))
 * runIO(validEmailIO)                      // Just("alice@example.com")
 * ```
 * @pure
 */
const fromMaybe = <A>(maybe: Maybe<A>): IOMaybe<A> => () => maybe

export default fromMaybe
