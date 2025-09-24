import type { ArchitectError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

//++ Adds the original cause of an error, preserving the stack trace for debugging
export default function withCause(cause: Error | ArchitectError) {
	return function enrichError<
		TOp extends string,
		TArgs extends ReadonlyArray<Value>,
	>(
		error: ArchitectError<TOp, TArgs>,
	): ArchitectError<TOp, TArgs> {
		return {
			...error,
			cause,
			stack: cause instanceof Error
				? cause.stack
				: (cause as ArchitectError).stack,
		}
	}
}

/*??
 | [EXAMPLE] Wrap a caught exception:
 | try {
 |   somethingDangerous()
 | } catch (err) {
 |   const wrapped = pipe(
 |     createError("process")([data])("Processing failed")(),
 |     withCause(err as Error)
 |   )
 | }
 |
 | [EXAMPLE] Chain errors:
 | const originalError = new Error("Network timeout")
 | const contextualError = pipe(
 |   createError("fetchUser")([userId])("Could not fetch user data")(),
 |   withCause(originalError)
 | )
 */
