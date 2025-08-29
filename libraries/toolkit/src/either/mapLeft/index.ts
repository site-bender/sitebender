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
 * @pure
 * @curried
 * @param fn - Function to transform the Left value
 * @param either - The Either to map over
 * @returns A new Either with transformed Left value or unchanged Right
 * @example
 * ```typescript
 * // Basic error transformation
 * const addContext = (err: string) => `Error: ${err}`
 * mapLeft(addContext)(left("Not found"))  // Left("Error: Not found")
 * mapLeft(addContext)(right(42))          // Right(42)
 *
 * // Error message enrichment
 * const enrichError = (err: string) => ({
 *   message: err,
 *   timestamp: Date.now(),
 *   severity: "error"
 * })
 * pipe(
 *   left("Connection failed"),
 *   mapLeft(enrichError)
 * ) // Left({ message: "Connection failed", timestamp: ..., severity: "error" })
 *
 * // Converting error types
 * const toValidationError = mapLeft(
 *   (msg: string) => new ValidationError(msg)
 * )
 * toValidationError(left("Invalid input"))  // Left(ValidationError: Invalid input)
 * toValidationError(right(100))             // Right(100)
 *
 * // Chaining error transformations
 * const pipeline = pipe(
 *   left("timeout"),
 *   mapLeft(err => err.toUpperCase()),
 *   mapLeft(err => `NETWORK_${err}`),
 *   mapLeft(err => ({ code: err, retry: true }))
 * ) // Left({ code: "NETWORK_TIMEOUT", retry: true })
 *
 * // HTTP error code mapping
 * const toHttpError = mapLeft((err: string) => ({
 *   status: err === "NOT_FOUND" ? 404 : 500,
 *   message: err
 * }))
 * toHttpError(left("NOT_FOUND"))  // Left({ status: 404, message: "NOT_FOUND" })
 * ```
 *
 */
const mapLeft = <E, F>(fn: (e: E) => F) =>
<A>(
	either: Either<E, A>,
): Either<F, A> => {
	if (isLeft(either)) {
		return left(fn(either.left))
	}

	return either
}

export default mapLeft
