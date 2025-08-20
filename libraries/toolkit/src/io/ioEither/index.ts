import type { IOEither } from "../../types/fp/io/index.ts"
import type { Either } from "../../types/fp/either/index.ts"

/**
 * Creates an IOEither from a thunk returning Either
 * 
 * Wraps a computation that returns an Either in IO context, combining
 * deferred execution with error handling. This allows you to represent
 * computations that may have side effects and may fail with an error,
 * providing both referential transparency and safe error handling.
 * 
 * @param thunk - Function returning Either that will be executed when runIO is called
 * @returns IOEither wrapping the deferred Either computation
 * @example
 * ```typescript
 * import { runIO } from "../runIO/index.ts"
 * import { right } from "../../either/right/index.ts"
 * import { left } from "../../either/left/index.ts"
 * 
 * // Safe JSON parsing with error handling
 * const safeParseIO = (json: string): IOEither<string, unknown> =>
 *   ioEither(() => {
 *     try {
 *       return right(JSON.parse(json))
 *     } catch (error) {
 *       return left(`Parse error: ${error}`)
 *     }
 *   })
 * 
 * runIO(safeParseIO('{"valid": true}'))  // Right({ valid: true })
 * runIO(safeParseIO('invalid json'))     // Left("Parse error: ...")
 * 
 * // File operations (browser localStorage example)
 * const loadConfigIO = (): IOEither<string, object> =>
 *   ioEither(() => {
 *     try {
 *       const stored = localStorage.getItem("config")
 *       if (!stored) {
 *         return left("No config found")
 *       }
 *       const config = JSON.parse(stored)
 *       return right(config)
 *     } catch (error) {
 *       return left(`Config load error: ${error}`)
 *     }
 *   })
 * 
 * runIO(loadConfigIO())  // Right(config) or Left(error message)
 * 
 * // Network request simulation
 * interface User {
 *   id: number
 *   name: string
 *   email: string
 * }
 * 
 * const fetchUserIO = (id: number): IOEither<string, User> =>
 *   ioEither(async () => {
 *     try {
 *       const response = await fetch(`/api/users/${id}`)
 *       if (!response.ok) {
 *         return left(`HTTP ${response.status}: ${response.statusText}`)
 *       }
 *       const user = await response.json()
 *       return right(user)
 *     } catch (error) {
 *       return left(`Network error: ${error}`)
 *     }
 *   })
 * 
 * // Random value generation with validation
 * const randomPositiveIO = (): IOEither<string, number> =>
 *   ioEither(() => {
 *     const value = Math.random()
 *     return value > 0.5 
 *       ? right(value) 
 *       : left("Random value too small")
 *   })
 * 
 * runIO(randomPositiveIO())  // Right(0.789...) or Left("Random value too small")
 * 
 * // Database operations simulation
 * const users = new Map([
 *   [1, { id: 1, name: "Alice", email: "alice@example.com" }],
 *   [2, { id: 2, name: "Bob", email: "bob@example.com" }]
 * ])
 * 
 * const getUserIO = (id: number): IOEither<string, User> =>
 *   ioEither(() => {
 *     const user = users.get(id)
 *     return user 
 *       ? right(user)
 *       : left(`User with id ${id} not found`)
 *   })
 * 
 * runIO(getUserIO(1))  // Right({ id: 1, name: "Alice", ... })
 * runIO(getUserIO(99)) // Left("User with id 99 not found")
 * 
 * // Environment variable access
 * const getEnvVarIO = (name: string): IOEither<string, string> =>
 *   ioEither(() => {
 *     const value = process.env[name]
 *     return value 
 *       ? right(value)
 *       : left(`Environment variable ${name} not set`)
 *   })
 * 
 * runIO(getEnvVarIO("HOME"))     // Right("/Users/...")
 * runIO(getEnvVarIO("NONEXIST")) // Left("Environment variable NONEXIST not set")
 * 
 * // Validation with multiple checks
 * interface CreateUserRequest {
 *   name: string
 *   email: string
 *   age: number
 * }
 * 
 * const validateUserIO = (request: CreateUserRequest): IOEither<string, CreateUserRequest> =>
 *   ioEither(() => {
 *     if (!request.name || request.name.trim().length === 0) {
 *       return left("Name is required")
 *     }
 *     if (!request.email.includes("@")) {
 *       return left("Invalid email format")
 *     }
 *     if (request.age < 0 || request.age > 150) {
 *       return left("Invalid age")
 *     }
 *     return right(request)
 *   })
 * 
 * const validRequest = { name: "Alice", email: "alice@example.com", age: 30 }
 * const invalidRequest = { name: "", email: "invalid-email", age: -5 }
 * 
 * runIO(validateUserIO(validRequest))   // Right({ name: "Alice", ... })
 * runIO(validateUserIO(invalidRequest)) // Left("Name is required")
 * 
 * // Mathematical operations with domain checks
 * const safeDivideIO = (a: number, b: number): IOEither<string, number> =>
 *   ioEither(() => 
 *     b === 0 
 *       ? left("Division by zero")
 *       : right(a / b)
 *   )
 * 
 * const safeSqrtIO = (n: number): IOEither<string, number> =>
 *   ioEither(() =>
 *     n < 0
 *       ? left("Cannot take square root of negative number")
 *       : right(Math.sqrt(n))
 *   )
 * 
 * runIO(safeDivideIO(10, 2))  // Right(5)
 * runIO(safeDivideIO(10, 0))  // Left("Division by zero")
 * runIO(safeSqrtIO(16))       // Right(4)
 * runIO(safeSqrtIO(-4))       // Left("Cannot take square root of negative number")
 * 
 * // Crypto operations
 * const generateIdIO = (): IOEither<string, string> =>
 *   ioEither(() => {
 *     try {
 *       const id = crypto.randomUUID()
 *       return right(id)
 *     } catch (error) {
 *       return left(`ID generation failed: ${error}`)
 *     }
 *   })
 * 
 * runIO(generateIdIO())  // Right("550e8400-e29b-41d4-a716-446655440000")
 * 
 * // Time-based operations
 * const getCurrentTimeIO = (): IOEither<string, Date> =>
 *   ioEither(() => {
 *     try {
 *       return right(new Date())
 *     } catch (error) {
 *       return left(`Time access failed: ${error}`)
 *     }
 *   })
 * 
 * runIO(getCurrentTimeIO())  // Right(2023-08-20T15:30:00.000Z)
 * 
 * // Complex business logic
 * const processOrderIO = (orderId: string): IOEither<string, string> =>
 *   ioEither(() => {
 *     // Simulate business logic with possible failures
 *     if (!orderId.startsWith("ORD-")) {
 *       return left("Invalid order ID format")
 *     }
 *     
 *     const random = Math.random()
 *     if (random < 0.1) {
 *       return left("Payment processing failed")
 *     }
 *     if (random < 0.2) {
 *       return left("Inventory unavailable")
 *     }
 *     
 *     return right(`Order ${orderId} processed successfully`)
 *   })
 * 
 * runIO(processOrderIO("ORD-12345"))  // Right("Order ORD-12345 processed successfully")
 * runIO(processOrderIO("INVALID"))    // Left("Invalid order ID format")
 * ```
 * @property Deferred - Computation is not executed until runIO is called
 * @property Error-safe - Encapsulates both success and failure cases
 * @property Composable - Can be combined with other IOEither operations
 * @property Side-effect-containing - Safely wraps impure computations
 */
const ioEither = <E, A>(thunk: () => Either<E, A>): IOEither<E, A> => thunk

export default ioEither