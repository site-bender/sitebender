import type { IO } from "../../types/fp/io/index.ts"

/**
 * Flat maps a function that returns an IO (Monad bind)
 *
 * Allows sequencing of IO computations where the second computation depends
 * on the result of the first. This is the monadic bind operation that enables
 * composing dependent effectful computations while keeping them deferred.
 * The function prevents nested IO<IO<A>> structures by flattening them.
 *
 * @curried (f) => (io) => chainedIO
 * @param f - Function that takes a value and returns an IO
 * @param io - IO to chain from
 * @returns New IO representing the sequenced computation
 * @example
 * ```typescript
 * // Sequential dependent computations
 * const getUserIdIO = io(() => "user-123")
 * const fetchUserIO = (id: string) => io(() => `User data for ${id}`)
 * const userDataIO = chain(fetchUserIO)(getUserIdIO)
 * runIO(userDataIO)                        // "User data for user-123"
 *
 * // Conditional branching
 * const randomIO = io(() => Math.random())
 * const branchIO = (x: number) =>
 *   x > 0.5 ? io(() => "High") : io(() => "Low")
 * const resultIO = chain(branchIO)(randomIO)
 * runIO(resultIO)                          // "High" or "Low"
 *
 * // Chaining multiple operations
 * const step1 = io(() => 10)
 * const step2 = (n: number) => io(() => n * 2)
 * const step3 = (n: number) => io(() => n + 5)
 * const chainedIO = chain((x: number) => chain(step3)(step2(x)))(step1)
 * runIO(chainedIO)                        // 25
 * ```
 * @pure
 * @curried
 */
const chain = <A, B>(f: (a: A) => IO<B>) => (io: IO<A>): IO<B> => () =>
	f(io())()

export default chain
