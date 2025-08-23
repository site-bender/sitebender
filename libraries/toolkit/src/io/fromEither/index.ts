import type { IOEither } from "../../types/fp/io/index.ts"
import type { Either } from "../../types/fp/either/index.ts"

/**
 * Lifts a pure Either into IOEither context
 * 
 * Takes a pure Either value and wraps it in IO context, allowing it to be
 * composed with other IOEither operations. This is useful when you have
 * a pure computation that may fail (Either) and want to integrate it into
 * an IO-based pipeline that deals with side effects and errors.
 * 
 * @param either - Pure Either value to lift into IOEither
 * @returns IOEither wrapping the Either value
 * @example
 * ```typescript
 * import { runIO } from "../runIO/index.ts"
 * import { right } from "../../either/right/index.ts"
 * import { left } from "../../either/left/index.ts"
 * import { chainIOEither } from "../chainIOEither/index.ts"
 * import { mapIOEither } from "../mapIOEither/index.ts"
 * 
 * // Basic lifting
 * const successEither = right(42)
 * const errorEither = left("Something went wrong")
 * 
 * const successIO = fromEither(successEither)
 * const errorIO = fromEither(errorEither)
 * 
 * runIO(successIO)  // Right(42)
 * runIO(errorIO)    // Left("Something went wrong")
 * 
 * // Safe division function
 * const safeDivide = (a: number, b: number): Either<string, number> =>
 *   b === 0 ? left("Division by zero") : right(a / b)
 * 
 * const divisionIO = fromEither(safeDivide(10, 2))
 * runIO(divisionIO)  // Right(5)
 * 
 * const failedDivisionIO = fromEither(safeDivide(10, 0))
 * runIO(failedDivisionIO)  // Left("Division by zero")
 * 
 * // JSON parsing
 * const parseJson = (json: string): Either<string, unknown> => {
 *   try {
 *     return right(JSON.parse(json))
 *   } catch (error) {
 *     return left(`Parse error: ${error}`)
 *   }
 * }
 * 
 * const parseIO = fromEither(parseJson('{"valid": true}'))
 * runIO(parseIO)  // Right({ valid: true })
 * 
 * const parseFailIO = fromEither(parseJson('invalid json'))
 * runIO(parseFailIO)  // Left("Parse error: ...")
 * 
 * // Validation functions
 * interface User {
 *   name: string
 *   email: string
 *   age: number
 * }
 * 
 * const validateName = (name: string): Either<string, string> =>
 *   name.trim().length > 0 ? right(name) : left("Name cannot be empty")
 * 
 * const validateEmail = (email: string): Either<string, string> =>
 *   email.includes("@") ? right(email) : left("Invalid email format")
 * 
 * const validateAge = (age: number): Either<string, number> =>
 *   age >= 0 && age <= 150 ? right(age) : left("Age must be between 0 and 150")
 * 
 * // Compose pure validations with IO operations
 * const nameIO = fromEither(validateName("Alice"))
 * const emailIO = fromEither(validateEmail("alice@example.com"))
 * const ageIO = fromEither(validateAge(30))
 * 
 * runIO(nameIO)   // Right("Alice")
 * runIO(emailIO)  // Right("alice@example.com")
 * runIO(ageIO)    // Right(30)
 * 
 * // Building user validation pipeline
 * const createUser = (name: string, email: string, age: number): IOEither<string, User> =>
 *   pipe(
 *     fromEither(validateName(name)),
 *     chainIOEither(validName => 
 *       pipe(
 *         fromEither(validateEmail(email)),
 *         chainIOEither(validEmail =>
 *           pipe(
 *             fromEither(validateAge(age)),
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
 * runIO(createUser("Alice", "alice@example.com", 30))  // Right({ name: "Alice", ... })
 * runIO(createUser("", "invalid-email", -5))           // Left("Name cannot be empty")
 * 
 * // Mathematical computations
 * const sqrt = (n: number): Either<string, number> =>
 *   n < 0 ? left("Cannot take square root of negative number") : right(Math.sqrt(n))
 * 
 * const sqrtIO = fromEither(sqrt(16))
 * runIO(sqrtIO)  // Right(4)
 * 
 * const negSqrtIO = fromEither(sqrt(-4))
 * runIO(negSqrtIO)  // Left("Cannot take square root of negative number")
 * 
 * // Array operations
 * const headOf = <T>(arr: Array<T>): Either<string, T> =>
 *   arr.length > 0 ? right(arr[0]) : left("Array is empty")
 * 
 * const nonEmptyArrayIO = fromEither(headOf([1, 2, 3]))
 * const emptyArrayIO = fromEither(headOf([]))
 * 
 * runIO(nonEmptyArrayIO)  // Right(1)
 * runIO(emptyArrayIO)     // Left("Array is empty")
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
 *   if (typeof config.timeout !== "number") {
 *     return left("timeout must be a number")
 *   }
 *   
 *   if (typeof config.retries !== "number") {
 *     return left("retries must be a number")
 *   }
 *   
 *   return right({
 *     apiUrl: config.apiUrl,
 *     timeout: config.timeout,
 *     retries: config.retries
 *   })
 * }
 * 
 * const validConfig = {
 *   apiUrl: "https://api.example.com",
 *   timeout: 5000,
 *   retries: 3
 * }
 * 
 * const invalidConfig = {
 *   apiUrl: "https://api.example.com",
 *   timeout: "not a number"
 * }
 * 
 * const configIO = fromEither(parseConfig(validConfig))
 * const invalidConfigIO = fromEither(parseConfig(invalidConfig))
 * 
 * runIO(configIO)        // Right({ apiUrl: "...", timeout: 5000, retries: 3 })
 * runIO(invalidConfigIO) // Left("timeout must be a number")
 * 
 * // Combining with effectful operations
 * const loadConfigFileIO = (): IOEither<string, string> =>
 *   ioEither(() => {
 *     // Simulated file loading
 *     return right('{"apiUrl": "https://api.example.com", "timeout": 5000, "retries": 3}')
 *   })
 * 
 * const parseJsonEither = (json: string): Either<string, unknown> => {
 *   try {
 *     return right(JSON.parse(json))
 *   } catch (error) {
 *     return left(`JSON parse error: ${error}`)
 *   }
 * }
 * 
 * const appConfigIO = pipe(
 *   loadConfigFileIO(),
 *   chainIOEither(content => fromEither(parseJsonEither(content))),
 *   chainIOEither(obj => fromEither(parseConfig(obj)))
 * )
 * 
 * runIO(appConfigIO)  // Right({ apiUrl: "...", timeout: 5000, retries: 3 })
 * 
 * // Error handling with multiple steps
 * const step1 = (input: string): Either<string, number> => {
 *   const num = parseInt(input, 10)
 *   return isNaN(num) ? left("Invalid number") : right(num)
 * }
 * 
 * const step2 = (n: number): Either<string, number> =>
 *   n % 2 === 0 ? right(n) : left("Number must be even")
 * 
 * const step3 = (n: number): Either<string, number> =>
 *   n > 0 ? right(n) : left("Number must be positive")
 * 
 * const processNumberIO = (input: string): IOEither<string, number> =>
 *   pipe(
 *     fromEither(step1(input)),
 *     chainIOEither(n => fromEither(step2(n))),
 *     chainIOEither(n => fromEither(step3(n)))
 *   )
 * 
 * runIO(processNumberIO("42"))    // Right(42)
 * runIO(processNumberIO("abc"))   // Left("Invalid number")
 * runIO(processNumberIO("3"))     // Left("Number must be even")
 * runIO(processNumberIO("-2"))    // Left("Number must be positive")
 * 
 * // Domain-specific validation
 * type EmailAddress = string
 * type UserId = number
 * 
 * const createEmailAddress = (input: string): Either<string, EmailAddress> => {
 *   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 *   return emailRegex.test(input) 
 *     ? right(input as EmailAddress)
 *     : left("Invalid email address format")
 * }
 * 
 * const createUserId = (input: number): Either<string, UserId> =>
 *   input > 0 
 *     ? right(input as UserId)
 *     : left("User ID must be positive")
 * 
 * const emailIO = fromEither(createEmailAddress("user@example.com"))
 * const userIdIO = fromEither(createUserId(123))
 * 
 * runIO(emailIO)   // Right("user@example.com")
 * runIO(userIdIO)  // Right(123)
 * ```
 * @property Pure-to-Effectful - Lifts pure Either values into IO context
 * @property Identity - No computation performed, just context change
 * @property Composable - Integrates seamlessly with other IOEither operations
 * @property Type-preserving - Maintains Either semantics within IO
 */
const fromEither = <E, A>(either: Either<E, A>): IOEither<E, A> => () => either

export default fromEither