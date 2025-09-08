import type { EngineError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

//++ Adds a helpful suggestion for fixing the error
export default function withSuggestion(suggestion: string) {
	return function enrichError<TOp extends string, TArgs extends ReadonlyArray<Value>>(
		error: EngineError<TOp, TArgs>,
	): EngineError<TOp, TArgs> {
		return {
			...error,
			suggestion,
		}
	}
}

//?? [EXAMPLE] const suggest = withSuggestion("Check that the array is not null")
/*??
 * [EXAMPLE] Pipeline usage:
 * const errorWithHelp = pipe(
 *   createError("divide")([10, 0])("Division by zero")(),
 *   withSuggestion("Ensure divisor is not zero before dividing")
 * )
 *
 * [EXAMPLE] Conditional suggestion:
 * const addSuggestion = error.code === "NULL_INPUT"
 *   ? withSuggestion("Initialize the value before use")
 *   : withSuggestion("Check the input type")
 * const improved = addSuggestion(error)
 */
