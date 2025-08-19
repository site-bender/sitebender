import type { Either } from "../../../types/fp/either/index.ts"
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
 * @curried (fn) => (either) => result
 * @param fn - Function that takes the Left value and returns an Either
 * @param either - The Either to chain from
 * @returns The Either returned by fn, or the original Right
 * @example
 * ```typescript
 * import { left } from "../left/index.ts"
 * import { right } from "../right/index.ts"
 * import { pipe } from "../../simple/combinator/pipe/index.ts"
 * 
 * // Basic error recovery
 * const tryRecover = (err: string): Either<string, number> =>
 *   err === "recoverable" 
 *     ? right(0)  // Recover with default value
 *     : left(err) // Keep the error
 * 
 * chainLeft(tryRecover)(left("recoverable"))  // Right(0)
 * chainLeft(tryRecover)(left("fatal"))        // Left("fatal")
 * chainLeft(tryRecover)(right(42))            // Right(42) - unchanged
 * 
 * // Fallback chain for multiple recovery strategies
 * const tryCache = (err: string): Either<string, User> =>
 *   err === "DB_ERROR" && cache.has("user")
 *     ? right(cache.get("user"))
 *     : left(err)
 * 
 * const tryDefault = (err: string): Either<string, User> =>
 *   err === "DB_ERROR" || err === "CACHE_MISS"
 *     ? right({ id: 0, name: "Guest" })
 *     : left(err)
 * 
 * pipe(
 *   left("DB_ERROR"),
 *   chainLeft(tryCache),      // Try cache first
 *   chainLeft(tryDefault)     // Fall back to default
 * )
 * // Right({ id: 0, name: "Guest" })
 * 
 * // Error message transformation with potential recovery
 * const parseErrorCode = (err: string): Either<string, number> => {
 *   const match = err.match(/ERROR_(\\d+)/)
 *   return match 
 *     ? right(parseInt(match[1], 10))
 *     : left(`Unparseable error: ${err}`)
 * }
 * 
 * chainLeft(parseErrorCode)(left("ERROR_404"))    // Right(404)
 * chainLeft(parseErrorCode)(left("UNKNOWN"))      // Left("Unparseable error: UNKNOWN")
 * 
 * // Retry logic with different strategies
 * let retryCount = 0
 * 
 * const retryWithBackoff = (err: string): Either<string, Response> => {
 *   if (err === "TIMEOUT" && retryCount < 3) {
 *     retryCount++
 *     // Simulate retry
 *     return retryCount === 3 
 *       ? right({ status: 200, data: "Success" })
 *       : left("TIMEOUT")
 *   }
 *   return left(err)
 * }
 * 
 * // Configuration fallback chain
 * const loadFromEnv = (): Either<string, Config> =>
 *   process.env.CONFIG 
 *     ? right(JSON.parse(process.env.CONFIG))
 *     : left("ENV_NOT_SET")
 * 
 * const loadFromFile = (err: string): Either<string, Config> =>
 *   err === "ENV_NOT_SET"
 *     ? fs.existsSync("./config.json")
 *       ? right(JSON.parse(fs.readFileSync("./config.json", "utf8")))
 *       : left("FILE_NOT_FOUND")
 *     : left(err)
 * 
 * const useDefaults = (err: string): Either<string, Config> =>
 *   err === "ENV_NOT_SET" || err === "FILE_NOT_FOUND"
 *     ? right({ apiUrl: "http://localhost", timeout: 5000 })
 *     : left(err)
 * 
 * const config = pipe(
 *   loadFromEnv(),
 *   chainLeft(loadFromFile),
 *   chainLeft(useDefaults)
 * )
 * 
 * // Validation error recovery
 * const validateEmail = (email: string): Either<string, string> =>
 *   email.includes("@") ? right(email) : left("INVALID_EMAIL")
 * 
 * const tryAddDomain = (err: string) => (username: string): Either<string, string> =>
 *   err === "INVALID_EMAIL" && !username.includes("@")
 *     ? right(`${username}@example.com`)
 *     : left(err)
 * 
 * pipe(
 *   validateEmail("john"),
 *   chainLeft(err => tryAddDomain(err)("john"))
 * )
 * // Right("john@example.com")
 * 
 * // API fallback endpoints
 * const tryPrimaryApi = (): Either<string, Data> =>
 *   // Attempt primary API...
 *   left("PRIMARY_FAILED")
 * 
 * const trySecondaryApi = (err: string): Either<string, Data> =>
 *   err === "PRIMARY_FAILED"
 *     ? // Attempt secondary API...
 *       left("SECONDARY_FAILED")
 *     : left(err)
 * 
 * const tryCachedData = (err: string): Either<string, Data> =>
 *   err.includes("FAILED")
 *     ? right(getCachedData())
 *     : left(err)
 * 
 * const data = pipe(
 *   tryPrimaryApi(),
 *   chainLeft(trySecondaryApi),
 *   chainLeft(tryCachedData)
 * )
 * 
 * // Error enrichment before giving up
 * const enrichError = (err: string): Either<ErrorDetails, never> =>
 *   left({
 *     message: err,
 *     timestamp: Date.now(),
 *     stack: new Error().stack,
 *     context: getCurrentContext()
 *   })
 * 
 * pipe(
 *   someOperation(),
 *   chainLeft(tryRecover),
 *   chainLeft(enrichError)  // Only enriches if recovery failed
 * )
 * ```
 * 
 * @property Recovery - Enables error recovery strategies
 * @property Chaining - Multiple recovery attempts can be chained
 * @property Preserves-Right - Success values pass through unchanged
 */
const chainLeft = <E, F, A>(
	fn: (e: E) => Either<F, A>
) => (
	either: Either<E, A>
): Either<F, A> => {
	if (isRight(either)) {
		return either
	}
	
	return fn(either.left)
}

export default chainLeft