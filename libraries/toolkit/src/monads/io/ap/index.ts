import type { IO } from "../../types/fp/io/index.ts"

/**
 * Applies an IO function to an IO value (Applicative)
 *
 * Takes an IO containing a function and an IO containing a value, and returns
 * an IO that will apply the function to the value when executed. This enables
 * applying functions with multiple parameters to multiple IO values in a
 * controlled way, maintaining the deferred execution semantics.
 *
 * @curried (ioF) => (ioA) => appliedIO
 * @param ioF - IO containing a function
 * @param ioA - IO containing a value
 * @returns IO that applies the function to the value
 * @example
 * ```typescript
 * // Basic function application
 * const addIO = io(() => (x: number) => (y: number) => x + y)
 * const xIO = io(() => 10)
 * const yIO = io(() => 20)
 * const resultIO = ap(ap(addIO)(xIO))(yIO)
 * runIO(resultIO)                          // 30
 *
 * // Multiple parameter application
 * const createUserIO = io(() =>
 *   (name: string) => (email: string) => ({ name, email })
 * )
 * const nameIO = io(() => "Alice")
 * const emailIO = io(() => "alice@example.com")
 * const userIO = ap(ap(createUserIO)(nameIO))(emailIO)
 * runIO(userIO)                            // { name: "Alice", email: "alice@example.com" }
 *
 * // Composing with other IO operations
 * const multiplyIO = io(() => (x: number) => x * 2)
 * const randomIO = io(() => Math.random() * 100)
 * const doubledRandomIO = ap(multiplyIO)(randomIO)
 * runIO(doubledRandomIO)                  // Random number 0-200
 * ```
 * @pure
 * @curried
 */
const ap = <A, B>(ioF: IO<(a: A) => B>) => (ioA: IO<A>): IO<B> => () =>
	ioF()(ioA())

export default ap
