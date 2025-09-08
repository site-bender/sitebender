import type { EngineError } from "../../types/error/index.ts"
import type { Datatype, Value } from "../../types/index.ts"

//++ Adds expected and actual type information to an error for type mismatches
export default function withTypes<TDataType extends Datatype>(expected: TDataType) {
	return function withActualType(actual: TDataType | "null" | "undefined" | "unknown") {
		return function enrichError<TOp extends string, TArgs extends ReadonlyArray<Value>>(
			error: EngineError<TOp, TArgs>,
		): EngineError<TOp, TArgs> {
			return {
				...error,
				types: { expected, actual: (actual as unknown as Datatype) },
			}
		}
	}
}

//?? [EXAMPLE] const expectNumber = withTypes("Number")("String")
//?? [EXAMPLE] const expectInteger = withTypes("Integer")("null")
/*??
 * [EXAMPLE] Pipeline usage:
 * const errorWithTypes = pipe(
 *   createError("parse")([value])("Cannot parse value")(),
 *   withTypes("Float")("String")
 * )
 */
