import type { IO, IOEither } from "../../types/fp/io/index.ts"

import right from "../../either/right/index.ts"

/**
 * Converts IO<A> to IOEither<E, A> by wrapping the value in Right
 *
 * Takes an IO computation that always succeeds and lifts it into IOEither
 * context by wrapping the result in Right. This is useful when you have an
 * effectful computation that will always produce a value and want to integrate
 * it with other IOEither operations that may fail with errors.
 *
 * @param io - IO computation to convert to IOEither
 * @returns IOEither that wraps the IO result in Right
 * @example
 * ```typescript
 * // Basic conversion
 * const randomIO = io(() => Math.random())
 * const randomIOEither = ioToIOEither(randomIO)
 * runIO(randomIOEither)                    // Right(0.123456...)
 *
 * // Current timestamp
 * const nowIO = io(() => Date.now())
 * const nowIOEither = ioToIOEither(nowIO)
 * runIO(nowIOEither)                       // Right(1692547200000)
 *
 * // Chain with validation
 * const userIO = io(() => ({ name: "Alice", age: 30 }))
 * const userIOEither = ioToIOEither(userIO)
 *
 * const validateAge = (user: { age: number }) =>
 *   ioEither(() =>
 *     user.age >= 18 ? right(user) : left("User must be 18+")
 *   )
 *
 * const validatedIO = chainIOEither(validateAge)(userIOEither)
 * runIO(validatedIO)                       // Right({ name: "Alice", age: 30 })
 * ```
 * @pure
 */
const ioToIOEither = <E, A>(io: IO<A>): IOEither<E, A> => () => right(io())

export default ioToIOEither
