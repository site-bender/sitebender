import type { EngineError } from "../../types/error/index.ts"
import type { Datatype, Value } from "../../types/index.ts"

import createError from "../createError/index.ts"

//++ Creates a type mismatch error with full context
export default function createTypeError<TOp extends string>(operation: TOp) {
	return function withArguments<TArgs extends ReadonlyArray<Value>>(
		args: TArgs,
	) {
		return function atArgumentIndex(argIndex: number) {
			return function expectingType<TDataType extends Datatype>(
				expected: TDataType,
			) {
				return function butGotType(
					actual: TDataType | "null" | "undefined" | "unknown",
				): EngineError<TOp, TArgs> {
					const baseError = createError(operation)(args)(
						`${operation}: Expected ${expected} at argument ${argIndex}, got ${actual}`,
					)("TYPE_MISMATCH") as EngineError<TOp, TArgs>

					return {
						...baseError,
						failedIndex: argIndex,
						suggestion: `Ensure argument ${argIndex} is of type ${expected}`,
						types: { expected, actual: (actual as unknown as Datatype) },
					}
				}
			}
		}
	}
}

//?? [EXAMPLE] createTypeError("map")([fn, array])(0)("Function")("String")
//?? [EXAMPLE] createTypeError("filter")([pred, null])(1)("Array")("null")
//?? [EXAMPLE] createTypeError("divide")([10, 0])(1)("NonZeroNumber")("Integer")
/*??
 * [EXAMPLE]
 * const createMapTypeError = createTypeError("map")
 * const error = createMapTypeError([fn, data])(0)("Function")(typeof fn)
 *
 * [GOTCHA] Automatically generates message and suggestion based on types
 */
