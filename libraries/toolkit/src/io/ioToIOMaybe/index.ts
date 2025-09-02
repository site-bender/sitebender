import type { IO, IOMaybe } from "../../types/fp/io/index.ts"

import just from "../../maybe/just/index.ts"

/**
 * Converts IO<A> to IOMaybe<A> by wrapping the value in Just
 *
 * Takes an IO computation that always succeeds and lifts it into IOMaybe
 * context by wrapping the result in Just. This is useful when you have an
 * effectful computation that will always produce a value and want to integrate
 * it with other IOMaybe operations that may not produce values.
 *
 * @param io - IO computation to convert to IOMaybe
 * @returns IOMaybe that wraps the IO result in Just
 * @example
 * ```typescript
 * // Basic conversion
 * const randomIO = io(() => Math.random())
 * const randomIOMaybe = ioToIOMaybe(randomIO)
 * runIO(randomIOMaybe)                     // Just(0.123456...)
 *
 * // Current time
 * const nowIO = io(() => Date.now())
 * const nowIOMaybe = ioToIOMaybe(nowIO)
 * runIO(nowIOMaybe)                        // Just(1692547200000)
 *
 * // Chain with validation
 * const userIO = io(() => ({ name: "Alice", age: 30 }))
 * const userIOMaybe = ioToIOMaybe(userIO)
 *
 * const validateAge = (user: { age: number }) =>
 *   ioMaybe(() => user.age >= 18 ? just(user) : nothing())
 *
 * const validatedIO = chainIOMaybe(validateAge)(userIOMaybe)
 * runIO(validatedIO)                       // Just({ name: "Alice", age: 30 })
 * ```
 * @pure
 */
const ioToIOMaybe = <A>(io: IO<A>): IOMaybe<A> => () => just(io())

export default ioToIOMaybe
