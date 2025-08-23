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
 * import { io } from "../io/index.ts"
 * import { runIO } from "../runIO/index.ts"
 * import { chainIOEither } from "../chainIOEither/index.ts"
 * import { mapIOEither } from "../mapIOEither/index.ts"
 * import { ioEither } from "../ioEither/index.ts"
 * import { right } from "../../either/right/index.ts"
 * import { left } from "../../either/left/index.ts"
 * 
 * // Basic conversion
 * const generateIdIO: IO<string> = io(() => crypto.randomUUID())
 * const idIOEither: IOEither<string, string> = ioToIOEither(generateIdIO)
 * 
 * runIO(idIOEither)  // Right("550e8400-e29b-41d4-a716-446655440000")
 * 
 * // Random number generation
 * const randomIO: IO<number> = io(() => Math.random())
 * const randomIOEither: IOEither<string, number> = ioToIOEither(randomIO)
 * 
 * runIO(randomIOEither)  // Right(0.123456...)
 * 
 * // Current timestamp
 * const nowIO: IO<number> = io(() => Date.now())
 * const nowIOEither: IOEither<string, number> = ioToIOEither(nowIO)
 * 
 * runIO(nowIOEither)  // Right(1692547200000)
 * 
 * // Chaining with validation
 * const generateNumberIO: IO<number> = io(() => Math.random() * 100)
 * 
 * const validateRangeIO = (n: number): IOEither<string, number> =>
 *   ioEither(() => 
 *     n >= 25 && n <= 75 
 *       ? right(n) 
 *       : left(`Number ${n} is out of range [25, 75]`)
 *   )
 * 
 * const processedIO = pipe(
 *   ioToIOEither(generateNumberIO),
 *   chainIOEither(validateRangeIO)
 * )
 * 
 * runIO(processedIO)  // Right(50.123...) or Left("Number ... is out of range")
 * 
 * // Configuration loading
 * const loadConfigIO: IO<object> = io(() => ({
 *   apiUrl: "https://api.example.com",
 *   timeout: 5000,
 *   retries: 3
 * }))
 * 
 * const configIOEither = ioToIOEither(loadConfigIO)
 * 
 * const validateConfigIO = (config: any): IOEither<string, object> =>
 *   ioEither(() => {
 *     if (!config.apiUrl) {
 *       return left("apiUrl is required")
 *     }
 *     if (config.timeout <= 0) {
 *       return left("timeout must be positive")
 *     }
 *     return right(config)
 *   })
 * 
 * const validatedConfigIO = chainIOEither(validateConfigIO)(configIOEither)
 * runIO(validatedConfigIO)  // Right({ apiUrl: "...", timeout: 5000, retries: 3 })
 * 
 * // User processing pipeline
 * interface User {
 *   id: number
 *   name: string
 *   email: string
 * }
 * 
 * const createUserIO: IO<User> = io(() => ({
 *   id: 1,
 *   name: "Alice",
 *   email: "alice@example.com"
 * }))
 * 
 * const validateUserIO = (user: User): IOEither<string, User> =>
 *   ioEither(() => {
 *     if (!user.email.includes("@")) {
 *       return left("Invalid email format")
 *     }
 *     return right(user)
 *   })
 * 
 * const userPipelineIO = pipe(
 *   ioToIOEither(createUserIO),
 *   chainIOEither(validateUserIO)
 * )
 * 
 * runIO(userPipelineIO)  // Right({ id: 1, name: "Alice", email: "alice@example.com" })
 * 
 * // Mathematical operations
 * const computeIO: IO<number> = io(() => {
 *   const a = 10
 *   const b = 20
 *   return a * b
 * })
 * 
 * const computeIOEither = ioToIOEither(computeIO)
 * 
 * const safeDivideIO = (divisor: number) => (n: number): IOEither<string, number> =>
 *   ioEither(() => 
 *     divisor === 0 
 *       ? left("Division by zero") 
 *       : right(n / divisor)
 *   )
 * 
 * const resultIO = chainIOEither(safeDivideIO(10))(computeIOEither)
 * runIO(resultIO)  // Right(20)
 * 
 * // File operations simulation
 * const readFileIO: IO<string> = io(() => "file contents here")
 * 
 * const parseFileIO = (contents: string): IOEither<string, unknown> =>
 *   ioEither(() => {
 *     try {
 *       // Simulate parsing
 *       if (contents.length === 0) {
 *         return left("Empty file")
 *       }
 *       return right({ data: contents })
 *     } catch (error) {
 *       return left(`Parse error: ${error}`)
 *     }
 *   })
 * 
 * const fileProcessingIO = pipe(
 *   ioToIOEither(readFileIO),
 *   chainIOEither(parseFileIO)
 * )
 * 
 * runIO(fileProcessingIO)  // Right({ data: "file contents here" })
 * 
 * // DOM operations (browser example)
 * const getTitleIO: IO<string> = io(() => document.title)
 * const titleIOEither = ioToIOEither(getTitleIO)
 * 
 * const validateTitleIO = (title: string): IOEither<string, string> =>
 *   ioEither(() => 
 *     title.length > 0 && title.length <= 60
 *       ? right(title)
 *       : left("Title must be between 1 and 60 characters")
 *   )
 * 
 * const titleValidationIO = chainIOEither(validateTitleIO)(titleIOEither)
 * runIO(titleValidationIO)  // Right("Page Title") or Left(error)
 * 
 * // LocalStorage operations (browser)
 * const saveDataIO: IO<void> = io(() => {
 *   localStorage.setItem("key", "value")
 * })
 * 
 * const saveIOEither = ioToIOEither(saveDataIO)
 * 
 * const confirmSaveIO = mapIOEither(() => "Data saved successfully")(saveIOEither)
 * runIO(confirmSaveIO)  // Right("Data saved successfully")
 * 
 * // Array generation and processing
 * const generateArrayIO: IO<Array<number>> = io(() => 
 *   Array.from({ length: 10 }, () => Math.random() * 100)
 * )
 * 
 * const arrayIOEither = ioToIOEither(generateArrayIO)
 * 
 * const validateArrayIO = (arr: Array<number>): IOEither<string, Array<number>> =>
 *   ioEither(() => {
 *     if (arr.length === 0) {
 *       return left("Array is empty")
 *     }
 *     if (arr.some(n => n < 0)) {
 *       return left("Array contains negative numbers")
 *     }
 *     return right(arr)
 *   })
 * 
 * const processedArrayIO = chainIOEither(validateArrayIO)(arrayIOEither)
 * runIO(processedArrayIO)  // Right([23.4, 67.8, ...]) or Left(error)
 * 
 * // Timestamp operations
 * const getTimestampIO: IO<Date> = io(() => new Date())
 * const timestampIOEither = ioToIOEither(getTimestampIO)
 * 
 * const validateDateIO = (date: Date): IOEither<string, Date> =>
 *   ioEither(() => {
 *     const now = new Date()
 *     if (date > now) {
 *       return left("Date cannot be in the future")
 *     }
 *     return right(date)
 *   })
 * 
 * const dateValidationIO = chainIOEither(validateDateIO)(timestampIOEither)
 * runIO(dateValidationIO)  // Right(Date object)
 * 
 * // Combining multiple IO sources
 * const io1: IO<string> = io(() => "Hello")
 * const io2: IO<string> = io(() => "World")
 * 
 * const combinedIO = pipe(
 *   ioToIOEither(io1),
 *   chainIOEither((greeting: string) =>
 *     pipe(
 *       ioToIOEither(io2),
 *       mapIOEither((name: string) => `${greeting}, ${name}!`)
 *     )
 *   )
 * )
 * 
 * runIO(combinedIO)  // Right("Hello, World!")
 * 
 * // Complex business logic
 * interface Order {
 *   id: string
 *   items: Array<{ name: string; price: number }>
 *   total: number
 * }
 * 
 * const createOrderIO: IO<Order> = io(() => ({
 *   id: "ORD-123",
 *   items: [
 *     { name: "Widget", price: 10.99 },
 *     { name: "Gadget", price: 15.50 }
 *   ],
 *   total: 26.49
 * }))
 * 
 * const validateOrderIO = (order: Order): IOEither<string, Order> =>
 *   ioEither(() => {
 *     const calculatedTotal = order.items.reduce((sum, item) => sum + item.price, 0)
 *     const epsilon = 0.01
 *     
 *     if (Math.abs(calculatedTotal - order.total) > epsilon) {
 *       return left(`Total mismatch: expected ${calculatedTotal}, got ${order.total}`)
 *     }
 *     
 *     if (order.items.length === 0) {
 *       return left("Order must have at least one item")
 *     }
 *     
 *     return right(order)
 *   })
 * 
 * const orderPipelineIO = pipe(
 *   ioToIOEither(createOrderIO),
 *   chainIOEither(validateOrderIO)
 * )
 * 
 * runIO(orderPipelineIO)  // Right({ id: "ORD-123", ... })
 * 
 * // Sequential IO operations with error handling
 * const step1IO: IO<number> = io(() => 10)
 * const step2IO: IO<number> = io(() => 20)
 * const step3IO: IO<number> = io(() => 30)
 * 
 * const sequenceIO = pipe(
 *   ioToIOEither(step1IO),
 *   chainIOEither((a: number) =>
 *     pipe(
 *       ioToIOEither(step2IO),
 *       chainIOEither((b: number) =>
 *         pipe(
 *           ioToIOEither(step3IO),
 *           mapIOEither((c: number) => ({
 *             sum: a + b + c,
 *             product: a * b * c,
 *             average: (a + b + c) / 3
 *           }))
 *         )
 *       )
 *     )
 *   )
 * )
 * 
 * runIO(sequenceIO)  // Right({ sum: 60, product: 6000, average: 20 })
 * 
 * // Error recovery pattern
 * const riskyIO: IO<number> = io(() => Math.random())
 * 
 * const processWithFallbackIO = pipe(
 *   ioToIOEither(riskyIO),
 *   chainIOEither((n: number) =>
 *     n > 0.5
 *       ? ioEither(() => right(n))
 *       : ioEither(() => left("Value too small"))
 *   ),
 *   mapIOEither((n: number) => n * 100)
 * )
 * 
 * const resultOrDefault = pipe(
 *   processWithFallbackIO,
 *   mapIOEither((n: number) => Math.round(n))
 * )
 * 
 * runIO(resultOrDefault)  // Right(75) or Left("Value too small")
 * 
 * // Authentication flow
 * const getTokenIO: IO<string> = io(() => "auth-token-123")
 * 
 * const validateTokenIO = (token: string): IOEither<string, { userId: number; permissions: Array<string> }> =>
 *   ioEither(() => {
 *     if (!token.startsWith("auth-")) {
 *       return left("Invalid token format")
 *     }
 *     return right({
 *       userId: 1,
 *       permissions: ["read", "write"]
 *     })
 *   })
 * 
 * const authFlowIO = pipe(
 *   ioToIOEither(getTokenIO),
 *   chainIOEither(validateTokenIO)
 * )
 * 
 * runIO(authFlowIO)  // Right({ userId: 1, permissions: ["read", "write"] })
 * ```
 * @property Lifting - Lifts IO into IOEither context with Right wrapper
 * @property Infallible - Always produces Right, never Left
 * @property Composable - Enables integration with IOEither operations
 * @property Type-safe - Preserves type information through conversion
 */
const ioToIOEither = <E, A>(io: IO<A>): IOEither<E, A> => () => right(io())

export default ioToIOEither