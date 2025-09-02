import type { AdaptiveError, ErrorCode } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

/**
 * Creates a basic error object with minimal required fields
 *
 * This is the foundational error creator that all other error functions
 * build upon. It creates an immutable error object with the core fields
 * populated.
 *
 * @curried (operation) => (args) => (message) => (code) => error
 * @param operation - The name of the operation that failed
 * @param args - All arguments passed to the operation (in order)
 * @param message - Human-readable error message
 * @param code - Machine-readable error code (defaults to "OPERATION_FAILED")
 * @returns Immutable AdaptiveError object
 * @example
 * ```typescript
 * // Basic usage
 * const error = createError("map")([fn, array])("Transformation failed")("CALLBACK_THREW")
 *
 * // With default code
 * const simpleError = createError("filter")([pred, data])("Invalid predicate")()
 *
 * // Partial application
 * const createMapError = createError("map")
 * const mapError = createMapError([mapper, items])("Failed at index 3")("EXCEPTION_THROWN")
 * ```
 */
const createError =
	<TOp extends string>(operation: TOp) =>
	<TArgs extends ReadonlyArray<Value>>(args: TArgs) =>
	(message: string) =>
	(code: ErrorCode = "OPERATION_FAILED"): AdaptiveError<TOp, TArgs> => ({
		name: `${operation}Error` as `${TOp}Error`,
		operation,
		args,
		message,
		code,
		severity: "error",
	})

export default createError
