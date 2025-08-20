import type { Result } from "../../types/fp/result/index.ts"
import mapLeft from "../../either/mapLeft/index.ts"

/**
 * Maps a function over the Err value of a Result
 * 
 * Wrapper around Either's mapLeft with Result-specific naming.
 * Applies a transformation to Err values, leaving Ok unchanged.
 * 
 * @curried
 * @param fn - Function to transform the Err value
 * @param result - The Result to map over
 * @returns A new Result with transformed Err value
 * @example
 * ```typescript
 * const addContext = (e: string) => `Error: ${e}`
 * mapErr(addContext)(err("failed"))  // err("Error: failed")
 * mapErr(addContext)(ok(42))  // ok(42)
 * ```
 */
const mapErr = mapLeft as <E, F>(
	fn: (error: E) => F
) => <T>(result: Result<T, E>) => Result<T, F>

export default mapErr