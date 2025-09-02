import type { Either } from "../../types/fp/either/index.ts"
import type { IOEither } from "../../types/fp/io/index.ts"

/**
 * Creates an IOEither from a thunk returning Either
 *
 * Wraps a computation that returns an Either in IO context, combining
 * deferred execution with error handling. This allows you to represent
 * computations that may have side effects and may fail with an error,
 * providing both referential transparency and safe error handling.
 *
 * @param thunk - Function returning Either that will be executed when runIO is called
 * @returns IOEither wrapping the deferred Either computation
 * @example
 * ```typescript
 * // Safe JSON parsing
 * const safeParseIO = (json: string) =>
 *   ioEither(() => {
 *     try {
 *       return right(JSON.parse(json))
 *     } catch (error) {
 *       return left(`Parse error: ${error}`)
 *     }
 *   })
 *
 * runIO(safeParseIO('{"valid": true}'))  // Right({ valid: true })
 * runIO(safeParseIO('invalid'))          // Left("Parse error: ...")
 *
 * // Validation with error handling
 * const validateEmailIO = (email: string) =>
 *   ioEither(() =>
 *     email.includes("@")
 *       ? right(email)
 *       : left("Invalid email format")
 *   )
 *
 * runIO(validateEmailIO("alice@example.com"))  // Right("alice@example.com")
 * runIO(validateEmailIO("invalid"))            // Left("Invalid email format")
 *
 * // Safe division
 * const safeDivideIO = (a: number, b: number) =>
 *   ioEither(() =>
 *     b === 0 ? left("Division by zero") : right(a / b)
 *   )
 *
 * runIO(safeDivideIO(10, 2))  // Right(5)
 * runIO(safeDivideIO(10, 0))  // Left("Division by zero")
 * ```
 * @impure
 */
const ioEither = <E, A>(thunk: () => Either<E, A>): IOEither<E, A> => thunk

export default ioEither
