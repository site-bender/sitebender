import type { EngineError, ErrorCode } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

//++ Creates a basic error object with minimal required fields
export default function createError<TOp extends string>(operation: TOp) {
	return function <TArgs extends ReadonlyArray<Value>>(args: TArgs) {
		return function (message: string) {
			return function (
				code: ErrorCode = "OPERATION_FAILED",
			): EngineError<TOp, TArgs> {
				return {
					name: `${operation}Error` as `${TOp}Error`,
					operation,
					args,
					message,
					code,
					severity: "error",
				}
			}
		}
	}
}

//?? [EXAMPLE] createError("map")([fn, array])("Transformation failed")("CALLBACK_THREW")
//?? [EXAMPLE] createError("filter")([pred, data])("Invalid predicate")()
/*??
 * [EXAMPLE]
 * const createMapError = createError("map")
 * const mapError = createMapError([mapper, items])("Failed at index 3")("EXCEPTION_THROWN")
 */
