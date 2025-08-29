import type { IO } from "../../types/fp/io/index.ts"

/**
 * Maps a function over the value inside an IO (Functor)
 *
 * Transforms the eventual result of an IO computation without executing it.
 * This allows you to compose transformations on the result while keeping
 * the computation deferred. The function is applied when the IO is eventually
 * executed with runIO, maintaining referential transparency until that point.
 *
 * @param f - Function to transform the result
 * @param io - IO to transform
 * @returns New IO with transformed result
 * @pure
 * @curried
 * @example
 * ```typescript
 * import { io } from "../io/index.ts"
 * import { runIO } from "../runIO/index.ts"
 *
 * // Basic transformation
 * const randomIO = io(() => Math.random())
 * const scaledIO = map((x: number) => x * 100)(randomIO)
 * runIO(scaledIO)                          // Random number 0-100
 *
 * // String transformations
 * const greetingIO = io(() => "hello")
 * const upperIO = map((s: string) => s.toUpperCase())(greetingIO)
 * runIO(upperIO)                           // "HELLO"
 *
 * // Mathematical operations
 * const numberIO = io(() => 42)
 * const doubledIO = map((x: number) => x * 2)(numberIO)
 * const squaredIO = map((x: number) => x * x)(doubledIO)
 * runIO(squaredIO)                         // 7056
 *
 * // Array transformations
 * const numbersIO = io(() => [1, 2, 3, 4, 5])
 * const evenIO = map((arr: Array<number>) => arr.filter(x => x % 2 === 0))(numbersIO)
 * runIO(evenIO)                            // [2, 4]
 *
 * // Partial application for reusable transformers
 * const addOne = map((x: number) => x + 1)
 * const toString = map((x: number) => x.toString())
 *
 * const numIO = io(() => 41)
 * const incrementedIO = addOne(numIO)
 * const stringifiedIO = toString(incrementedIO)
 * runIO(stringifiedIO)                     // "42"
 * ```
 */
const map = <A, B>(f: (a: A) => B) => (io: IO<A>): IO<B> => () => f(io())

export default map
