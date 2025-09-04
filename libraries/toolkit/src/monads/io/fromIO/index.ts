import type { IO, IOMaybe } from "../../types/fp/io/index.ts"

import just from "../../maybe/just/index.ts"

/**
 * Converts IO<A> to IOMaybe<A> by wrapping result in Just
 *
 * Lifts a regular IO computation into the IOMaybe context by wrapping
 * its result in a Just value. This is useful when you have an IO that
 * always succeeds but you want to compose it with operations that may
 * fail or return Nothing. The resulting IOMaybe will always contain
 * Just(value) when executed.
 *
 * @param io - IO to convert to IOMaybe
 * @returns IOMaybe that wraps the IO's result in Just
 * @example
 * ```typescript
 * // Convert IO to IOMaybe
 * const numberIO = io(() => 42)
 * const numberMaybeIO = fromIO(numberIO)
 * runIO(numberMaybeIO)                     // Just(42)
 *
 * // Chain with Maybe operations
 * const userIO = io(() => ({ name: "Alice", age: 30 }))
 * const userMaybeIO = fromIO(userIO)
 * const nameIO = mapIOMaybe((u: { name: string }) => u.name)(userMaybeIO)
 * runIO(nameIO)                            // Just("Alice")
 *
 * // Compose with fallible operations
 * const baseIO = io(() => 100)
 * const baseMaybeIO = fromIO(baseIO)
 * const resultIO = chainIOMaybe((n: number) =>
 *   ioMaybe(() => n > 0 ? just(n * 2) : nothing())
 * )(baseMaybeIO)
 * runIO(resultIO)                          // Just(200)
 * ```
 * @pure
 */
const fromIO = <A>(io: IO<A>): IOMaybe<A> => () => just(io())

export default fromIO
