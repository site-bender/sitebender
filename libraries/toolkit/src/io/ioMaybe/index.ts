import type { IOMaybe } from "../../types/fp/io/index.ts"
import type { Maybe } from "../../types/fp/maybe/index.ts"

/**
 * Creates an IOMaybe from a thunk returning Maybe
 *
 * Constructs an IOMaybe computation from a function that returns a Maybe value.
 * This is the primary constructor for IOMaybe when you have effectful computations
 * that may not produce a value. The computation is deferred until runIO is called,
 * maintaining referential transparency while handling potential absence of values.
 *
 * @param thunk - Function returning Maybe that will be executed when runIO is called
 * @returns IOMaybe wrapping the deferred Maybe computation
 * @example
 * ```typescript
 * // Basic Maybe computation
 * const maybeNumberIO = ioMaybe(() => just(42))
 * runIO(maybeNumberIO)                     // Just(42)
 *
 * const nothingIO = ioMaybe(() => nothing())
 * runIO(nothingIO)                         // Nothing
 *
 * // Safe parsing operations
 * const parseIntIO = ioMaybe(() => {
 *   const parsed = parseInt("42", 10)
 *   return isNaN(parsed) ? nothing() : just(parsed)
 * })
 * runIO(parseIntIO)                        // Just(42)
 *
 * // Safe JSON parsing
 * const parseJsonIO = ioMaybe(() => {
 *   try {
 *     return just(JSON.parse('{"valid": true}'))
 *   } catch {
 *     return nothing()
 *   }
 * })
 * runIO(parseJsonIO)                       // Just({ valid: true })
 *
 * // Chain with validation
 * const validateEmailIO = ioMaybe(() => {
 *   const email = "alice@example.com"
 *   return email.includes("@") ? just(email) : nothing()
 * })
 * runIO(validateEmailIO)                   // Just("alice@example.com")
 * ```
 * @impure
 */
const ioMaybe = <A>(thunk: () => Maybe<A>): IOMaybe<A> => thunk

export default ioMaybe
