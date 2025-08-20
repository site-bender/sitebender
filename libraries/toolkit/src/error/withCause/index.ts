import type { AdaptiveError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

/**
 * Adds the original cause of an error
 * 
 * Enriches an error object with the original error that caused it,
 * preserving the stack trace for debugging. Returns a new immutable error object.
 * 
 * @curried (cause) => (error) => error
 * @param cause - The original error that caused this error
 * @param error - The error to enrich
 * @returns New error with cause and stack information
 * @example
 * ```typescript
 * // Wrap a caught exception
 * try {
 *   somethingDangerous()
 * } catch (err) {
 *   const wrapped = pipe(
 *     createError("process")([data])("Processing failed")(),
 *     withCause(err as Error)
 *   )
 * }
 * 
 * // Chain errors
 * const originalError = new Error("Network timeout")
 * const contextualError = pipe(
 *   createError("fetchUser")([userId])("Could not fetch user data")(),
 *   withCause(originalError)
 * )
 * ```
 */
const withCause = (cause: Error | AdaptiveError) =>
  <TOp extends string, TArgs extends ReadonlyArray<Value>>(
    error: AdaptiveError<TOp, TArgs>
  ): AdaptiveError<TOp, TArgs> => ({
    ...error,
    cause,
    stack: cause instanceof Error ? cause.stack : (cause as AdaptiveError).stack
  })

export default withCause