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
 * @example
 * ```typescript
 * import { runIO } from "../runIO/index.ts"
 * import { map } from "../map/index.ts"
 * import { chain } from "../chain/index.ts"
 * 
 * // Basic value lifting
 * const numberIO = of(42)
 * runIO(numberIO)                          // 42
 * 
 * const stringIO = of("Hello, World!")
 * runIO(stringIO)                          // "Hello, World!"
 * 
 * const booleanIO = of(true)
 * runIO(booleanIO)                         // true
 * 
 * // Object lifting
 * const userIO = of({ name: "Alice", age: 30 })
 * runIO(userIO)                            // { name: "Alice", age: 30 }
 * 
 * const arrayIO = of([1, 2, 3, 4, 5])
 * runIO(arrayIO)                           // [1, 2, 3, 4, 5]
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
 * // Default values in error scenarios
 * const defaultConfigIO = of({
 *   theme: "light",
 *   language: "en",
 *   notifications: true
 * })
 * runIO(defaultConfigIO)                   // Default configuration
 * 
 * // Mathematical constants
 * const piIO = of(Math.PI)
 * const doubledPiIO = map((x: number) => x * 2)(piIO)
 * runIO(doubledPiIO)                       // 6.283185307179586
 * 
 * // Type-safe constants
 * type Color = "red" | "green" | "blue"
 * const defaultColorIO = of<Color>("red")
 * runIO(defaultColorIO)                    // "red"
 * 
 * // Building complex values
 * const emptyArrayIO = of<Array<string>>([])
 * const singleItemIO = map((arr: Array<string>) => [...arr, "first"])(emptyArrayIO)
 * runIO(singleItemIO)                      // ["first"]
 * 
 * // Null and undefined handling
 * const nullIO = of(null)
 * const undefinedIO = of(undefined)
 * const defaultedIO = map((val: null) => val ?? "default")(nullIO)
 * runIO(defaultedIO)                       // "default"
 * 
 * // Date objects
 * const specificDateIO = of(new Date("2023-08-20"))
 * const formattedDateIO = map((date: Date) => date.toISOString())(specificDateIO)
 * runIO(formattedDateIO)                   // "2023-08-20T00:00:00.000Z"
 * 
 * // Regular expressions
 * const emailRegexIO = of(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
 * const validateEmailIO = map((regex: RegExp) => (email: string) => regex.test(email))(emailRegexIO)
 * runIO(validateEmailIO)                   // Function that validates emails
 * 
 * // Function values
 * const addOneIO = of((x: number) => x + 1)
 * const appliedIO = map((fn: (x: number) => number) => fn(41))(addOneIO)
 * runIO(appliedIO)                         // 42
 * 
 * // Error objects
 * const errorIO = of(new Error("Something went wrong"))
 * const errorMessageIO = map((err: Error) => err.message)(errorIO)
 * runIO(errorMessageIO)                    // "Something went wrong"
 * 
 * // Complex nested structures
 * const complexIO = of({
 *   user: { id: 1, name: "Alice" },
 *   permissions: ["read", "write"],
 *   metadata: { version: "1.0", lastModified: new Date() }
 * })
 * const userNameIO = map((data: any) => data.user.name)(complexIO)
 * runIO(userNameIO)                        // "Alice"
 * 
 * // Building computation chains
 * const initialValueIO = of(0)
 * const computationIO = chain((start: number) =>
 *   map((x: number) => x + 10)(of(start + 5))
 * )(initialValueIO)
 * runIO(computationIO)                     // 15 (0 + 5 + 10)
 * 
 * // Identity law (Monad law)
 * const valueIO = of("test")
 * const identityChainIO = chain(of)(valueIO)
 * // runIO(valueIO) === runIO(identityChainIO) // Both return "test"
 * 
 * // Map identity law (Functor law)
 * const identity = <T>(x: T) => x
 * const identityMappedIO = map(identity)(valueIO)
 * // runIO(valueIO) === runIO(identityMappedIO) // Both return "test"
 * 
 * // Starting point for effectful computations
 * const seedIO = of(Date.now())
 * const randomIO = chain((seed: number) => 
 *   of(Math.sin(seed) * 1000000 % 1)  // Pseudo-random from seed
 * )(seedIO)
 * runIO(randomIO)                          // Deterministic "random" value
 * 
 * // Configuration defaults
 * const defaultsIO = of({
 *   maxRetries: 3,
 *   timeout: 5000,
 *   baseUrl: "https://api.example.com"
 * })
 * 
 * const mergeConfigIO = (userConfig: Record<string, unknown>) =>
 *   map((defaults: Record<string, unknown>) => ({ ...defaults, ...userConfig }))(defaultsIO)
 * 
 * const finalConfigIO = mergeConfigIO({ timeout: 10000 })
 * runIO(finalConfigIO)                     // Merged configuration
 * ```
 * @property Pure - No side effects, always returns the same value
 * @property Identity - Forms the identity element for chain operations
 * @property Lifting - Bridges pure values into IO context
 * @property Composable - Can be used with all IO operations (map, chain, ap)
 */
const of = <A>(value: A): IO<A> => () => value

export default of