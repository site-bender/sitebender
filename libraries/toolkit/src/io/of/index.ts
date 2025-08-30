import type { IO } from "../../types/fp/io/index.ts"

/**
 * Lifts a pure value into IO context
 *
 * Creates an IO that simply returns the given value when executed. This is
 * the minimal way to wrap a pure value in IO context, useful for starting
 * IO computations or mixing pure values with effectful operations. The
 * resulting IO has no side effects but maintains the IO interface for
 * composition with other IO operations.
 *
 * @param value - Pure value to lift into IO
 * @returns IO that returns the value when executed
 * @pure
 * @example
 * ```typescript
 * import runIO from "../runIO/index.ts"
 * import map from "../map/index.ts"
 * import chain from "../chain/index.ts"
 *
 * // Basic value lifting
 * const numberIO = of(42)
 * runIO(numberIO)                          // 42
 *
 * const stringIO = of("Hello, World!")
 * runIO(stringIO)                          // "Hello, World!"
 *
 * // Object lifting
 * const userIO = of({ name: "Alice", age: 30 })
 * runIO(userIO)                            // { name: "Alice", age: 30 }
 *
 * // Starting point for IO chains
 * const configIO = of({ apiUrl: "https://api.example.com", timeout: 5000 })
 * const processedIO = map((config: { apiUrl: string; timeout: number }) =>
 *   `${config.apiUrl}?timeout=${config.timeout}`
 * )(configIO)
 * runIO(processedIO)                       // "https://api.example.com?timeout=5000"
 *
 * // Combining pure and effectful operations
 * const baseUrlIO = of("https://api.example.com")
 * const fullUrlIO = chain((baseUrl: string) =>
 *   of(`${baseUrl}/users/42`)
 * )(baseUrlIO)
 * runIO(fullUrlIO)                         // "https://api.example.com/users/42"
 *
 * // Mathematical constants
 * const piIO = of(Math.PI)
 * const doubledPiIO = map((x: number) => x * 2)(piIO)
 * runIO(doubledPiIO)                       // 6.283185307179586
 *
 * // Building computation chains
 * const initialValueIO = of(0)
 * const computationIO = chain((start: number) =>
 *   map((x: number) => x + 10)(of(start + 5))
 * )(initialValueIO)
 * runIO(computationIO)                     // 15 (0 + 5 + 10)
 * ```
 */
const of = <A>(value: A): IO<A> => () => value

export default of
