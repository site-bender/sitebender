import type { IO } from "../../types/fp/io/index.ts"

/**
 * Maps a function over the value inside an IO (Functor)
 *
 * Transforms the eventual result of an IO computation without executing it.
 * This allows you to compose transformations on the result while keeping
 * the computation deferred. The function is applied when the IO is eventually
 * executed with runIO, maintaining referential transparency until that point.
 *
 * @curried (f) => (io) => mappedIO
 * @param f - Function to transform the result
 * @param io - IO to transform
 * @returns New IO with transformed result
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
 * // Object transformations
 * const userDataIO = io(() => ({ name: "Alice", age: 30 }))
 * const nameIO = map((user: { name: string; age: number }) => user.name)(userDataIO)
 * runIO(nameIO)                            // "Alice"
 *
 * // Mathematical operations
 * const numberIO = io(() => 42)
 * const doubledIO = map((x: number) => x * 2)(numberIO)
 * const squaredIO = map((x: number) => x * x)(doubledIO)
 * runIO(squaredIO)                         // 7056 (42 * 2 * 2 * 2)
 *
 * // Date/time formatting
 * const timeIO = io(() => Date.now())
 * const formattedIO = map((ms: number) => new Date(ms).toISOString())(timeIO)
 * runIO(formattedIO)                       // "2023-08-20T15:30:00.000Z"
 *
 * // JSON processing
 * const configIO = io(() => localStorage.getItem("config") || "{}")
 * const parsedIO = map((json: string) => JSON.parse(json))(configIO)
 * runIO(parsedIO)                          // Parsed config object
 *
 * // Array transformations
 * const numbersIO = io(() => [1, 2, 3, 4, 5])
 * const evenIO = map((arr: Array<number>) => arr.filter(x => x % 2 === 0))(numbersIO)
 * runIO(evenIO)                            // [2, 4]
 *
 * // Error-safe transformations
 * const safeParseIO = io(() => {
 *   try {
 *     return JSON.parse('{"valid": true}')
 *   } catch {
 *     return null
 *   }
 * })
 * const defaultedIO = map((result: unknown) => result || { valid: false })(safeParseIO)
 * runIO(defaultedIO)                       // { valid: true }
 *
 * // Chaining transformations
 * const idIO = io(() => crypto.randomUUID())
 * const processedIO = map((id: string) =>
 *   `ID-${id.toUpperCase().replace(/-/g, "")}`
 * )(idIO)
 * runIO(processedIO)                       // "ID-550E8400E29B41D4A716446655440000"
 *
 * // Type conversions
 * const stringNumberIO = io(() => "42")
 * const numberIO2 = map((s: string) => parseInt(s, 10))(stringNumberIO)
 * runIO(numberIO2)                         // 42
 *
 * // Complex object creation
 * const userIO = io(() => "alice@example.com")
 * const userObjectIO = map((email: string) => ({
 *   email,
 *   domain: email.split("@")[1],
 *   username: email.split("@")[0],
 *   createdAt: Date.now()
 * }))(userIO)
 * runIO(userObjectIO)                      // Complete user object
 *
 * // Composition with other operations
 * const compose = <A, B, C>(f: (b: B) => C) => (g: (a: A) => B) => (a: A) => f(g(a))
 * const addTen = (x: number) => x + 10
 * const multiplyTwo = (x: number) => x * 2
 * const transform = compose(addTen)(multiplyTwo)
 *
 * const baseIO = io(() => 5)
 * const transformedIO = map(transform)(baseIO)
 * runIO(transformedIO)                     // 20 (5 * 2 + 10)
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
 * @property Functor - Preserves structure while transforming contents
 * @property Lazy - Transformation is deferred until runIO
 * @property Composable - Can be chained with other map operations
 * @property Type-safe - Maintains type information through transformation
 */
const map = <A, B>(f: (a: A) => B) => (io: IO<A>): IO<B> => () => f(io())

export default map
