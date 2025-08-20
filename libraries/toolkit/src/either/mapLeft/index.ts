import type { Either } from "../../types/fp/either/index.ts"
import isLeft from "../isLeft/index.ts"
import left from "../left/index.ts"

/**
 * Maps a function over the Left value of an Either
 * 
 * Applies a transformation function to the error value inside a Left,
 * leaving Right values unchanged. This is useful for transforming or
 * enriching error messages, converting error types, or adding context
 * to failures while keeping the success path unaffected.
 * 
 * @curried (fn) => (either) => result
 * @param fn - Function to transform the Left value
 * @param either - The Either to map over
 * @returns A new Either with transformed Left value or unchanged Right
 * @example
 * ```typescript
 * import { left } from "../left/index.ts"
 * import { right } from "../right/index.ts"
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * 
 * // Basic error transformation
 * const addContext = (err: string) => `Error: ${err}`
 * 
 * mapLeft(addContext)(left("Not found"))  // Left("Error: Not found")
 * mapLeft(addContext)(right(42))          // Right(42) - unchanged
 * 
 * // Error message enrichment
 * const enrichError = (err: string) => ({
 *   message: err,
 *   timestamp: Date.now(),
 *   severity: "error"
 * })
 * 
 * pipe(
 *   left("Connection failed"),
 *   mapLeft(enrichError)
 * )
 * // Left({ message: "Connection failed", timestamp: ..., severity: "error" })
 * 
 * // Converting error types
 * class ValidationError extends Error {
 *   constructor(message: string) {
 *     super(message)
 *     this.name = "ValidationError"
 *   }
 * }
 * 
 * const toValidationError = mapLeft(
 *   (msg: string) => new ValidationError(msg)
 * )
 * 
 * toValidationError(left("Invalid input"))
 * // Left(ValidationError: Invalid input)
 * 
 * toValidationError(right(100))
 * // Right(100)
 * 
 * // Chaining error transformations
 * const pipeline = pipe(
 *   left("timeout"),
 *   mapLeft(err => err.toUpperCase()),
 *   mapLeft(err => `NETWORK_${err}`),
 *   mapLeft(err => ({ code: err, retry: true }))
 * )
 * // Left({ code: "NETWORK_TIMEOUT", retry: true })
 * 
 * // Localizing error messages
 * const localizeError = (locale: string) => mapLeft((err: string) => {
 *   const messages: Record<string, Record<string, string>> = {
 *     en: {
 *       NOT_FOUND: "Resource not found",
 *       UNAUTHORIZED: "Not authorized"
 *     },
 *     es: {
 *       NOT_FOUND: "Recurso no encontrado",
 *       UNAUTHORIZED: "No autorizado"
 *     }
 *   }
 *   return messages[locale]?.[err] || err
 * })
 * 
 * pipe(
 *   left("NOT_FOUND"),
 *   localizeError("es")
 * )
 * // Left("Recurso no encontrado")
 * 
 * // Adding stack traces or debugging info
 * const withStackTrace = mapLeft((err: Error) => ({
 *   message: err.message,
 *   stack: err.stack,
 *   timestamp: new Date().toISOString()
 * }))
 * 
 * pipe(
 *   left(new Error("Database connection failed")),
 *   withStackTrace
 * )
 * // Left({ message: "Database connection failed", stack: "...", timestamp: "..." })
 * 
 * // HTTP error code mapping
 * const toHttpError = mapLeft((err: string) => {
 *   const errorMap: Record<string, number> = {
 *     "NOT_FOUND": 404,
 *     "UNAUTHORIZED": 401,
 *     "FORBIDDEN": 403,
 *     "BAD_REQUEST": 400
 *   }
 *   return {
 *     status: errorMap[err] || 500,
 *     message: err
 *   }
 * })
 * 
 * toHttpError(left("NOT_FOUND"))
 * // Left({ status: 404, message: "NOT_FOUND" })
 * 
 * // Logging errors while transforming
 * const logAndTransform = mapLeft((err: string) => {
 *   console.error(`Error occurred: ${err}`)
 *   return `Logged error: ${err}`
 * })
 * 
 * // Combining with bimap for full transformation
 * import { bimap } from "../bimap/index.ts"
 * 
 * const normalize = pipe(
 *   someEither,
 *   bimap(
 *     err => err.toLowerCase(),  // normalize errors
 *     val => val.toUpperCase()   // normalize values
 *   )
 * )
 * 
 * // Partial application for reusable error handlers
 * const prependError = (prefix: string) =>
 *   mapLeft((err: string) => `${prefix}: ${err}`)
 * 
 * const dbError = prependError("Database")
 * const apiError = prependError("API")
 * const validationError = prependError("Validation")
 * 
 * dbError(left("Connection lost"))        // Left("Database: Connection lost")
 * apiError(left("Rate limit exceeded"))   // Left("API: Rate limit exceeded")
 * ```
 * 
 * @property Functor-law - Satisfies identity and composition for Left values
 * @property Preserves-Right - Right values pass through unchanged
 * @property Error-focused - Specifically targets error transformation
 */
const mapLeft = <E, F>(fn: (e: E) => F) => <A>(
	either: Either<E, A>
): Either<F, A> => {
	if (isLeft(either)) {
		return left(fn(either.left))
	}
	
	return either
}

export default mapLeft