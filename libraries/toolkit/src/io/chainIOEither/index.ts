import type { IOEither } from "../../types/fp/io/index.ts"

/**
 * Flat maps a function returning IOEither over the success value of an IOEither
 * 
 * This is the monadic bind operation for IOEither, allowing you to chain
 * computations that may have side effects and may fail. If the IOEither contains
 * a Right value, the function is applied to produce a new IOEither. If it contains
 * a Left value (error), the function is skipped and the error is preserved.
 * This enables building complex pipelines of potentially failing effectful
 * computations while handling errors gracefully.
 * 
 * @curried (f) => (io) => chainedIO
 * @param f - Function that takes a success value and returns a new IOEither
 * @param io - IOEither to chain from
 * @returns New IOEither representing the chained computation
 * @example
 * ```typescript
 * import { runIO } from "../runIO/index.ts"
 * import { ioEither } from "../ioEither/index.ts"
 * import { right } from "../../either/right/index.ts"
 * import { left } from "../../either/left/index.ts"
 * 
 * // Basic chaining
 * const getUserIO = (id: number): IOEither<string, { id: number; name: string }> =>
 *   ioEither(() => 
 *     id === 1 
 *       ? right({ id: 1, name: "Alice" })
 *       : left("User not found")
 *   )
 * 
 * const getProfileIO = (user: { id: number; name: string }): IOEither<string, string> =>
 *   ioEither(() => right(`Profile for ${user.name}`))
 * 
 * const userProfileIO = chainIOEither(getProfileIO)(getUserIO(1))
 * runIO(userProfileIO)  // Right("Profile for Alice")
 * 
 * const failedProfileIO = chainIOEither(getProfileIO)(getUserIO(99))
 * runIO(failedProfileIO)  // Left("User not found")
 * 
 * // Database operations chain
 * interface User {
 *   id: number
 *   name: string
 *   email: string
 * }
 * 
 * interface Order {
 *   id: string
 *   userId: number
 *   items: Array<string>
 *   total: number
 * }
 * 
 * const fetchUserIO = (id: number): IOEither<string, User> =>
 *   ioEither(() => {
 *     const users = new Map([
 *       [1, { id: 1, name: "Alice", email: "alice@example.com" }],
 *       [2, { id: 2, name: "Bob", email: "bob@example.com" }]
 *     ])
 *     const user = users.get(id)
 *     return user ? right(user) : left(`User ${id} not found`)
 *   })
 * 
 * const fetchOrdersIO = (user: User): IOEither<string, Array<Order>> =>
 *   ioEither(() => {
 *     const orders = new Map([
 *       [1, [{ id: "ORD-1", userId: 1, items: ["widget"], total: 10.99 }]],
 *       [2, [{ id: "ORD-2", userId: 2, items: ["gadget", "tool"], total: 25.50 }]]
 *     ])
 *     const userOrders = orders.get(user.id)
 *     return userOrders ? right(userOrders) : left(`No orders for user ${user.id}`)
 *   })
 * 
 * const userOrdersIO = chainIOEither(fetchOrdersIO)(fetchUserIO(1))
 * runIO(userOrdersIO)  // Right([{ id: "ORD-1", userId: 1, ... }])
 * 
 * // File processing chain
 * const readFileIO = (path: string): IOEither<string, string> =>
 *   ioEither(() => {
 *     try {
 *       // Simulated file read
 *       if (path === "/config.json") {
 *         return right('{"apiUrl": "https://api.example.com", "timeout": 5000}')
 *       }
 *       return left(`File not found: ${path}`)
 *     } catch (error) {
 *       return left(`Read error: ${error}`)
 *     }
 *   })
 * 
 * const parseJsonIO = (content: string): IOEither<string, unknown> =>
 *   ioEither(() => {
 *     try {
 *       return right(JSON.parse(content))
 *     } catch (error) {
 *       return left(`Parse error: ${error}`)
 *     }
 *   })
 * 
 * const configIO = chainIOEither(parseJsonIO)(readFileIO("/config.json"))
 * runIO(configIO)  // Right({ apiUrl: "https://api.example.com", timeout: 5000 })
 * 
 * // Validation chain
 * interface CreateUserRequest {
 *   name: string
 *   email: string
 *   age: number
 * }
 * 
 * const validateNameIO = (request: CreateUserRequest): IOEither<string, CreateUserRequest> =>
 *   ioEither(() =>
 *     request.name && request.name.trim().length > 0
 *       ? right(request)
 *       : left("Name is required")
 *   )
 * 
 * const validateEmailIO = (request: CreateUserRequest): IOEither<string, CreateUserRequest> =>
 *   ioEither(() =>
 *     request.email.includes("@")
 *       ? right(request)
 *       : left("Invalid email format")
 *   )
 * 
 * const validateAgeIO = (request: CreateUserRequest): IOEither<string, CreateUserRequest> =>
 *   ioEither(() =>
 *     request.age >= 0 && request.age <= 150
 *       ? right(request)
 *       : left("Invalid age")
 *   )
 * 
 * const validateUserIO = (request: CreateUserRequest): IOEither<string, CreateUserRequest> =>
 *   pipe(
 *     ioEither(() => right(request)),
 *     chainIOEither(validateNameIO),
 *     chainIOEither(validateEmailIO),
 *     chainIOEither(validateAgeIO)
 *   )
 * 
 * const validRequest = { name: "Alice", email: "alice@example.com", age: 30 }
 * const invalidRequest = { name: "", email: "invalid", age: -5 }
 * 
 * runIO(validateUserIO(validRequest))    // Right({ name: "Alice", ... })
 * runIO(validateUserIO(invalidRequest))  // Left("Name is required")
 * 
 * // Mathematical operations chain
 * const safeDivideIO = (a: number, b: number): IOEither<string, number> =>
 *   ioEither(() =>
 *     b === 0 ? left("Division by zero") : right(a / b)
 *   )
 * 
 * const safeSqrtIO = (n: number): IOEither<string, number> =>
 *   ioEither(() =>
 *     n < 0 ? left("Cannot take sqrt of negative") : right(Math.sqrt(n))
 *   )
 * 
 * const mathChainIO = (x: number): IOEither<string, number> =>
 *   pipe(
 *     ioEither(() => right(x)),
 *     chainIOEither((n: number) => safeDivideIO(100, n)),
 *     chainIOEither(safeSqrtIO)
 *   )
 * 
 * runIO(mathChainIO(4))   // Right(5) - 100/4 = 25, sqrt(25) = 5
 * runIO(mathChainIO(0))   // Left("Division by zero")
 * runIO(mathChainIO(-4))  // Right(sqrt of negative) -> Left("Cannot take sqrt of negative")
 * 
 * // Network request chain
 * const fetchDataIO = (url: string): IOEither<string, Response> =>
 *   ioEither(async () => {
 *     try {
 *       const response = await fetch(url)
 *       return response.ok 
 *         ? right(response)
 *         : left(`HTTP ${response.status}`)
 *     } catch (error) {
 *       return left(`Network error: ${error}`)
 *     }
 *   })
 * 
 * const parseResponseIO = (response: Response): IOEither<string, unknown> =>
 *   ioEither(async () => {
 *     try {
 *       const data = await response.json()
 *       return right(data)
 *     } catch (error) {
 *       return left(`JSON parse error: ${error}`)
 *     }
 *   })
 * 
 * const apiCallIO = (url: string): IOEither<string, unknown> =>
 *   chainIOEither(parseResponseIO)(fetchDataIO(url))
 * 
 * // Authentication chain
 * const validateTokenIO = (token: string): IOEither<string, { userId: number }> =>
 *   ioEither(() => {
 *     // Simulated token validation
 *     if (token === "valid-token") {
 *       return right({ userId: 1 })
 *     }
 *     return left("Invalid token")
 *   })
 * 
 * const checkPermissionsIO = (auth: { userId: number }): IOEither<string, { userId: number; permissions: Array<string> }> =>
 *   ioEither(() => {
 *     const permissions = auth.userId === 1 ? ["read", "write"] : ["read"]
 *     return right({ ...auth, permissions })
 *   })
 * 
 * const authorizeIO = (token: string): IOEither<string, { userId: number; permissions: Array<string> }> =>
 *   chainIOEither(checkPermissionsIO)(validateTokenIO(token))
 * 
 * runIO(authorizeIO("valid-token"))    // Right({ userId: 1, permissions: ["read", "write"] })
 * runIO(authorizeIO("invalid-token"))  // Left("Invalid token")
 * 
 * // Error propagation
 * const step1IO = ioEither(() => left("Step 1 failed"))
 * const step2IO = (value: any): IOEither<string, any> =>
 *   ioEither(() => right(`Step 2 with ${value}`))
 * const step3IO = (value: any): IOEither<string, any> =>
 *   ioEither(() => right(`Step 3 with ${value}`))
 * 
 * const pipelineIO = pipe(
 *   step1IO,
 *   chainIOEither(step2IO),  // Skipped due to error
 *   chainIOEither(step3IO)   // Also skipped
 * )
 * 
 * runIO(pipelineIO)  // Left("Step 1 failed")
 * 
 * // Conditional chains
 * const processDataIO = (data: { type: string; value: any }): IOEither<string, string> =>
 *   ioEither(() => {
 *     switch (data.type) {
 *       case "number":
 *         return right(`Processed number: ${data.value * 2}`)
 *       case "string":
 *         return right(`Processed string: ${data.value.toUpperCase()}`)
 *       default:
 *         return left(`Unknown type: ${data.type}`)
 *     }
 *   })
 * 
 * const inputIO = ioEither(() => right({ type: "number", value: 21 }))
 * const resultIO = chainIOEither(processDataIO)(inputIO)
 * runIO(resultIO)  // Right("Processed number: 42")
 * ```
 * @property Monadic - Enables sequential composition of IOEither computations
 * @property Error-short-circuiting - Stops execution on first error
 * @property Lazy - Chained computation is deferred until runIO is called
 * @property Composable - Can be nested and combined with other operations
 */
const chainIOEither = <E, A, B>(f: (a: A) => IOEither<E, B>) => 
	(io: IOEither<E, A>): IOEither<E, B> => 
		() => {
			const either = io()
			return either._tag === "Right" ? f(either.right)() : either
		}

export default chainIOEither