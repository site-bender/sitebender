import type { EngineError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

import pipeError from "../pipeError/index.ts"
import withCause from "../withCause/index.ts"

//++ Converts a caught exception into an EngineError, preserving the original error as the cause
export default function fromException<TOp extends string>(operation: TOp) {
	return function withArguments<TArgs extends ReadonlyArray<Value>>(args: TArgs) {
		return function withException(exception: unknown): EngineError<TOp, TArgs> {
			const err = exception instanceof Error
				? exception
				: new Error(String(exception))

			return pipeError(operation)(args)(
				`${operation} threw an exception: ${err.message}`,
			)(
				function setExceptionCode(error) {
					return { ...error, code: "EXCEPTION_THROWN" } as typeof error
				},
				withCause(err),
			)
		}
	}
}

/*??
 * [EXAMPLE] In a catch block:
 * try {
 *   return mapUnsafe(fn)(array)
 * } catch (err) {
 *   return left(fromException("map")([fn, array])(err))
 * }
 *
 * [EXAMPLE] With additional context:
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
 */
//?? [EXAMPLE] const mapException = fromException("map")
//?? [GOTCHA] Safely converts any thrown value, even non-Error objects
