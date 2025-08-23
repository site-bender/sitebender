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
 * import { io } from "../io/index.ts"
 * import { runIO } from "../runIO/index.ts"
 * import { map } from "../map/index.ts"
 * 
 * // Basic function application
 * const addIO = io(() => (x: number) => (y: number) => x + y)
 * const xIO = io(() => 10)
 * const yIO = io(() => 20)
 * 
 * const addXIO = ap(addIO)(xIO)            // IO<(y: number) => number>
 * const resultIO = ap(addXIO)(yIO)         // IO<number>
 * runIO(resultIO)                          // 30
 * 
 * // String concatenation
 * const concatIO = io(() => (a: string) => (b: string) => a + b)
 * const helloIO = io(() => "Hello, ")
 * const nameIO = io(() => "World!")
 * 
 * const greetingIO = ap(ap(concatIO)(helloIO))(nameIO)
 * runIO(greetingIO)                        // "Hello, World!"
 * 
 * // Object creation from multiple IOs
 * const createUserIO = io(() => 
 *   (name: string) => (email: string) => (age: number) => ({
 *     name, email, age, createdAt: Date.now()
 *   })
 * )
 * const nameIO2 = io(() => "Alice")
 * const emailIO = io(() => "alice@example.com")
 * const ageIO = io(() => 30)
 * 
 * const userIO = ap(ap(ap(createUserIO)(nameIO2))(emailIO))(ageIO)
 * runIO(userIO)                            // User object with current timestamp
 * 
 * // Mathematical operations
 * const multiplyIO = io(() => (x: number) => (y: number) => x * y)
 * const baseIO = io(() => Math.random())
 * const scaleIO = io(() => 100)
 * 
 * const scaledRandomIO = ap(ap(multiplyIO)(baseIO))(scaleIO)
 * runIO(scaledRandomIO)                    // Random number 0-100
 * 
 * // Configuration-based operations
 * const configProcessorIO = io(() => 
 *   (apiUrl: string) => (timeout: number) => (retries: number) => ({
 *     apiUrl, timeout, retries, 
 *     fullUrl: `${apiUrl}?timeout=${timeout}&retries=${retries}`
 *   })
 * )
 * const urlIO = io(() => "https://api.example.com")
 * const timeoutIO = io(() => 5000)
 * const retriesIO = io(() => 3)
 * 
 * const configIO = ap(ap(ap(configProcessorIO)(urlIO))(timeoutIO))(retriesIO)
 * runIO(configIO)                          // Complete config object
 * 
 * // Error handling with validation
 * const validateEmailIO = io(() => 
 *   (email: string) => email.includes("@") ? email : "invalid@example.com"
 * )
 * const userEmailIO = io(() => "user@domain.com")
 * const validatedEmailIO = ap(validateEmailIO)(userEmailIO)
 * runIO(validatedEmailIO)                  // "user@domain.com"
 * 
 * // Dynamic function creation
 * const createFormatterIO = io(() => {
 *   const precision = Math.floor(Math.random() * 3) + 1
 *   return (num: number) => num.toFixed(precision)
 * })
 * const numberIO = io(() => Math.PI)
 * const formattedIO = ap(createFormatterIO)(numberIO)
 * runIO(formattedIO)                       // "3.1", "3.14", or "3.142"
 * 
 * // Combining with map for partial application
 * const curriedAdd = (x: number) => (y: number) => (z: number) => x + y + z
 * const addIO2 = io(() => curriedAdd)
 * const val1IO = io(() => 1)
 * const val2IO = io(() => 2)
 * const val3IO = io(() => 3)
 * 
 * const sumIO = ap(ap(ap(addIO2)(val1IO))(val2IO))(val3IO)
 * runIO(sumIO)                             // 6
 * 
 * // Array operations
 * const mapArrayIO = io(() => 
 *   (fn: (x: number) => number) => (arr: Array<number>) => arr.map(fn)
 * )
 * const doubleIO = io(() => (x: number) => x * 2)
 * const numbersIO = io(() => [1, 2, 3, 4, 5])
 * 
 * const doubledArrayIO = ap(ap(mapArrayIO)(doubleIO))(numbersIO)
 * runIO(doubledArrayIO)                    // [2, 4, 6, 8, 10]
 * 
 * // Date formatting with timezone
 * const formatDateIO = io(() => 
 *   (locale: string) => (date: Date) => 
 *     date.toLocaleDateString(locale)
 * )
 * const localeIO = io(() => "en-US")
 * const dateIO = io(() => new Date())
 * 
 * const formattedDateIO = ap(ap(formatDateIO)(localeIO))(dateIO)
 * runIO(formattedDateIO)                   // "8/20/2023" (current date)
 * 
 * // URL construction
 * const buildUrlIO = io(() => 
 *   (base: string) => (path: string) => (params: string) => 
 *     `${base}/${path}?${params}`
 * )
 * const baseUrlIO = io(() => "https://api.example.com")
 * const pathIO = io(() => "users")
 * const paramsIO = io(() => "limit=10&offset=0")
 * 
 * const fullUrlIO = ap(ap(ap(buildUrlIO)(baseUrlIO))(pathIO))(paramsIO)
 * runIO(fullUrlIO)                         // "https://api.example.com/users?limit=10&offset=0"
 * 
 * // Helper for applying 2-argument functions
 * const ap2 = <A, B, C>(f: IO<(a: A) => (b: B) => C>) => 
 *   (a: IO<A>) => (b: IO<B>) => ap(ap(f)(a))(b)
 * 
 * const subtractIO = io(() => (x: number) => (y: number) => x - y)
 * const minuendIO = io(() => 100)
 * const subtrahendIO = io(() => 42)
 * 
 * const differenceIO = ap2(subtractIO)(minuendIO)(subtrahendIO)
 * runIO(differenceIO)                      // 58
 * ```
 * @property Applicative - Enables function application in IO context
 * @property Parallel - Arguments can be computed independently
 * @property Composable - Can be chained with other applicative operations
 * @property Type-safe - Maintains type safety through function application
 */
const ap = <A, B>(ioF: IO<(a: A) => B>) => (ioA: IO<A>): IO<B> => () => ioF()(ioA())

export default ap