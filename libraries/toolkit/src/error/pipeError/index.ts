import type { AdaptiveError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

import createError from "../createError/index.ts"

/**
 * Composes error transformations in a pipeline
 *
 * Creates an error and applies a series of transformations to it,
 * building up a rich error object through functional composition.
 *
 * @curried (operation) => (args) => (message) => (...transforms) => error
 * @param operation - The operation that failed
 * @param args - Arguments passed to the operation
 * @param message - Error message
 * @param transforms - Functions that transform the error
 * @returns Final transformed error
 * @example
 * ```typescript
 * // Build a rich error through composition
 * const error = pipeError("map")([fn, array])("Mapping failed")(
 *   withFailedArg(1)("array"),
 *   withTypes("Array")("null"),
 *   withSuggestion("Ensure array is initialized"),
 *   withCause(originalError)
 * )
 *
 * // Partial application for error factories
 * const createMapError = pipeError("map")
 * const mapNullError = createMapError([fn, null])("Array is null")(
 *   withFailedArg(1)("array"),
 *   withSuggestion("Initialize array before mapping")
 * )
 *
 * // Conditional transforms
 * const transforms = [
 *   withFailedArg(0)("predicate"),
 *   isProduction ? identity : withCause(err),
 *   withSuggestion("Check predicate function")
 * ]
 * const error = pipeError("filter")([pred, data])("Filter failed")(...transforms)
 * ```
 */
const pipeError =
	<TOp extends string>(operation: TOp) =>
	<TArgs extends ReadonlyArray<Value>>(args: TArgs) =>
	(message: string) =>
	<T extends AdaptiveError<TOp, TArgs>>(
		...transforms: Array<(error: T) => T>
	): T => {
		const initialError = createError(operation)(args)(message)() as T
		return transforms.reduce(
			(error, transform) => transform(error),
			initialError,
		)
	}

export default pipeError
