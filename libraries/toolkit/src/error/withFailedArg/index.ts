import type { EngineError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

/**
 * Adds failed argument information to an error
 *
 * Enriches an error object with details about which specific argument
 * caused the failure. Returns a new immutable error object.
 *
 * @curried (index) => (name) => (error) => error
 * @param index - The index of the failed argument (0-based)
 * @param name - Optional human-readable name for the argument
 * @param error - The error to enrich
 * @returns New error with failed argument information
 * @example
 * ```typescript
 * // Add argument index only
 * const withFirstArg = withFailedArg(0)(undefined)
 * const enriched = withFirstArg(error)
 *
 * // Add both index and name
 * const withNamedArg = withFailedArg(1)("array")
 * const detailed = withNamedArg(error)
 *
 * // Pipeline usage
 * const errorWithDetails = pipe(
 *   createError("map")([fn, null])("Array is null")(),
 *   withFailedArg(1)("array")
 * )
 * ```
 */
const withFailedArg =
	(index: number) =>
	(name?: string) =>
	<TOp extends string, TArgs extends ReadonlyArray<Value>>(
		error: EngineError<TOp, TArgs>,
	): EngineError<TOp, TArgs> => ({
		...error,
		failedIndex: index,
		context: name ? { ...(error.context ?? {}), argName: name } : error.context,
	})

export default withFailedArg
