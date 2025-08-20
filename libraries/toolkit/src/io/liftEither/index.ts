import type { IOEither } from "../../types/fp/io/index.ts"
import type { Either } from "../../types/fp/either/index.ts"

/**
 * Lifts a pure function returning Either into IOEither
 * 
 * Takes a pure function that returns an Either value and lifts it into the
 * IOEither context, allowing it to be composed with other IO operations.
 * This is useful when you have a pure computation that may fail (Either)
 * and want to integrate it into an IO-based pipeline dealing with side
 * effects and error handling.
 * 
 * @param f - Pure function that returns an Either
 * @returns IOEither that wraps the function execution
 * @example
 * ```typescript
 * import { runIO } from "../runIO/index.ts"
 * import { right } from "../../either/right/index.ts"
 * import { left } from "../../either/left/index.ts"
 * import { chainIOEither } from "../chainIOEither/index.ts"
 * import { mapIOEither } from "../mapIOEither/index.ts"
 * 
 * // Pure validation function
 * const validateAge = (age: number): Either<string, number> =>
 *   age >= 0 && age <= 150 
 *     ? right(age)
 *     : left("Age must be between 0 and 150")
 * 
 * // Lift into IOEither context
 * const validateAgeIO = (age: number): IOEither<string, number> =>
 *   liftEither(() => validateAge(age))
 * 
 * runIO(validateAgeIO(30))   // Right(30)
 * runIO(validateAgeIO(-5))   // Left("Age must be between 0 and 150")
 * runIO(validateAgeIO(200))  // Left("Age must be between 0 and 150")
 * 
 * // JSON parsing with error handling
 * const parseJson = (json: string): Either<string, unknown> => {
 *   try {
 *     return right(JSON.parse(json))
 *   } catch (error) {
 *     return left(`Parse error: ${error}`)
 *   }
 * }
 * 
 * const parseJsonIO = (json: string): IOEither<string, unknown> =>
 *   liftEither(() => parseJson(json))
 * 
 * runIO(parseJsonIO('{"valid": true}'))  // Right({ valid: true })
 * runIO(parseJsonIO('invalid json'))     // Left("Parse error: ...")
 * 
 * // Mathematical operations
 * const safeDivide = (a: number, b: number): Either<string, number> =>
 *   b === 0 ? left("Division by zero") : right(a / b)
 * 
 * const safeSqrt = (n: number): Either<string, number> =>
 *   n < 0 ? left("Cannot take sqrt of negative") : right(Math.sqrt(n))
 * 
 * const divideIO = (a: number, b: number): IOEither<string, number> =>
 *   liftEither(() => safeDivide(a, b))
 * 
 * const sqrtIO = (n: number): IOEither<string, number> =>
 *   liftEither(() => safeSqrt(n))
 * 
 * runIO(divideIO(10, 2))  // Right(5)
 * runIO(divideIO(10, 0))  // Left("Division by zero")
 * runIO(sqrtIO(16))       // Right(4)
 * runIO(sqrtIO(-4))       // Left("Cannot take sqrt of negative")
 * 
 * // Email validation
 * const validateEmail = (email: string): Either<string, string> => {
 *   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 *   return emailRegex.test(email)
 *     ? right(email)
 *     : left("Invalid email format")
 * }
 * 
 * const validateEmailIO = (email: string): IOEither<string, string> =>
 *   liftEither(() => validateEmail(email))
 * 
 * runIO(validateEmailIO("alice@example.com"))  // Right("alice@example.com")
 * runIO(validateEmailIO("invalid-email"))      // Left("Invalid email format")
 * 
 * // User validation pipeline
 * interface User {
 *   name: string
 *   email: string
 *   age: number
 * }
 * 
 * const validateName = (name: string): Either<string, string> =>
 *   name.trim().length > 0 
 *     ? right(name.trim())
 *     : left("Name cannot be empty")
 * 
 * const createUser = (name: string, email: string, age: number): IOEither<string, User> =>
 *   pipe(
 *     liftEither(() => validateName(name)),
 *     chainIOEither(validName =>
 *       pipe(
 *         liftEither(() => validateEmail(email)),
 *         chainIOEither(validEmail =>
 *           pipe(
 *             liftEither(() => validateAge(age)),
 *             mapIOEither(validAge => ({
 *               name: validName,
 *               email: validEmail,
 *               age: validAge
 *             }))
 *           )
 *         )
 *       )
 *     )
 *   )
 * 
 * runIO(createUser("Alice", "alice@example.com", 30))
 * // Right({ name: "Alice", email: "alice@example.com", age: 30 })
 * 
 * runIO(createUser("", "invalid", -5))
 * // Left("Name cannot be empty")
 * 
 * // Configuration parsing
 * interface Config {
 *   apiUrl: string
 *   timeout: number
 *   retries: number
 * }
 * 
 * const parseConfig = (obj: unknown): Either<string, Config> => {
 *   if (typeof obj !== "object" || obj === null) {
 *     return left("Config must be an object")
 *   }
 *   
 *   const config = obj as any
 *   
 *   if (typeof config.apiUrl !== "string") {
 *     return left("apiUrl must be a string")
 *   }
 *   
 *   if (typeof config.timeout !== "number" || config.timeout <= 0) {
 *     return left("timeout must be a positive number")
 *   }
 *   
 *   if (typeof config.retries !== "number" || config.retries < 0) {
 *     return left("retries must be a non-negative number")
 *   }
 *   
 *   return right({
 *     apiUrl: config.apiUrl,
 *     timeout: config.timeout,
 *     retries: config.retries
 *   })
 * }
 * 
 * const parseConfigIO = (obj: unknown): IOEither<string, Config> =>
 *   liftEither(() => parseConfig(obj))
 * 
 * const validConfig = {
 *   apiUrl: "https://api.example.com",
 *   timeout: 5000,
 *   retries: 3
 * }
 * 
 * runIO(parseConfigIO(validConfig))
 * // Right({ apiUrl: "https://api.example.com", timeout: 5000, retries: 3 })
 * 
 * runIO(parseConfigIO({ apiUrl: "test", timeout: -1 }))
 * // Left("timeout must be a positive number")
 * 
 * // Array operations
 * const safeHead = <T>(arr: Array<T>): Either<string, T> =>
 *   arr.length > 0 ? right(arr[0]) : left("Array is empty")
 * 
 * const safeLast = <T>(arr: Array<T>): Either<string, T> =>
 *   arr.length > 0 ? right(arr[arr.length - 1]) : left("Array is empty")
 * 
 * const headIO = <T>(arr: Array<T>): IOEither<string, T> =>
 *   liftEither(() => safeHead(arr))
 * 
 * const lastIO = <T>(arr: Array<T>): IOEither<string, T> =>
 *   liftEither(() => safeLast(arr))
 * 
 * runIO(headIO([1, 2, 3]))  // Right(1)
 * runIO(lastIO([1, 2, 3]))  // Right(3)
 * runIO(headIO([]))         // Left("Array is empty")
 * 
 * // String parsing
 * const parseInteger = (s: string): Either<string, number> => {
 *   const n = parseInt(s, 10)
 *   return isNaN(n) 
 *     ? left(`"${s}" is not a valid integer`)
 *     : right(n)
 * }
 * 
 * const parseFloat = (s: string): Either<string, number> => {
 *   const n = parseFloat(s)
 *   return isNaN(n)
 *     ? left(`"${s}" is not a valid number`)
 *     : right(n)
 * }
 * 
 * const parseIntIO = (s: string): IOEither<string, number> =>
 *   liftEither(() => parseInteger(s))
 * 
 * const parseFloatIO = (s: string): IOEither<string, number> =>
 *   liftEither(() => parseFloat(s))
 * 
 * runIO(parseIntIO("42"))      // Right(42)
 * runIO(parseFloatIO("3.14"))  // Right(3.14)
 * runIO(parseIntIO("abc"))     // Left('"abc" is not a valid integer')
 * 
 * // URL validation
 * const validateUrl = (url: string): Either<string, URL> => {
 *   try {
 *     return right(new URL(url))
 *   } catch (error) {
 *     return left(`Invalid URL: ${error}`)
 *   }
 * }
 * 
 * const validateUrlIO = (url: string): IOEither<string, URL> =>
 *   liftEither(() => validateUrl(url))
 * 
 * runIO(validateUrlIO("https://example.com"))  // Right(URL object)
 * runIO(validateUrlIO("not-a-url"))           // Left("Invalid URL: ...")
 * 
 * // Business logic validation
 * interface Product {
 *   id: string
 *   name: string
 *   price: number
 *   quantity: number
 * }
 * 
 * const validateProduct = (product: unknown): Either<string, Product> => {
 *   if (typeof product !== "object" || product === null) {
 *     return left("Product must be an object")
 *   }
 *   
 *   const p = product as any
 *   
 *   if (typeof p.id !== "string" || p.id.length === 0) {
 *     return left("Product ID is required")
 *   }
 *   
 *   if (typeof p.name !== "string" || p.name.length === 0) {
 *     return left("Product name is required")
 *   }
 *   
 *   if (typeof p.price !== "number" || p.price < 0) {
 *     return left("Product price must be non-negative")
 *   }
 *   
 *   if (typeof p.quantity !== "number" || p.quantity < 0 || !Number.isInteger(p.quantity)) {
 *     return left("Product quantity must be a non-negative integer")
 *   }
 *   
 *   return right({
 *     id: p.id,
 *     name: p.name,
 *     price: p.price,
 *     quantity: p.quantity
 *   })
 * }
 * 
 * const validateProductIO = (product: unknown): IOEither<string, Product> =>
 *   liftEither(() => validateProduct(product))
 * 
 * const validProduct = {
 *   id: "PROD-123",
 *   name: "Widget",
 *   price: 19.99,
 *   quantity: 100
 * }
 * 
 * runIO(validateProductIO(validProduct))
 * // Right({ id: "PROD-123", name: "Widget", price: 19.99, quantity: 100 })
 * 
 * runIO(validateProductIO({ id: "", name: "Test", price: -10, quantity: 5 }))
 * // Left("Product ID is required")
 * 
 * // Chaining with effectful operations
 * import { ioEither } from "../ioEither/index.ts"
 * 
 * const loadDataIO = (): IOEither<string, string> =>
 *   ioEither(() => right('{"value": 42}'))
 * 
 * const processDataIO = pipe(
 *   loadDataIO(),
 *   chainIOEither(data => liftEither(() => parseJson(data))),
 *   mapIOEither((obj: any) => obj.value * 2)
 * )
 * 
 * runIO(processDataIO)  // Right(84)
 * ```
 * @property Pure-to-Effectful - Lifts pure Either computations into IO context
 * @property Composable - Integrates with other IOEither operations
 * @property Type-safe - Preserves Either semantics within IO
 * @property Lazy - Computation is deferred until runIO is called
 */
const liftEither = <E, A>(f: () => Either<E, A>): IOEither<E, A> => () => f()

export default liftEither