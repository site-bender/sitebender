import type { Either } from "../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"

/**
 * Extracts a value from an Either by providing handlers for both cases
 *
 * Fold is the fundamental pattern matching operation for Either values.
 * It takes two functions - one to handle the Left case (error) and one
 * to handle the Right case (success) - and applies the appropriate function
 * based on the Either's value. This is the primary way to extract values
 * from the Either context and handle both success and failure cases.
 *
 * @curried (onLeft) => (onRight) => (either) => result
 * @param onLeft - Function to handle Left values
 * @param onRight - Function to handle Right values
 * @param either - The Either to extract from
 * @returns The result of applying the appropriate handler
 * @example
 * ```typescript
 * import { left } from "../left/index.ts"
 * import { right } from "../right/index.ts"
 *
 * // Basic extraction
 * const errorHandler = (err: string) => `Error: ${err}`
 * const successHandler = (val: number) => `Success: ${val}`
 *
 * fold(errorHandler)(successHandler)(right(42))     // "Success: 42"
 * fold(errorHandler)(successHandler)(left("oops"))  // "Error: oops"
 *
 * // Converting to a default value
 * const getOrDefault = fold(
 *   () => 0,  // Left case: return default
 *   (x: number) => x  // Right case: return value
 * )
 *
 * getOrDefault(right(42))    // 42
 * getOrDefault(left("err"))  // 0
 *
 * // Unified error handling
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 *
 * const process = (input: Either<string, number>) =>
 *   pipe(
 *     input,
 *     fold(
 *       error => ({ status: "error", message: error }),
 *       value => ({ status: "success", data: value * 2 })
 *     )
 *   )
 *
 * process(right(5))
 * // { status: "success", data: 10 }
 *
 * process(left("Invalid input"))
 * // { status: "error", message: "Invalid input" }
 *
 * // Logging with different levels
 * const logResult = fold(
 *   (err: Error) => console.error("ERROR:", err.message),
 *   (data: unknown) => console.log("SUCCESS:", data)
 * )
 *
 * logResult(left(new Error("Connection failed")))  // logs to console.error
 * logResult(right({ user: "Alice" }))              // logs to console.log
 *
 * // Converting Either to boolean
 * const isValid = fold(
 *   () => false,
 *   () => true
 * )
 *
 * isValid(right("anything"))  // true
 * isValid(left("error"))      // false
 *
 * // Rendering UI based on Either
 * interface User {
 *   id: number
 *   name: string
 * }
 *
 * const renderUser = fold(
 *   (error: string) => `<div class="error">${error}</div>`,
 *   (user: User) => `<div class="user">Welcome, ${user.name}!</div>`
 * )
 *
 * renderUser(right({ id: 1, name: "Alice" }))
 * // '<div class="user">Welcome, Alice!</div>'
 *
 * renderUser(left("User not found"))
 * // '<div class="error">User not found</div>'
 *
 * // HTTP response handling
 * type Response<T> = {
 *   status: number
 *   body: T | { error: string }
 * }
 *
 * const toHttpResponse = <E, A>(either: Either<E, A>): Response<A> =>
 *   fold(
 *     (error: E) => ({
 *       status: 400,
 *       body: { error: String(error) }
 *     }),
 *     (data: A) => ({
 *       status: 200,
 *       body: data
 *     })
 *   )(either)
 *
 * toHttpResponse(right({ id: 1, name: "Product" }))
 * // { status: 200, body: { id: 1, name: "Product" } }
 *
 * toHttpResponse(left("Invalid request"))
 * // { status: 400, body: { error: "Invalid request" } }
 *
 * // Async operations
 * const saveOrLog = fold(
 *   async (err: Error) => {
 *     await logError(err)
 *     return null
 *   },
 *   async (data: unknown) => {
 *     await saveToDatabase(data)
 *     return data
 *   }
 * )
 *
 * // Pattern matching with multiple cases
 * const getMessage = (result: Either<string, number>) =>
 *   fold(
 *     (err: string) => {
 *       switch (err) {
 *         case "TIMEOUT": return "Operation timed out"
 *         case "NETWORK": return "Network error"
 *         default: return `Unknown error: ${err}`
 *       }
 *     },
 *     (val: number) => {
 *       if (val > 100) return "Large value"
 *       if (val > 0) return "Positive value"
 *       return "Non-positive value"
 *     }
 *   )(result)
 * ```
 *
 * @property Catamorphism - Fundamental folding operation for Either
 * @property Total - Handles both Left and Right cases exhaustively
 * @property Terminal - Extracts final value from Either context
 */
const fold = <E, A, B>(
	onLeft: (e: E) => B,
) =>
(
	onRight: (a: A) => B,
) =>
(
	either: Either<E, A>,
): B => {
	if (isLeft(either)) {
		return onLeft(either.left)
	}

	return onRight(either.right)
}

export default fold
