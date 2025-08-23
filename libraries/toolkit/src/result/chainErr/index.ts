import type { Result } from "../../types/fp/result/index.ts"
import chainLeft from "../../either/chainLeft/index.ts"

/**
 * Flat maps over the Err value of a Result
 * 
 * Wrapper around Either's chainLeft with Result-specific naming.
 * Applies a function that returns a Result to Err values, leaving Ok unchanged.
 * 
 * @curried
 * @param fn - Function that returns a new Result
 * @param result - The Result to chain over
 * @returns The Result returned by fn if Err, or the original Ok
 * @example
 * ```typescript
 * const recoverError = (e: string) => 
 *   e === "recoverable" ? ok(0) : err(`Fatal: ${e}`)
 * 
 * chainErr(recoverError)(err("recoverable"))  // ok(0)
 * chainErr(recoverError)(err("unrecoverable"))  // err("Fatal: unrecoverable")
 * chainErr(recoverError)(ok(42))  // ok(42)
 * ```
 */
const chainErr = chainLeft as <E, F, T>(
	fn: (error: E) => Result<T, F>
) => (result: Result<T, E>) => Result<T, F>

export default chainErr