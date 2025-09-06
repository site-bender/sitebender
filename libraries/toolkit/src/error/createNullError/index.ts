import type { EngineError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

import createError from "../createError/index.ts"

/**
 * Creates a null/undefined input error with full context
 *
 * Specialized error creator for null/undefined input failures.
 * Automatically adds context about which argument was null/undefined.
 *
 * @curried (operation) => (args) => (argIndex) => (argName) => error
 * @param operation - The operation that failed
 * @param args - Arguments passed to the operation
 * @param argIndex - Index of the null/undefined argument
 * @param argName - Human-readable name for the argument
 * @returns Complete null error with all context
 * @example
 * ```typescript
 * // Null array error
 * const error = createNullError("map")([fn, null])(1)("array")
 * // Message: "map: Unexpected null/undefined for array"
 * // Includes suggestion: "Check that array is defined before calling map"
 *
 * // Undefined predicate
 * const undefError = createNullError("filter")([undefined, data])(0)("predicate")
 *
 * // Detect which type of null
 * const value = undefined
 * const preciseError = createNullError("process")([value])(0)("input")
 * // Will note actualType as "undefined" specifically
 *
 * // Partial application
 * const createMapNullError = createNullError("map")
 * const arrayNullError = createMapNullError([fn, null])(1)("array")
 * ```
 */
const createNullError =
	<TOp extends string>(operation: TOp) =>
	<TArgs extends ReadonlyArray<Value>>(args: TArgs) =>
	(argIndex: number) =>
	(argName: string): EngineError<TOp, TArgs> => {
		// Build the error directly to avoid type issues with pipeError
		const baseError = createError(operation)(args)(
			`${operation}: Unexpected null/undefined for ${argName}`,
		)("NULL_VALUE") as EngineError<TOp, TArgs>

		return {
			...baseError,
			failedIndex: argIndex,
			suggestion:
				`Check that ${argName} is defined before calling ${operation}`,
		}
	}

export default createNullError
