import type { EngineError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

//++ Adds failed argument information to an error with index and optional name
export default function withFailedArg(index: number) {
	return function withArgumentName(name?: string) {
		return function enrichError<
			TOp extends string,
			TArgs extends ReadonlyArray<Value>,
		>(
			error: EngineError<TOp, TArgs>,
		): EngineError<TOp, TArgs> {
			return {
				...error,
				failedIndex: index,
				context: name
					? { ...(error.context ?? {}), argName: name }
					: error.context,
			}
		}
	}
}

//?? [EXAMPLE] const withFirstArg = withFailedArg(0)(undefined)
//?? [EXAMPLE] const withNamedArg = withFailedArg(1)("array")
/*??
 * [EXAMPLE] Pipeline usage:
 * const errorWithDetails = pipe(
 *   createError("map")([fn, null])("Array is null")(),
 *   withFailedArg(1)("array")
 * )
 */
