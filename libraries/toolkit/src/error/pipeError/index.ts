import type { EngineError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

import createError from "../createError/index.ts"

//++ Composes error transformations in a pipeline to build rich error objects
export default function pipeError<TOp extends string>(operation: TOp) {
	return function withArguments<TArgs extends ReadonlyArray<Value>>(
		args: TArgs,
	) {
		return function withMessage(message: string) {
			return function withTransforms<T extends EngineError<TOp, TArgs>>(
				...transforms: Array<(error: T) => T>
			): T {
				const initialError = createError(operation)(args)(message)() as T

				return transforms.reduce(
					function applyTransform(error, transform) {
						return transform(error)
					},
					initialError,
				)
			}
		}
	}
}

/*??
 * [EXAMPLE] Build a rich error through composition:
 * const error = pipeError("map")([fn, array])("Mapping failed")(
 *   withFailedArg(1)("array"),
 *   withTypes("Array")("null"),
 *   withSuggestion("Ensure array is initialized"),
 *   withCause(originalError)
 * )
 *
 * [EXAMPLE] Partial application for error factories:
 * const createMapError = pipeError("map")
 * const mapNullError = createMapError([fn, null])("Array is null")(
 *   withFailedArg(1)("array"),
 *   withSuggestion("Initialize array before mapping")
 * )
 *
 * [EXAMPLE] Conditional transforms:
 * const transforms = [
 *   withFailedArg(0)("predicate"),
 *   isProduction ? identity : withCause(err),
 *   withSuggestion("Check predicate function")
 * ]
 * const error = pipeError("filter")([pred, data])("Filter failed")(...transforms)
 */
