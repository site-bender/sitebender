import type { AdaptiveError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

import pipeError from "../pipeError/index.ts"
import withCause from "../withCause/index.ts"

/**
 * Converts a caught exception into an AdaptiveError
 *
 * Safely converts any thrown value into a properly typed AdaptiveError,
 * preserving the original error as the cause and extracting its message.
 *
 * @curried (operation) => (args) => (exception) => error
 * @param operation - The operation that threw
 * @param args - Arguments passed to the operation
 * @param exception - The caught exception (any thrown value)
 * @returns AdaptiveError with exception details
 * @example
 * ```typescript
 * // In a catch block
 * try {
 *   return mapUnsafe(fn)(array)
 * } catch (err) {
 *   return left(fromException("map")([fn, array])(err))
 * }
 *
 * // With additional context
 * try {
 *   JSON.parse(text)
 * } catch (err) {
 *   const error = pipe(
 *     fromException("parse")([text])(err),
 *     withSuggestion("Ensure JSON is valid"),
 *     withFailedArg(0)("json")
 *   )
 *   return left(error)
 * }
 *
 * // Partial application
 * const mapException = fromException("map")
 * catch (err) {
 *   return left(mapException([fn, data])(err))
 * }
 * ```
 */
const fromException =
	<TOp extends string>(operation: TOp) =>
	<TArgs extends ReadonlyArray<Value>>(args: TArgs) =>
	(exception: unknown): AdaptiveError<TOp, TArgs> => {
		const err = exception instanceof Error
			? exception
			: new Error(String(exception))

		return pipeError(operation)(args)(
			`${operation} threw an exception: ${err.message}`,
		)(
			(error) => ({ ...error, code: "EXCEPTION_THROWN" } as typeof error),
			withCause(err),
		)
	}

export default fromException
