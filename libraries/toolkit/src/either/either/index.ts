import type { Either } from "../../types/fp/either/index.ts"
import fold from "../fold/index.ts"

/**
 * Pattern matches on an Either value with named handlers
 * 
 * Provides a semantic alias for fold with clearer parameter names.
 * This function extracts a value from an Either by providing separate
 * handlers for Left and Right cases. It's particularly useful when you
 * want to emphasize the pattern matching aspect of the operation rather
 * than the folding/reduction aspect.
 * 
 * @curried (leftHandler) => (rightHandler) => (either) => result
 * @param leftHandler - Function to handle Left (error) values
 * @param rightHandler - Function to handle Right (success) values
 * @param either - The Either to pattern match on
 * @returns The result of applying the appropriate handler
 * @example
 * ```typescript
 * import { left } from "../left/index.ts"
 * import { right } from "../right/index.ts"
 * 
 * // Basic pattern matching
 * const result = either(
 *   (err: string) => `Failed: ${err}`,
 *   (val: number) => `Succeeded: ${val}`
 * )
 * 
 * result(right(42))     // "Succeeded: 42"
 * result(left("oops"))  // "Failed: oops"
 * 
 * // Converting to a common type
 * const toNumber = either(
 *   (err: string) => err.length,    // Convert error to its length
 *   (val: number) => val             // Keep number as-is
 * )
 * 
 * toNumber(right(42))          // 42
 * toNumber(left("error"))      // 5 (length of "error")
 * 
 * // Result type transformation
 * type Result = 
 *   | { type: "error"; message: string }
 *   | { type: "success"; value: number }
 * 
 * const toResult = either(
 *   (err: string): Result => ({ type: "error", message: err }),
 *   (val: number): Result => ({ type: "success", value: val })
 * )
 * 
 * toResult(right(100))
 * // { type: "success", value: 100 }
 * 
 * toResult(left("Not found"))
 * // { type: "error", message: "Not found" }
 * 
 * // Validation result handling
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * 
 * const validateEmail = (email: string): Either<string, string> =>
 *   email.includes("@") 
 *     ? right(email)
 *     : left("Invalid email format")
 * 
 * const processEmail = pipe(
 *   validateEmail("user@example.com"),
 *   either(
 *     error => console.error(`Validation failed: ${error}`),
 *     email => console.log(`Email valid: ${email}`)
 *   )
 * )
 * 
 * // Different return types for each branch
 * const handleUserResult = either(
 *   (error: Error) => {
 *     logError(error)
 *     return null
 *   },
 *   (user: User) => {
 *     cacheUser(user)
 *     return user.id
 *   }
 * )
 * 
 * // React component rendering
 * const renderComponent = either(
 *   (error: string) => <ErrorMessage text={error} />,
 *   (data: Data) => <DataDisplay data={data} />
 * )
 * 
 * // Express.js response handling
 * const sendResponse = (res: Response) => either(
 *   (error: string) => res.status(400).json({ error }),
 *   (data: unknown) => res.status(200).json({ data })
 * )
 * 
 * // Promise creation from Either
 * const toPromise = <E, A>(e: Either<E, A>): Promise<A> =>
 *   either(
 *     (err: E) => Promise.reject(err),
 *     (val: A) => Promise.resolve(val)
 *   )(e)
 * 
 * // Logging with different strategies
 * const logStrategy = either(
 *   (err: string) => logger.error(`[ERROR] ${err}`),
 *   (msg: string) => logger.info(`[INFO] ${msg}`)
 * )
 * 
 * // Converting to nullable
 * const toNullable = <E, A>(e: Either<E, A>): A | null =>
 *   either(
 *     () => null,
 *     (a: A) => a
 *   )(e)
 * 
 * toNullable(right(42))     // 42
 * toNullable(left("error")) // null
 * 
 * // Exit code determination
 * const getExitCode = either(
 *   (err: Error) => {
 *     if (err.message.includes("permission")) return 1
 *     if (err.message.includes("network")) return 2
 *     return 3
 *   },
 *   () => 0  // Success always returns 0
 * )
 * ```
 * 
 * @property Pattern-matching - Explicit branching based on Either tag
 * @property Exhaustive - Forces handling of both cases
 * @property Flexible - Return types can differ between branches
 */
const either = <E, A, B>(
	leftHandler: (e: E) => B
) => (
	rightHandler: (a: A) => B
) => (
	either: Either<E, A>
): B => fold<E, A, B>(leftHandler)(rightHandler)(either)

export default either