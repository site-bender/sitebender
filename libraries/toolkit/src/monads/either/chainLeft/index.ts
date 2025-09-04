import type { Either } from "../../types/fp/either/index.ts"

import isRight from "../isRight/index.ts"

/**
 * Chains Either-returning functions on the Left value
 *
 * Similar to chain but operates on Left values instead of Right values.
 * This allows for error recovery or transformation chains where you can
 * attempt alternative computations when encountering errors. The function
 * only executes when the Either is a Left, passing Right values through
 * unchanged.
 *
 * @pure
 * @curried
 * @param fn - Function that takes the Left value and returns an Either
 * @param either - The Either to chain from
 * @returns The Either returned by fn, or the original Right
 * @example
 * ```typescript
 * // Basic error recovery
 * const tryRecover = (err: string) =>
 *   err === "recoverable" ? right(0) : left(err)
 * chainLeft(tryRecover)(left("recoverable"))  // Right(0)
 * chainLeft(tryRecover)(left("fatal"))        // Left("fatal")
 * chainLeft(tryRecover)(right(42))            // Right(42)
 *
 * // Chaining multiple recovery strategies
 * const tryCache = (err: string) =>
 *   err === "DB_ERROR" ? right(defaultUser) : left(err)
 * const tryDefault = (err: string) =>
 *   err === "CACHE_MISS" ? right(guestUser) : left(err)
 * pipe(
 *   left("DB_ERROR"),
 *   chainLeft(tryCache),
 *   chainLeft(tryDefault)
 * )
 *
 * // Error message transformation
 * const parseErrorCode = (err: string) => {
 *   const match = err.match(/ERROR_(\d+)/)
 *   return match ? right(parseInt(match[1], 10)) : left(err)
 * }
 * chainLeft(parseErrorCode)(left("ERROR_404"))  // Right(404)
 *
 * // Configuration fallback chain
 * const config = pipe(
 *   loadFromEnv(),
 *   chainLeft(loadFromFile),
 *   chainLeft(useDefaults)
 * )
 *
 * // Validation with recovery
 * const validateEmail = (email: string) =>
 *   email.includes("@") ? right(email) : left("INVALID_EMAIL")
 * const addDomain = (err: string) =>
 *   err === "INVALID_EMAIL" ? right("user@example.com") : left(err)
 * pipe(validateEmail("john"), chainLeft(addDomain))
 * ```
 */
const chainLeft = <E, F, A>(
	fn: (e: E) => Either<F, A>,
) =>
(
	either: Either<E, A>,
): Either<F, A> => {
	if (isRight(either)) {
		return either
	}

	return fn(either.left)
}

export default chainLeft
